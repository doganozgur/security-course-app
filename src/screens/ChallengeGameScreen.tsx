import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing, ThemeColors } from '../theme/colors';
import { useTheme } from '../context/ThemeContext';
import { MOCK_QUESTIONS } from '../data/mockExams';
import { Question } from '../types';
import { StorageService } from '../utils/storage';

type DifficultyKey = 'easy' | 'medium' | 'hard';

interface RivalProfile {
  name: string;
  city: string;
  avatar: string;
  accuracy: number;
  minDelay: number;
  maxDelay: number;
  rankLabel: string;
}

const DIFFICULTIES: {
  key: DifficultyKey;
  title: string;
  subtitle: string;
  badge: string;
  rivals: RivalProfile[];
}[] = [
  {
    key: 'easy',
    title: 'Çaylak Aday',
    subtitle: 'Isınma düellosu • Daha sakin tempo',
    badge: '🥉 Kolay',
    rivals: [
      { name: 'Mert K.', city: 'İstanbul', avatar: '🧑‍✈️', accuracy: 0.52, minDelay: 5, maxDelay: 10, rankLabel: 'Çaylak' },
      { name: 'Selin D.', city: 'Bursa', avatar: '👩‍✈️', accuracy: 0.55, minDelay: 4, maxDelay: 9, rankLabel: 'Çaylak' },
    ],
  },
  {
    key: 'medium',
    title: 'Kıdemli Aday',
    subtitle: 'Dengeli rekabet • Gerçek sınav temposu',
    badge: '🥈 Orta',
    rivals: [
      { name: 'Zeynep A.', city: 'Ankara', avatar: '🛡️', accuracy: 0.72, minDelay: 3, maxDelay: 8, rankLabel: 'Kıdemli' },
      { name: 'Emre T.', city: 'İzmir', avatar: '⚡', accuracy: 0.74, minDelay: 3, maxDelay: 7, rankLabel: 'Kıdemli' },
    ],
  },
  {
    key: 'hard',
    title: 'EGM Şampiyonu',
    subtitle: 'Hızlı ve yüksek doğruluklu zorlu rakip',
    badge: '🥇 Zor',
    rivals: [
      { name: 'Kaan B.', city: 'Antalya', avatar: '🏆', accuracy: 0.88, minDelay: 2, maxDelay: 5, rankLabel: 'Şampiyon' },
      { name: 'Elif Y.', city: 'Konya', avatar: '🔥', accuracy: 0.86, minDelay: 2, maxDelay: 6, rankLabel: 'Şampiyon' },
    ],
  },
];

const DUEL_LENGTH = 7;
const QUESTION_SECONDS = 15;

const pickDuelQuestions = (): Question[] => {
  const all = Object.values(MOCK_QUESTIONS).flat();
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(DUEL_LENGTH, shuffled.length));
};

interface ChallengeGameScreenProps {
  navigation: any;
}

