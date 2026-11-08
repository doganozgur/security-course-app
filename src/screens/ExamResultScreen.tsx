import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, spacing } from '../theme/colors';
import { UserExamAttempt, Question } from '../types';
import { CATEGORIES } from '../data/categories';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ExamResultScreenProps {
  route: any;
  navigation: any;
}

export const ExamResultScreen: React.FC<ExamResultScreenProps> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { attempt, questions }: { attempt: UserExamAttempt; questions: Question[] } =
    route.params || {};

  if (!attempt) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ padding: 20 }}>Sonuç bilgisi bulunamadı.</Text>
      </SafeAreaView>
    );
  }

  const passed = attempt.passed;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top, 24) + 18 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Sonuç Kartı Başlığı */}
        <View style={[styles.resultBanner, passed ? styles.bannerPass : styles.bannerFail]}>
          <Text style={styles.resultEmoji}>{passed ? '🎉' : '⚠️'}</Text>
          <Text style={styles.resultTitle}>
            {passed ? 'TEBRİKLER! SINAVI GEÇTİNİZ' : 'BARAJIN ALTINDA KALDINIZ'}
          </Text>
          <Text style={styles.resultSubtitle}>
            {passed
              ? '60 puan başarı barajını başarıyla aştınız.'
              : 'Silahsız/Silahlı geçme barajı en az 60 puandır. Yanlışlarını tekrar ederek eksiklerini kapatabilirsin.'}
          </Text>

          {/* Büyük Puan */}
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>{attempt.totalScore}</Text>
            <Text style={styles.scoreLabel}>PUAN</Text>
          </View>
        </View>

        {/* Özet Metrikler */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={[styles.metricValue, { color: colors.accent }]}>
              {attempt.correctCount}
            </Text>
            <Text style={styles.metricLabel}>Doğru</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={[styles.metricValue, { color: colors.danger }]}>
              {attempt.wrongCount}
            </Text>
            <Text style={styles.metricLabel}>Yanlış</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={[styles.metricValue, { color: colors.textSecondary }]}>
              {attempt.emptyCount}
            </Text>
            <Text style={styles.metricLabel}>Boş</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={[styles.metricValue, { color: colors.primary }]}>
              {Math.floor(attempt.timeSpentSeconds / 60)} dk
            </Text>
            <Text style={styles.metricLabel}>Süre</Text>
          </View>
        </View>

        {/* Hata Defteri Bildirimi */}
        {attempt.wrongCount > 0 && (
          <TouchableOpacity
            style={styles.mistakeBanner}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Mistakes')}
          >
            <View style={styles.mistakeLeft}>
              <Text style={styles.mistakeIcon}>📚</Text>
              <View>
                <Text style={styles.mistakeTitle}>
                  {attempt.wrongCount} Yanlış Soru Hata Defterine Eklendi
                </Text>
                <Text style={styles.mistakeSubtitle}>
                  Sadece yanlış yaptığın soruları tekrar çözmek için tıkla
                </Text>
              </View>
            </View>
            <Text style={styles.mistakeArrow}>→</Text>
          </TouchableOpacity>
        )}

        {/* Konu Bazlı Başarı Analizi */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Konu Bazlı Başarı Analizi</Text>
        </View>

        <View style={styles.analysisContainer}>
          {Object.entries(attempt.categoryBreakdown).map(([catKey, data]: any) => {
            const meta = CATEGORIES[catKey as keyof typeof CATEGORIES];
            const ratio = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            const categoryName = meta?.name || catKey;

            return (
              <View key={catKey} style={styles.categoryRow}>
                <View style={styles.catLabelRow}>
                  <Text style={styles.catName}>{categoryName}</Text>
                  <Text style={styles.catRatio}>
                    {data.correct}/{data.total} (%{ratio})
                  </Text>
                </View>
                <View style={styles.barBackground}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${ratio}%`,
                        backgroundColor: ratio >= 60 ? colors.accent : colors.danger,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>

        {/* Aksiyon Butonları */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.primaryBtn]}
            onPress={() => navigation.navigate('MainTabs', { screen: 'HomeTab' })}
          >
            <Text style={styles.primaryBtnText}>Ana Sayfaya Dön</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.secondaryBtn]}
            onPress={() => navigation.navigate('MainTabs', { screen: 'ExamsTab' })}
          >
            <Text style={styles.secondaryBtnText}>Başka Sınav Seç</Text>
          </TouchableOpacity>
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
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  resultBanner: {
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bannerPass: {
    backgroundColor: '#064E3B',
  },
  bannerFail: {
    backgroundColor: '#7F1D1D',
  },
  resultEmoji: {
    fontSize: 40,
    marginBottom: spacing.xs,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  resultSubtitle: {
    fontSize: 12,
    color: '#E2E8F0',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
    paddingHorizontal: spacing.md,
  },
  scoreCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: -2,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.sm,
    alignItems: 'center',
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  metricLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  mistakeBanner: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 14,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  mistakeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mistakeIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  mistakeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.danger,
  },
  mistakeSubtitle: {
    fontSize: 11,
    color: '#991B1B',
    marginTop: 2,
  },
  mistakeArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.danger,
    marginLeft: spacing.sm,
  },
  sectionHeader: {
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  analysisContainer: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  categoryRow: {
    marginBottom: spacing.sm + 4,
  },
  catLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  catName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  catRatio: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  barBackground: {
    height: 6,
    backgroundColor: colors.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  actionsContainer: {
    flexDirection: 'column',
    marginTop: spacing.xs,
  },
  actionBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryBtnText: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
});
