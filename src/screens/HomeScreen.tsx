import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { spacing, ThemeColors } from '../theme/colors';
import { useTheme } from '../context/ThemeContext';
import { EXAM_TRACK_LABELS, useUser } from '../context/UserContext';
import { StorageService, UserStatistics, DEFAULT_GAME_PROGRESS } from '../utils/storage';
import { GameProgress } from '../types';
import { EXAM_PERIODS } from '../data/mockExams';
import { LESSON_BOOKS } from '../data/lessons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark, toggleTheme } = useTheme();
  const { preferences, dailyProgress, refreshDailyProgress } = useUser();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [stats, setStats] = useState<UserStatistics>({
    totalSolvedQuestions: 0,
    totalCorrect: 0,
    totalWrong: 0,
    completedExamsCount: 0,
    streakDays: 1,
    lastStudyDate: '',
  });

  const [wrongCount, setWrongCount] = useState(0);
  const [completedChapterIds, setCompletedChapterIds] = useState<string[]>([]);
  const [gameProgress, setGameProgress] = useState<GameProgress>(DEFAULT_GAME_PROGRESS);

  useEffect(() => {
    const loadData = async () => {
      const userStats = await StorageService.getUserStats();
      setStats(userStats);
      const wrongs = await StorageService.getWrongQuestions();
      setWrongCount(wrongs.length);
      const completed = await StorageService.getCompletedChapterIds();
      setCompletedChapterIds(completed);
      const games = await StorageService.getGameProgress();
      setGameProgress(games);
      await refreshDailyProgress();
    };

    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    loadData();
    return unsubscribe;
  }, [navigation]);

  const latestExam = EXAM_PERIODS[0];
  const trackLabel = EXAM_TRACK_LABELS[preferences.examType];
  const dailyGoal = Math.max(1, preferences.dailyGoal);
  const solvedToday = dailyProgress.solvedCount;
  const dailyRatio = Math.min(1, solvedToday / dailyGoal);
  const remainingToday = Math.max(0, dailyGoal - solvedToday);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View>
          <Text style={styles.headerSubtitle}>{trackLabel.toUpperCase()} • HAZIRLIK</Text>
          <Text style={styles.headerTitle}>Geleceğin Güvenliği</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.themeToggleButton}
            onPress={toggleTheme}
            activeOpacity={0.75}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.themeToggleText}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
          <View style={styles.streakBadge}>
            <Text style={styles.streakFire}>🔥</Text>
            <Text style={styles.streakText}>{stats.streakDays} Gün</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Sınav Geri Sayımı Banner */}
        <View style={styles.countdownCard}>
          <View style={styles.countdownHeader}>
            <View style={styles.badgeOfficial}>
              <Text style={styles.badgeOfficialText}>EGM SINAV TAKVİMİ</Text>
            </View>
            <Text style={styles.countdownDate}>106. Dönem Sınavı</Text>
          </View>
          <Text style={styles.countdownTitle}>Büyük Sınava Kalan Süre</Text>
          <View style={styles.countdownTimerRow}>
            <View style={styles.timerBox}>
              <Text style={styles.timerNumber}>24</Text>
              <Text style={styles.timerLabel}>GÜN</Text>
            </View>
            <Text style={styles.timerDots}>:</Text>
            <View style={styles.timerBox}>
              <Text style={styles.timerNumber}>14</Text>
              <Text style={styles.timerLabel}>SAAT</Text>
            </View>
            <Text style={styles.timerDots}>:</Text>
            <View style={styles.timerBox}>
              <Text style={styles.timerNumber}>30</Text>
              <Text style={styles.timerLabel}>DAKİKA</Text>
            </View>
          </View>
        </View>

        {/* Günlük Hedef Kartı */}
        <View style={styles.dailyGoalCard}>
          <View style={styles.dailyGoalHeader}>
            <View>
              <Text style={styles.dailyGoalTitle}>
                Bugün {solvedToday} / {dailyGoal} soru
              </Text>
              <Text style={styles.dailyGoalSub}>
                {remainingToday === 0
                  ? '🎉 Günlük hedefini tamamladın!'
                  : `Hedefe ${remainingToday} soru kaldı`}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.dailyGoalBadge}
              onPress={() => navigation.navigate('ProfileTab')}
            >
              <Text style={styles.dailyGoalBadgeText}>{trackLabel}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round(dailyRatio * 100)}%` }]} />
          </View>
        </View>

        {/* Hızlı Başlat: En Son Çıkmış Sınav */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hızlı Başlat</Text>
        </View>

        <TouchableOpacity
          style={styles.actionHeroCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ExamSolve', { examId: latestExam.id })}
        >
          <View style={styles.actionHeroLeft}>
            <View style={styles.freeBadge}>
              <Text style={styles.freeBadgeText}>GÜNCEL SINAV</Text>
            </View>
            <Text style={styles.actionHeroTitle}>{latestExam.title}</Text>
            <Text style={styles.actionHeroSubtitle}>
              {preferences.examType === 'silahsiz'
                ? '100 Temel Eğitim Sorusu • 120 Dakika'
                : '100 Temel + 25 Silah Sorusu • 150 Dakika'}
            </Text>
          </View>
          <View style={styles.playButtonCircle}>
            <Text style={styles.playButtonText}>▶</Text>
          </View>
        </TouchableOpacity>

        {/* 4'lü Hızlı Erişim Grid */}
        <View style={styles.gridContainer}>
          <TouchableOpacity
            style={[styles.gridCard, { borderLeftColor: colors.primary }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ExamsTab')}
          >
            <Text style={styles.gridIcon}>📝</Text>
            <Text style={styles.gridTitle}>Çıkmış Sorular</Text>
            <Text style={styles.gridSubtitle}>Tüm Dönemler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.gridCard, { borderLeftColor: colors.accent }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('FlashcardsTab')}
          >
            <Text style={styles.gridIcon}>💡</Text>
            <Text style={styles.gridTitle}>Bilgi Kartları</Text>
            <Text style={styles.gridSubtitle}>Hap Bilgiler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.gridCard, { borderLeftColor: colors.secondary }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ScoreCalculatorTab')}
          >
            <Text style={styles.gridIcon}>🧮</Text>
            <Text style={styles.gridTitle}>Puan Hesapla</Text>
            <Text style={styles.gridSubtitle}>Resmi Baraj</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.gridCard, { borderLeftColor: colors.danger }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Mistakes')}
          >
            <View style={styles.wrongCountBadge}>
              <Text style={styles.wrongBadgeText}>{wrongCount}</Text>
            </View>
            <Text style={styles.gridIcon}>❌</Text>
            <Text style={styles.gridTitle}>Hata Defteri</Text>
            <Text style={styles.gridSubtitle}>Yanlışlarım</Text>
          </TouchableOpacity>
        </View>

        {/* Dersler (Konu Kitabı) */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>Dersler</Text>
            <Text style={styles.sectionSubtitle}>Konu kitabı gibi bölüm bölüm oku</Text>
          </View>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => navigation.navigate('Lessons')}
            activeOpacity={0.75}
          >
            <Text style={styles.seeAllText}>Tümünü Gör →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.lessonsShelf}
        >
          {LESSON_BOOKS.map((book) => {
            const readCount = book.chapters.filter((ch) =>
              completedChapterIds.includes(ch.id)
            ).length;
            const totalChapters = book.chapters.length;
            const ratio = totalChapters > 0 ? readCount / totalChapters : 0;
            const isDone = readCount === totalChapters && totalChapters > 0;

            return (
              <TouchableOpacity
                key={book.id}
                style={[styles.lessonBookCard, { borderTopColor: book.color }]}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate('LessonReader', { lessonId: book.id })
                }
              >
                <View style={styles.lessonBookHeader}>
                  <View
                    style={[
                      styles.lessonEmojiBox,
                      { backgroundColor: `${book.color}1A` },
                    ]}
                  >
                    <Text style={styles.lessonEmoji}>{book.emoji}</Text>
                  </View>
                  <View
                    style={[
                      styles.lessonWeightPill,
                      { backgroundColor: `${book.color}18` },
                    ]}
                  >
                    <Text style={[styles.lessonWeightText, { color: book.color }]}>
                      {book.examQuestionCount} Soru
                    </Text>
                  </View>
                </View>

                <Text style={styles.lessonBookTitle} numberOfLines={2}>
                  {book.shortTitle}
                </Text>
                <Text style={styles.lessonBookMeta}>
                  {totalChapters} Bölüm
                  {book.isWeaponOnly ? ' • Silahlı' : ''}
                </Text>

                <View style={styles.lessonProgressWrap}>
                  <View style={styles.lessonProgressTrack}>
                    <View
                      style={[
                        styles.lessonProgressFill,
                        {
                          width: `${Math.round(ratio * 100)}%`,
                          backgroundColor: isDone ? colors.accent : book.color,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.lessonProgressText,
                      isDone && { color: colors.accent },
                    ]}
                  >
                    {isDone ? 'Tamamlandı ✓' : `${readCount}/${totalChapters}`}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Oyunlar (3 Bölüm) */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>🎮 Oyunlar</Text>
            <Text style={styles.sectionSubtitle}>Eğlenerek öğren ve kısa mola ver</Text>
          </View>
        </View>

        <View style={styles.gamesColumn}>
          <TouchableOpacity
            style={[styles.gameCard, { borderLeftColor: '#14B8A6' }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('XrayGame')}
          >
            <View style={[styles.gameIconWrap, { backgroundColor: 'rgba(20, 184, 166, 0.14)' }]}>
              <Text style={styles.gameIcon}>📡</Text>
            </View>
            <View style={styles.gameInfo}>
              <Text style={styles.gameTitle}>X-Ray Oyunu</Text>
              <Text style={styles.gameSubtitle}>
                Bagajları tara, renk kodlarıyla yasaklıyı yakala
              </Text>
            </View>
            <View style={styles.gameRight}>
              <View style={styles.gameBadge}>
                <Text style={styles.gameBadgeText}>
                  🏆 {gameProgress.xrayBestScore}
                </Text>
              </View>
              <Text style={styles.gameArrow}>Oyna →</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.gameCard, { borderLeftColor: '#F59E0B' }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('ChallengeGame')}
          >
            <View style={[styles.gameIconWrap, { backgroundColor: 'rgba(245, 158, 11, 0.14)' }]}>
              <Text style={styles.gameIcon}>⚔️</Text>
            </View>
            <View style={styles.gameInfo}>
              <Text style={styles.gameTitle}>Rakiplerine Meydan Oku</Text>
              <Text style={styles.gameSubtitle}>
                7 soruluk 1’e 1 hızlı bilgi düellosu
              </Text>
            </View>
            <View style={styles.gameRight}>
              <View style={styles.gameBadge}>
                <Text style={styles.gameBadgeText}>
                  {gameProgress.challengeWins} Galibiyet
                </Text>
              </View>
              <Text style={styles.gameArrow}>Başla →</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.gameCard, { borderLeftColor: '#EC4899' }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('BallSortGame')}
          >
            <View style={[styles.gameIconWrap, { backgroundColor: 'rgba(236, 72, 153, 0.14)' }]}>
              <Text style={styles.gameIcon}>🎨</Text>
            </View>
            <View style={styles.gameInfo}>
              <Text style={styles.gameTitle}>Mola Oyunu</Text>
              <Text style={styles.gameSubtitle}>
                Renkli topları tüplerde üst üste diz
              </Text>
            </View>
            <View style={styles.gameRight}>
              <View style={styles.gameBadge}>
                <Text style={styles.gameBadgeText}>
                  Seviye {gameProgress.ballSortLevel}
                </Text>
              </View>
              <Text style={styles.gameArrow}>Oyna →</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* İlerleme ve Başarı Özeti */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Çalışma Durumum</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statCol}>
            <Text style={styles.statValue}>{stats.totalSolvedQuestions}</Text>
            <Text style={styles.statLabel}>Çözülen Soru</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCol}>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {stats.totalCorrect}
            </Text>
            <Text style={styles.statLabel}>Doğru</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCol}>
            <Text style={[styles.statValue, { color: colors.danger }]}>
              {stats.totalWrong}
            </Text>
            <Text style={styles.statLabel}>Yanlış</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCol}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {stats.totalSolvedQuestions > 0
                ? `%${Math.round((stats.totalCorrect / stats.totalSolvedQuestions) * 100)}`
                : '%0'}
            </Text>
            <Text style={styles.statLabel}>Başarı Oranı</Text>
          </View>
        </View>
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
  header: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  themeToggleButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  themeToggleText: {
    fontSize: 16,
  },
  headerSubtitle: {
    color: colors.secondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  streakFire: {
    fontSize: 14,
    marginRight: 4,
  },
  streakText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  countdownCard: {
    backgroundColor: '#1E3A8A',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  countdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badgeOfficial: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeOfficialText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  countdownDate: {
    color: '#FEF3C7',
    fontSize: 12,
    fontWeight: '600',
  },
  countdownTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginVertical: spacing.xs,
  },
  countdownTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: spacing.xs,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    borderRadius: 12,
    paddingVertical: spacing.sm,
  },
  timerBox: {
    alignItems: 'center',
  },
  timerNumber: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  timerLabel: {
    color: '#CBD5E1',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  timerDots: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dailyGoalCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dailyGoalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dailyGoalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  dailyGoalSub: {
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dailyGoalBadge: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  dailyGoalBadgeText: {
    color: colors.primary,
    fontSize: 11.5,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  sectionHeader: {
    marginBottom: spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  seeAllButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.surfaceHighlight,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  lessonsShelf: {
    gap: spacing.sm + 4,
    paddingBottom: spacing.md,
    paddingRight: spacing.xs,
  },
  lessonBookCard: {
    width: 158,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.sm + 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    justifyContent: 'space-between',
  },
  lessonBookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  lessonEmojiBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonEmoji: {
    fontSize: 18,
  },
  lessonWeightPill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  lessonWeightText: {
    fontSize: 10,
    fontWeight: '800',
  },
  lessonBookTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 18,
    minHeight: 36,
  },
  lessonBookMeta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  lessonProgressWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lessonProgressTrack: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
  lessonProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  lessonProgressText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  gamesColumn: {
    gap: spacing.sm + 2,
    marginBottom: spacing.md,
  },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.sm + 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 5,
    gap: spacing.sm + 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  gameIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameIcon: {
    fontSize: 22,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  gameSubtitle: {
    fontSize: 11.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  gameRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  gameBadge: {
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  gameBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  gameArrow: {
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  actionHeroCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  actionHeroLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },
  freeBadge: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  freeBadgeText: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '800',
  },
  actionHeroTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  actionHeroSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  playButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
    marginBottom: spacing.md,
  },
  gridCard: {
    width: '48.8%',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    position: 'relative',
  },
  gridIcon: {
    fontSize: 26,
    marginBottom: spacing.xs,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  gridSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  wrongCountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.danger,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  wrongBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
});
