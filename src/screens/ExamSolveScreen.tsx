import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Platform,
} from 'react-native';
import { colors, spacing } from '../theme/colors';
import { MOCK_QUESTIONS, EXAM_PERIODS } from '../data/mockExams';
import { Question, UserExamAttempt } from '../types';
import { StorageService } from '../utils/storage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface ExamSolveScreenProps {
  route: any;
  navigation: any;
}

export const ExamSolveScreen: React.FC<ExamSolveScreenProps> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { examId = 'ogg-105', mode = 'real' } = route.params || {};

  const examInfo = EXAM_PERIODS.find((e) => e.id === examId) || EXAM_PERIODS[0];
  const questions: Question[] = MOCK_QUESTIONS[examId] || MOCK_QUESTIONS['ogg-105'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [remainingSeconds, setRemainingSeconds] = useState(examInfo.durationMinutes * 60);
  const [isGridModalVisible, setIsGridModalVisible] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const timerRef = useRef<any>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFinishExam(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentQuestion = questions[currentIndex];

  const formatTimer = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSelectOption = async (key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: key,
    }));

    // Yanlış cevap verildiğinde anında Hata Defterine ekle
    if (key !== currentQuestion.correctAnswer) {
      await StorageService.addWrongQuestions([currentQuestion]);
    } else {
      // Doğru cevaba değiştirilirse hata defterinden kaldır
      await StorageService.removeWrongQuestion(currentQuestion.id);
    }

    if (mode === 'practice') {
      setShowExplanation(true);
    }
  };

  const toggleFlag = () => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  };

  const handleFinishExam = async (isTimeUp = false) => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correctCount = 0;
    let wrongCount = 0;
    let emptyCount = 0;
    const wrongQuestions: Question[] = [];
    const categoryBreakdown: any = {};

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (!ans) {
        emptyCount += 1;
      } else if (ans === q.correctAnswer) {
        correctCount += 1;
      } else {
        wrongCount += 1;
        wrongQuestions.push(q);
      }

      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;
      if (ans === q.correctAnswer) {
        categoryBreakdown[q.category].correct += 1;
      }
    });

    const totalScore = Math.round((correctCount / questions.length) * 100);
    const passed = totalScore >= 60;

    const attempt: UserExamAttempt = {
      id: `attempt-${Date.now()}`,
      examId: examInfo.id,
      date: new Date().toLocaleDateString('tr-TR'),
      userAnswers,
      flaggedQuestionIds: Array.from(flaggedIds),
      totalScore,
      correctCount,
      wrongCount,
      emptyCount,
      passed,
      timeSpentSeconds: examInfo.durationMinutes * 60 - remainingSeconds,
      categoryBreakdown,
    };

    // Kayıt işlemleri
    await StorageService.saveExamAttempt(attempt);
    if (wrongQuestions.length > 0) {
      await StorageService.addWrongQuestions(wrongQuestions);
    }
    await StorageService.updateStats(questions.length, correctCount, wrongCount);

    navigation.replace('ExamResult', { attempt, questions });
  };

  const handleExit = async () => {
    // Çıkış yaparken çözülmüş yanlış soruları da garanti olarak kaydet
    const wrongQuestions: Question[] = [];
    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans && ans !== q.correctAnswer) {
        wrongQuestions.push(q);
      }
    });
    if (wrongQuestions.length > 0) {
      await StorageService.addWrongQuestions(wrongQuestions);
    }
    navigation.navigate('MainTabs', { screen: 'HomeTab' });
  };

  const confirmFinish = () => {
    const answeredCount = Object.keys(userAnswers).length;
    const emptyCount = questions.length - answeredCount;

    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        `Toplam ${questions.length} sorudan ${answeredCount} tanesini yanıtladınız. ${emptyCount} soru boş bırakıldı.\n\nSınavı bitirmek istiyor musunuz?`
      );
      if (confirmed) {
        handleFinishExam();
      }
    } else {
      Alert.alert(
        'Sınavı Bitir',
        `Toplam ${questions.length} sorudan ${answeredCount} tanesini yanıtladınız. ${emptyCount} soru boş bırakıldı.\n\nSınavı bitirmek istiyor musunuz?`,
        [
          { text: 'Devam Et', style: 'cancel' },
          { text: 'Bitir ve Sonucu Gör', style: 'destructive', onPress: () => handleFinishExam() },
        ]
      );
    }
  };

  const selectedAnswer = userAnswers[currentQuestion.id];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 24) + 18 }]}>
        <TouchableOpacity
          onPress={handleExit}
          style={styles.exitButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.navActionText}>✕ Çıkış</Text>
        </TouchableOpacity>

        {/* Sayaç */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerIcon}>⏱️</Text>
          <Text
            style={[
              styles.timerText,
              remainingSeconds < 600 && { color: colors.danger },
            ]}
          >
            {formatTimer(remainingSeconds)}
          </Text>
        </View>

        {/* Başlığı ortalı tutmak için sağ dengeleyici */}
        <View style={{ width: 75 }} />
      </View>

      {/* İlerleme ve Soru İndikatörü */}
      <View style={styles.progressContainer}>
        <View style={styles.progressRow}>
          <Text style={styles.questionIndexText}>
            Soru {currentIndex + 1} / {questions.length}
            {currentQuestion.isWeaponQuestion && (
              <Text style={styles.weaponBadgeText}> (Silah Bilgisi)</Text>
            )}
          </Text>

          <View style={styles.toolRow}>
            <TouchableOpacity
              style={[
                styles.flagButton,
                flaggedIds.has(currentQuestion.id) && styles.flagButtonActive,
              ]}
              onPress={toggleFlag}
            >
              <Text style={styles.flagIcon}>
                {flaggedIds.has(currentQuestion.id) ? '🚩 İşaretlendi' : '🏳️ İşaretle'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridPopupButton}
              onPress={() => setIsGridModalVisible(true)}
            >
              <Text style={styles.gridPopupText}>Tüm Sorular ☰</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${((currentIndex + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Soru Gövdesi */}
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
        </View>

        {/* Şıklar */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.key;
            let optionStyle: any = styles.optionCard;
            let textStyle: any = styles.optionText;

            if (mode === 'practice' && showExplanation) {
              if (option.key === currentQuestion.correctAnswer) {
                optionStyle = [styles.optionCard, styles.optionCorrect];
              } else if (isSelected) {
                optionStyle = [styles.optionCard, styles.optionWrong];
              }
            } else if (isSelected) {
              optionStyle = [styles.optionCard, styles.optionSelected];
              textStyle = [styles.optionText, styles.optionTextSelected];
            }

            return (
              <TouchableOpacity
                key={option.key}
                style={optionStyle}
                activeOpacity={0.75}
                onPress={() => handleSelectOption(option.key)}
              >
                <View
                  style={[
                    styles.optionKeyCircle,
                    isSelected && styles.optionKeyCircleSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionKeyText,
                      isSelected && styles.optionKeyTextSelected,
                    ]}
                  >
                    {option.key}
                  </Text>
                </View>
                <Text style={textStyle}>{option.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Pratik Modu Açıklaması */}
        {mode === 'practice' && showExplanation && currentQuestion.explanation && (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>💡 Çözüm & Kanun Notu:</Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}
      </ScrollView>

      {/* Alt Gezinme Butonları */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          disabled={currentIndex === 0}
          onPress={() => {
            setCurrentIndex((prev) => prev - 1);
            setShowExplanation(false);
          }}
        >
          <Text style={styles.navButtonText}>← Önceki Soru</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.navButtonNext,
            currentIndex === questions.length - 1 && styles.navButtonFinish,
          ]}
          onPress={() => {
            if (currentIndex < questions.length - 1) {
              setCurrentIndex((prev) => prev + 1);
              setShowExplanation(false);
            } else {
              confirmFinish();
            }
          }}
        >
          <Text style={styles.navButtonTextNext}>
            {currentIndex === questions.length - 1 ? 'Sınavı Bitir' : 'Sonraki Soru →'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Soru Seçim Grid Modalı */}
      <Modal visible={isGridModalVisible} animationType="slide" transparent>
        <SafeAreaView style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Soru Listesi ({questions.length} Soru)</Text>
              <TouchableOpacity onPress={() => setIsGridModalVisible(false)}>
                <Text style={styles.modalCloseText}>Kapat ✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.gridModalScroll}>
              <View style={styles.gridQuestionList}>
                {questions.map((q, idx) => {
                  const answered = !!userAnswers[q.id];
                  const isFlagged = flaggedIds.has(q.id);
                  const isCurrent = idx === currentIndex;

                  return (
                    <TouchableOpacity
                      key={q.id}
                      style={[
                        styles.gridNumBox,
                        answered && styles.gridNumBoxAnswered,
                        isFlagged && styles.gridNumBoxFlagged,
                        isCurrent && styles.gridNumBoxCurrent,
                      ]}
                      onPress={() => {
                        setCurrentIndex(idx);
                        setShowExplanation(false);
                        setIsGridModalVisible(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.gridNumText,
                          (answered || isCurrent) && styles.gridNumTextWhite,
                        ]}
                      >
                        {idx + 1}
                      </Text>
                      {isFlagged && <Text style={styles.gridFlagTiny}>🚩</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalFinishBtn}
                onPress={() => {
                  setIsGridModalVisible(false);
                  confirmFinish();
                }}
              >
                <Text style={styles.modalFinishBtnText}>Sınavı Bitir ve Sonucu Gör</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm + 4,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
  },
  navActionText: {
    color: colors.textSecondary,
    fontWeight: '700',
    fontSize: 14,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: 20,
  },
  timerIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  finishButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  progressContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  questionIndexText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  weaponBadgeText: {
    color: colors.gold,
    fontWeight: 'bold',
  },
  toolRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: spacing.sm,
    backgroundColor: '#F8FAFC',
  },
  flagButtonActive: {
    backgroundColor: '#FEF3C7',
  },
  flagIcon: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  gridPopupButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.surfaceHighlight,
  },
  gridPopupText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: colors.borderLight,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  scrollArea: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  questionCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 22,
  },
  optionsContainer: {
    marginBottom: spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md - 2,
    marginBottom: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#EFF6FF',
  },
  optionCorrect: {
    borderColor: colors.accent,
    backgroundColor: '#ECFDF5',
  },
  optionWrong: {
    borderColor: colors.danger,
    backgroundColor: '#FEF2F2',
  },
  optionKeyCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 2,
  },
  optionKeyCircleSelected: {
    backgroundColor: colors.primary,
  },
  optionKeyText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  optionKeyTextSelected: {
    color: '#FFFFFF',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 19,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: colors.primary,
  },
  explanationBox: {
    backgroundColor: '#EFF6FF',
    padding: spacing.md,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    marginTop: spacing.xs,
  },
  explanationTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    marginRight: spacing.sm,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonNext: {
    backgroundColor: colors.primary,
    marginRight: 0,
    marginLeft: spacing.sm,
  },
  navButtonFinish: {
    backgroundColor: colors.accent,
  },
  navButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  navButtonTextNext: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '75%',
    padding: spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  gridModalScroll: {
    paddingBottom: spacing.xl,
  },
  gridQuestionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  gridNumBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  gridNumBoxAnswered: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  gridNumBoxFlagged: {
    borderColor: colors.gold,
    borderWidth: 2,
  },
  gridNumBoxCurrent: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  gridNumText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  gridNumTextWhite: {
    color: '#FFFFFF',
  },
  gridFlagTiny: {
    position: 'absolute',
    top: -4,
    right: -4,
    fontSize: 8,
  },
  modalFooter: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  modalFinishBtn: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalFinishBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