export const ChallengeGameScreen: React.FC<ChallengeGameScreenProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [phase, setPhase] = useState<'lobby' | 'matching' | 'duel' | 'result'>('lobby');
  const [difficulty, setDifficulty] = useState<DifficultyKey>('medium');
  const [rival, setRival] = useState<RivalProfile>(DIFFICULTIES[1].rivals[0]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);

  const [playerScore, setPlayerScore] = useState(0);
  const [rivalScore, setRivalScore] = useState(0);
  const [playerCorrect, setPlayerCorrect] = useState(0);
  const [rivalCorrect, setRivalCorrect] = useState(0);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [rivalAnswered, setRivalAnswered] = useState(false);
  const [rivalRoundGain, setRivalRoundGain] = useState<number | null>(null);

  const [wins, setWins] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);

  useEffect(() => {
    StorageService.getGameProgress().then((gp) => {
      setWins(gp.challengeWins);
      setTotalMatches(gp.challengeTotal);
    });
  }, []);

  const currentQuestion = questions[qIndex];

  const startMatchmaking = () => {
    const tier = DIFFICULTIES.find((d) => d.key === difficulty) ?? DIFFICULTIES[1];
    const pickedRival =
      tier.rivals[Math.floor(Math.random() * tier.rivals.length)];
    setRival(pickedRival);
    setQuestions(pickDuelQuestions());
    setQIndex(0);
    setPlayerScore(0);
    setRivalScore(0);
    setPlayerCorrect(0);
    setRivalCorrect(0);
    setSelectedKey(null);
    setRivalAnswered(false);
    setRivalRoundGain(null);
    setTimeLeft(QUESTION_SECONDS);
    setPhase('matching');

    setTimeout(() => {
      setPhase('duel');
    }, 1100);
  };

  // Simulated rival answering during a question
  useEffect(() => {
    if (phase !== 'duel' || !currentQuestion) return;
    setRivalAnswered(false);
    setRivalRoundGain(null);

    const delaySec =
      rival.minDelay +
      Math.floor(Math.random() * (rival.maxDelay - rival.minDelay + 1));

    const t = setTimeout(() => {
      const isRight = Math.random() < rival.accuracy;
      const gain = isRight
        ? 100 + Math.max(0, QUESTION_SECONDS - delaySec) * 5
        : 0;
      setRivalAnswered(true);
      setRivalRoundGain(gain);
      if (isRight) {
        setRivalScore((s) => s + gain);
        setRivalCorrect((c) => c + 1);
      }
    }, delaySec * 1000);

    return () => clearTimeout(t);
  }, [phase, qIndex, currentQuestion, rival]);

  const finishDuel = useCallback(
    async (finalPlayer: number, finalRival: number) => {
      setPhase('result');
      const won = finalPlayer > finalRival;
      const newWins = wins + (won ? 1 : 0);
      const newTotal = totalMatches + 1;
      setWins(newWins);
      setTotalMatches(newTotal);
      await StorageService.updateGameProgress({
        challengeWins: newWins,
        challengeTotal: newTotal,
      });
    },
    [wins, totalMatches]
  );

  const advanceRound = useCallback(
    (latestPlayerScore: number, latestRivalScore: number) => {
      if (qIndex + 1 >= questions.length) {
        finishDuel(latestPlayerScore, latestRivalScore);
      } else {
        setQIndex((i) => i + 1);
        setSelectedKey(null);
        setTimeLeft(QUESTION_SECONDS);
      }
    },
    [qIndex, questions.length, finishDuel]
  );

  // Countdown timer
  useEffect(() => {
    if (phase !== 'duel' || selectedKey !== null) return;
    if (timeLeft <= 0) {
      setSelectedKey('TIMEOUT');
      const t = setTimeout(() => {
        advanceRound(playerScore, rivalScore);
      }, 1300);
      return () => clearTimeout(t);
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, selectedKey, timeLeft, advanceRound, playerScore, rivalScore]);

  const handleAnswer = (key: string) => {
    if (selectedKey !== null || !currentQuestion) return;
    setSelectedKey(key);

    let updatedPlayerScore = playerScore;
    if (key === currentQuestion.correctAnswer) {
      const gained = 100 + timeLeft * 5;
      updatedPlayerScore = playerScore + gained;
      setPlayerScore(updatedPlayerScore);
      setPlayerCorrect((c) => c + 1);
    }

    // If rival hasn't answered yet, resolve rival instantly so scores stay in sync
    let updatedRivalScore = rivalScore;
    if (!rivalAnswered) {
      const isRight = Math.random() < rival.accuracy;
      const rGain = isRight ? 100 + Math.max(0, timeLeft - 1) * 4 : 0;
      setRivalAnswered(true);
      setRivalRoundGain(rGain);
      if (isRight) {
        updatedRivalScore = rivalScore + rGain;
        setRivalScore(updatedRivalScore);
        setRivalCorrect((c) => c + 1);
      }
    }

    setTimeout(() => {
      advanceRound(updatedPlayerScore, updatedRivalScore);
    }, 1450);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {/* Header */}
      <View style={[styles.topHeader, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.backButtonText}>← Çık</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>⚔️ Rakiplerine Meydan Oku</Text>
        <View style={styles.winBadge}>
          <Text style={styles.winBadgeText}>🏆 {wins} Galibiyet</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {phase === 'lobby' && (
          <>
            <View style={styles.heroCard}>
              <Text style={styles.heroEmoji}>⚔️</Text>
              <Text style={styles.heroTitle}>1’e 1 Özel Güvenlik Düellosu</Text>
              <Text style={styles.heroDesc}>
                7 gerçek EGM sorusunda rakibinle yarış! Ne kadar hızlı doğru
                cevaplarsan o kadar yüksek hız bonusu kazanırsın.
              </Text>
              <View style={styles.recordRow}>
                <View style={styles.recordPill}>
                  <Text style={styles.recordText}>Toplam Maç: {totalMatches}</Text>
                </View>
                <View style={styles.recordPill}>
                  <Text style={styles.recordText}>Galibiyet: {wins}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionLabel}>Rakip Seviyesi Seç</Text>
            {DIFFICULTIES.map((tier) => {
              const active = difficulty === tier.key;
              return (
                <TouchableOpacity
                  key={tier.key}
                  style={[styles.tierCard, active && styles.tierCardActive]}
                  onPress={() => setDifficulty(tier.key)}
                  activeOpacity={0.85}
                >
                  <View style={styles.tierLeft}>
                    <Text style={styles.tierTitle}>{tier.title}</Text>
                    <Text style={styles.tierSub}>{tier.subtitle}</Text>
                  </View>
                  <View
                    style={[
                      styles.tierBadge,
                      active && { backgroundColor: colors.primary },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tierBadgeText,
                        active && { color: '#FFFFFF' },
                      ]}
                    >
                      {tier.badge}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={startMatchmaking}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>⚡ Rakip Bul & Düelloya Başla</Text>
            </TouchableOpacity>
          </>
        )}

        {phase === 'matching' && (
          <View style={styles.matchingCard}>
            <Text style={styles.matchingEmoji}>🔍</Text>
            <Text style={styles.matchingTitle}>Rakip Eşleşti!</Text>
            <View style={styles.vsPreviewRow}>
              <View style={styles.vsPlayerBox}>
                <Text style={styles.vsAvatar}>🛡️</Text>
                <Text style={styles.vsName}>SEN</Text>
              </View>
              <Text style={styles.vsBigText}>VS</Text>
              <View style={styles.vsPlayerBox}>
                <Text style={styles.vsAvatar}>{rival.avatar}</Text>
                <Text style={styles.vsName}>{rival.name}</Text>
                <Text style={styles.vsCity}>{rival.city}</Text>
              </View>
            </View>
            <Text style={styles.matchingSub}>Sorular hazırlanıyor...</Text>
          </View>
        )}

        {phase === 'duel' && currentQuestion && (
          <>
            {/* Canlı VS Skor Tablosu */}
            <View style={styles.scoreboardCard}>
              <View style={styles.scoreCol}>
                <Text style={styles.scoreName}>🛡️ SEN</Text>
                <Text style={[styles.scorePoints, { color: colors.primary }]}>
                  {playerScore}
                </Text>
                <Text style={styles.scoreSub}>{playerCorrect} doğru</Text>
              </View>

              <View style={styles.centerMeta}>
                <Text style={styles.roundBadge}>
                  Soru {qIndex + 1}/{questions.length}
                </Text>
                <Text
                  style={[
                    styles.timerCircle,
                    timeLeft <= 5 && { color: colors.danger },
                  ]}
                >
                  ⏱ {timeLeft}s
                </Text>
              </View>

              <View style={styles.scoreCol}>
                <Text style={styles.scoreName}>
                  {rival.avatar} {rival.name}
                </Text>
                <Text style={[styles.scorePoints, { color: colors.secondary }]}>
                  {rivalScore}
                </Text>
                <Text style={styles.scoreSub}>
                  {rivalAnswered
                    ? rivalRoundGain && rivalRoundGain > 0
                      ? `✓ +${rivalRoundGain}`
                      : '✗ Yanlış'
                    : 'Düşünüyor...'}
                </Text>
              </View>
            </View>

            {/* Soru Kartı */}
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{currentQuestion.text}</Text>
            </View>

            {/* Şıklar */}
            <View style={styles.optionsList}>
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedKey === opt.key;
                const isCorrect = opt.key === currentQuestion.correctAnswer;
                const showResult = selectedKey !== null;

                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[
                      styles.optionCard,
                      showResult && isCorrect && styles.optionCorrect,
                      showResult && isSelected && !isCorrect && styles.optionWrong,
                    ]}
                    onPress={() => handleAnswer(opt.key)}
                    disabled={showResult}
                    activeOpacity={0.85}
                  >
                    <View style={styles.optionKeyBadge}>
                      <Text style={styles.optionKeyText}>{opt.key}</Text>
                    </View>
                    <Text style={styles.optionText}>{opt.text}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {phase === 'result' && (
          <View style={styles.resultCard}>
            <Text style={styles.resultEmoji}>
              {playerScore > rivalScore
                ? '🏆'
                : playerScore === rivalScore
                  ? '🤝'
                  : '💪'}
            </Text>
            <Text style={styles.resultTitle}>
              {playerScore > rivalScore
                ? 'Düelloyu Kazandın!'
                : playerScore === rivalScore
                  ? 'Berabere Bitti!'
                  : 'Rakip Öne Geçti!'}
            </Text>

            <View style={styles.finalVsBox}>
              <View style={styles.finalCol}>
                <Text style={styles.finalLabel}>SEN</Text>
                <Text style={[styles.finalScore, { color: colors.primary }]}>
                  {playerScore}
                </Text>
                <Text style={styles.finalCorrect}>
                  {playerCorrect}/{questions.length} Doğru
                </Text>
              </View>
              <Text style={styles.vsBigText}>VS</Text>
              <View style={styles.finalCol}>
                <Text style={styles.finalLabel}>{rival.name}</Text>
                <Text style={[styles.finalScore, { color: colors.secondary }]}>
                  {rivalScore}
                </Text>
                <Text style={styles.finalCorrect}>
                  {rivalCorrect}/{questions.length} Doğru
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={startMatchmaking}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>⚔️ Yeni Rakip Bul</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => setPhase('lobby')}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryBtnText}>Seviye Değiştir</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    topHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm + 4,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: colors.surfaceMuted,
    },
    backButtonText: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.primary,
    },
    headerTitle: {
      fontSize: 15.5,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    winBadge: {
      backgroundColor: colors.secondaryLight,
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 10,
    },
    winBadgeText: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.gold,
    },
    scrollContent: {
      padding: spacing.md,
      paddingBottom: spacing.xl,
      gap: spacing.md,
    },
    heroCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      gap: 6,
    },
    heroEmoji: {
      fontSize: 44,
    },
    heroTitle: {
      fontSize: 19,
      fontWeight: '800',
      color: colors.textPrimary,
      textAlign: 'center',
    },
    heroDesc: {
      fontSize: 13.5,
      lineHeight: 20,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    recordRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    recordPill: {
      backgroundColor: colors.surfaceMuted,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
    },
    recordText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    tierCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: spacing.md,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    tierCardActive: {
      borderColor: colors.primary,
      backgroundColor: colors.surfaceHighlight,
    },
    tierLeft: {
      flex: 1,
      marginRight: spacing.sm,
    },
    tierTitle: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    tierSub: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    tierBadge: {
      backgroundColor: colors.surfaceMuted,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 8,
    },
    tierBadgeText: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    primaryBtn: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: 'center',
      width: '100%',
    },
    primaryBtnText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '800',
    },
    secondaryBtn: {
      backgroundColor: colors.surfaceMuted,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      width: '100%',
    },
    secondaryBtnText: {
      color: colors.textPrimary,
      fontSize: 14,
      fontWeight: '700',
    },
    matchingCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: spacing.xl,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      gap: spacing.md,
    },
    matchingEmoji: {
      fontSize: 40,
    },
    matchingTitle: {
      fontSize: 20,
      fontWeight: '900',
      color: colors.textPrimary,
    },
    vsPreviewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      paddingVertical: spacing.sm,
    },
    vsPlayerBox: {
      alignItems: 'center',
      gap: 4,
    },
    vsAvatar: {
      fontSize: 38,
    },
    vsName: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    vsCity: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    vsBigText: {
      fontSize: 22,
      fontWeight: '900',
      color: colors.secondary,
    },
    matchingSub: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    scoreboardCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    scoreCol: {
      flex: 1,
      alignItems: 'center',
    },
    scoreName: {
      fontSize: 12.5,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    scorePoints: {
      fontSize: 22,
      fontWeight: '900',
      marginTop: 2,
    },
    scoreSub: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 2,
      fontWeight: '600',
    },
    centerMeta: {
      alignItems: 'center',
      paddingHorizontal: spacing.sm,
    },
    roundBadge: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.textSecondary,
    },
    timerCircle: {
      fontSize: 16,
      fontWeight: '900',
      color: colors.textPrimary,
      marginTop: 4,
    },
    questionCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    questionText: {
      fontSize: 15,
      fontWeight: '700',
      lineHeight: 22,
      color: colors.textPrimary,
    },
    optionsList: {
      gap: spacing.sm,
    },
    optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.sm + 4,
      borderWidth: 1.5,
      borderColor: colors.border,
      gap: spacing.sm,
    },
    optionCorrect: {
      backgroundColor: colors.successSurface,
      borderColor: colors.accent,
    },
    optionWrong: {
      backgroundColor: colors.dangerSurface,
      borderColor: colors.danger,
    },
    optionKeyBadge: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.surfaceMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionKeyText: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    optionText: {
      flex: 1,
      fontSize: 13.5,
      lineHeight: 19,
      color: colors.textPrimary,
      fontWeight: '600',
    },
    resultCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      gap: spacing.md,
    },
    resultEmoji: {
      fontSize: 52,
    },
    resultTitle: {
      fontSize: 22,
      fontWeight: '900',
      color: colors.textPrimary,
    },
    finalVsBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      backgroundColor: colors.surfaceSubtle,
      borderRadius: 14,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    finalCol: {
      alignItems: 'center',
    },
    finalLabel: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.textSecondary,
    },
    finalScore: {
      fontSize: 28,
      fontWeight: '900',
      marginVertical: 2,
    },
    finalCorrect: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '600',
    },
  });
