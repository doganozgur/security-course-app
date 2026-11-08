import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { colors, spacing } from '../theme/colors';
import { Question } from '../types';
import { StorageService } from '../utils/storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MistakesScreenProps {
  navigation: any;
}

export const MistakesScreen: React.FC<MistakesScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadWrongs();
    });
    loadWrongs();
    return unsubscribe;
  }, [navigation]);

  const loadWrongs = async () => {
    const list = await StorageService.getWrongQuestions();
    setWrongQuestions(list);
  };

  const handleSelectOption = (question: Question, key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [question.id]: key,
    }));

    setRevealedIds((prev) => new Set(prev).add(question.id));

    if (key === question.correctAnswer) {
      if (Platform.OS === 'web') {
        const remove = window.confirm(
          '🎯 Doğru Cevap!\n\nBu soruyu artık öğrendiniz. Hata defterinizden çıkarmak ister misiniz?'
        );
        if (remove) {
          StorageService.removeWrongQuestion(question.id).then(() => loadWrongs());
        }
      } else {
        Alert.alert(
          '🎯 Doğru Cevap!',
          'Bu soruyu artık öğrendiniz. Hata defterinizden çıkarmak ister misiniz?',
          [
            { text: 'Kalsın', style: 'cancel' },
            {
              text: 'Listeden Çıkar',
              onPress: async () => {
                await StorageService.removeWrongQuestion(question.id);
                await loadWrongs();
              },
            },
          ]
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.topHeader, { paddingTop: Math.max(insets.top, 24) + 18 }]}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('MainTabs', { screen: 'HomeTab' });
              }
            }}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hata Defterim ({wrongQuestions.length})</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Sınavlarda yanlış yaptığınız veya boş bıraktığınız sorular burada birikir.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {wrongQuestions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🎉</Text>
            <Text style={styles.emptyTitle}>Hata Defteriniz Bomboş!</Text>
            <Text style={styles.emptyText}>
              Harika gidiyorsunuz. Sınavlarda yanlış yaptığınız sorular otomatik olarak buraya eklenir.
            </Text>
            <TouchableOpacity
              style={styles.solveExamBtn}
              onPress={() => navigation.navigate('MainTabs', { screen: 'ExamsTab' })}
            >
              <Text style={styles.solveExamBtnText}>Deneme Çözmeye Başla</Text>
            </TouchableOpacity>
          </View>
        ) : (
          wrongQuestions.map((q, index) => {
            const isRevealed = revealedIds.has(q.id);
            const userPick = selectedAnswers[q.id];

            return (
              <View key={q.id} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionNumBadge}>Soru {index + 1}</Text>
                  <TouchableOpacity
                    onPress={async () => {
                      await StorageService.removeWrongQuestion(q.id);
                      await loadWrongs();
                    }}
                  >
                    <Text style={styles.deleteText}>Listeden Kaldır ✕</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.questionText}>{q.text}</Text>

                {/* Şıklar */}
                <View style={styles.optionsList}>
                  {q.options.map((opt) => {
                    const isSelected = userPick === opt.key;
                    const isCorrect = opt.key === q.correctAnswer;

                    let optStyle: any = styles.optItem;
                    if (isRevealed) {
                      if (isCorrect) optStyle = [styles.optItem, styles.optCorrect];
                      else if (isSelected) optStyle = [styles.optItem, styles.optWrong];
                    }

                    return (
                      <TouchableOpacity
                        key={opt.key}
                        style={optStyle}
                        activeOpacity={0.8}
                        onPress={() => handleSelectOption(q, opt.key)}
                      >
                        <Text style={styles.optKeyText}>{opt.key})</Text>
                        <Text style={styles.optContentText}>{opt.text}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Çözüm ve Açıklama */}
                {isRevealed && q.explanation && (
                  <View style={styles.explanationBox}>
                    <Text style={styles.expTitle}>💡 Doğru Çözüm:</Text>
                    <Text style={styles.expText}>{q.explanation}</Text>
                  </View>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topHeader: {
    backgroundColor: colors.card,
    paddingBottom: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.sm,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
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
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  questionNumBadge: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary,
  },
  deleteText: {
    fontSize: 11,
    color: colors.danger,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  optionsList: {
    marginBottom: spacing.xs,
  },
  optItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 6,
  },
  optCorrect: {
    backgroundColor: '#ECFDF5',
    borderColor: colors.accent,
  },
  optWrong: {
    backgroundColor: '#FEF2F2',
    borderColor: colors.danger,
  },
  optKeyText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: colors.textSecondary,
    marginRight: 6,
  },
  optContentText: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
  },
  explanationBox: {
    backgroundColor: '#EFF6FF',
    padding: spacing.sm + 4,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    marginTop: spacing.xs,
  },
  expTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  expText: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyEmoji: {
    fontSize: 50,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  solveExamBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderRadius: 12,
  },
  solveExamBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
