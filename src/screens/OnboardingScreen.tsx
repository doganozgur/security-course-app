import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, ThemeColors } from '../theme/colors';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { ExamTrack } from '../types';

const EXAM_TRACK_OPTIONS: {
  id: ExamTrack;
  icon: string;
  title: string;
  subtitle: string;
}[] = [
  {
    id: 'silahli',
    icon: '🎯',
    title: 'Silahlı Özel Güvenlik',
    subtitle: '100 Temel Eğitim + 25 Silah Bilgisi + Atış Puanı',
  },
  {
    id: 'silahsiz',
    icon: '🛡️',
    title: 'Silahsız Özel Güvenlik',
    subtitle: '100 Temel Eğitim Sorusu (Silah soruları hariç)',
  },
  {
    id: 'yenileme',
    icon: '🔄',
    title: 'Yenileme Eğitimi',
    subtitle: 'ÖGG kimlik yenileme sınavına özel hazırlık',
  },
];

const DAILY_GOALS = [10, 20, 30];

export const OnboardingScreen: React.FC = () => {
  const { colors } = useTheme();
  const { completeOnboarding } = useUser();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [selectedTrack, setSelectedTrack] = useState<ExamTrack>('silahli');
  const [selectedGoal, setSelectedGoal] = useState<number>(20);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStart = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await completeOnboarding(selectedTrack, selectedGoal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ÖZEL GÜVENLİK SINAV HAZIRLIK</Text>
          </View>
          <Text style={styles.title}>Sınavına Özel Başla</Text>
          <Text style={styles.subtitle}>
            Soruları ve puan hesaplamayı sana göre ayarlayabilmemiz için sınav türünü seç.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>SINAV TÜRÜN</Text>
        <View style={styles.optionsList}>
          {EXAM_TRACK_OPTIONS.map((item) => {
            const isSelected = selectedTrack === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.trackCard, isSelected && styles.trackCardActive]}
                activeOpacity={0.85}
                onPress={() => setSelectedTrack(item.id)}
              >
                <View style={[styles.iconBox, isSelected && styles.iconBoxActive]}>
                  <Text style={styles.iconText}>{item.icon}</Text>
                </View>
                <View style={styles.trackContent}>
                  <Text style={[styles.trackTitle, isSelected && styles.trackTitleActive]}>
                    {item.title}
                  </Text>
                  <Text style={styles.trackSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionLabel}>GÜNLÜK SORU HEDEFİN</Text>
        <View style={styles.goalRow}>
          {DAILY_GOALS.map((goal) => {
            const isSelected = selectedGoal === goal;
            return (
              <TouchableOpacity
                key={goal}
                style={[styles.goalPill, isSelected && styles.goalPillActive]}
                activeOpacity={0.8}
                onPress={() => setSelectedGoal(goal)}
              >
                <Text style={[styles.goalNumber, isSelected && styles.goalNumberActive]}>
                  {goal}
                </Text>
                <Text style={[styles.goalUnit, isSelected && styles.goalUnitActive]}>
                  soru/gün
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.hintText}>
          Bu tercihleri daha sonra Profil ekranından istediğin zaman değiştirebilirsin.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.88}
          onPress={handleStart}
          disabled={isSubmitting}
        >
          <Text style={styles.startButtonText}>Hemen Başla →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: spacing.lg,
      paddingBottom: spacing.xl,
    },
    header: {
      marginTop: spacing.md,
      marginBottom: spacing.xl,
    },
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.primaryLight,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 8,
      marginBottom: spacing.sm,
    },
    badgeText: {
      color: colors.primary,
      fontSize: 11,
      fontWeight: '800',
      letterSpacing: 0.6,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.textPrimary,
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.textSecondary,
    },
    sectionLabel: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.textMuted,
      letterSpacing: 0.8,
      marginBottom: spacing.sm,
    },
    optionsList: {
      gap: spacing.sm,
      marginBottom: spacing.xl,
    },
    trackCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.md,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    trackCardActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight,
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    iconBoxActive: {
      backgroundColor: colors.card,
    },
    iconText: {
      fontSize: 22,
    },
    trackContent: {
      flex: 1,
      marginRight: spacing.sm,
    },
    trackTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: 2,
    },
    trackTitleActive: {
      color: colors.primary,
    },
    trackSubtitle: {
      fontSize: 12.5,
      lineHeight: 17,
      color: colors.textSecondary,
    },
    radioOuter: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioOuterActive: {
      borderColor: colors.primary,
    },
    radioInner: {
      width: 11,
      height: 11,
      borderRadius: 6,
      backgroundColor: colors.primary,
    },
    goalRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    goalPill: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 14,
      paddingVertical: spacing.md,
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    goalPillActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight,
    },
    goalNumber: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    goalNumberActive: {
      color: colors.primary,
    },
    goalUnit: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    goalUnitActive: {
      color: colors.primary,
      fontWeight: '600',
    },
    hintText: {
      fontSize: 12.5,
      color: colors.textMuted,
      textAlign: 'center',
    },
    footer: {
      padding: spacing.lg,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
    },
    startButton: {
      backgroundColor: colors.primary,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: 'center',
    },
    startButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '800',
    },
  });
