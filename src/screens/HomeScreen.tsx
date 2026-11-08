import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { colors, spacing } from '../theme/colors';
import { StorageService, UserStatistics } from '../utils/storage';
import { EXAM_PERIODS } from '../data/mockExams';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [stats, setStats] = useState<UserStatistics>({
    totalSolvedQuestions: 0,
    totalCorrect: 0,
    totalWrong: 0,
    completedExamsCount: 0,
    streakDays: 1,
    lastStudyDate: '',
  });

  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const userStats = await StorageService.getUserStats();
      setStats(userStats);
      const wrongs = await StorageService.getWrongQuestions();
      setWrongCount(wrongs.length);
    };

    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    loadData();
    return unsubscribe;
  }, [navigation]);

  const latestExam = EXAM_PERIODS[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 24) + 18 }]}>
        <View>
          <Text style={styles.headerSubtitle}>ÖZEL GÜVENLİK SINAVINA HAZIRLIK</Text>
          <Text style={styles.headerTitle}>Geleceğin Güvenliği</Text>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streakFire}>🔥</Text>
          <Text style={styles.streakText}>{stats.streakDays} Gün</Text>
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
              100 Temel + 25 Silah Sorusu • 120 Dakika
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

        {/* Bilgilendirme Notu */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            ℹ️ Bu uygulama Özel Güvenlik Görevlisi adayları için bağımsız bir eğitim platformudur. EGM resmi kurumu değildir.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: spacing.xxl,
  },
  countdownCard: {
    backgroundColor: colors.primary,
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
    color: colors.secondaryLight,
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
  sectionHeader: {
    marginVertical: spacing.sm,
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
    marginBottom: spacing.md,
  },
  gridCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm + 4,
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
  disclaimerBox: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: spacing.sm + 2,
    marginTop: spacing.xs,
  },
  disclaimerText: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
});
