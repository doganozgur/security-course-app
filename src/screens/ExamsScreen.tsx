import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { colors, spacing } from '../theme/colors';
import { EXAM_PERIODS } from '../data/mockExams';
import { ExamPeriod } from '../types';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface ExamsScreenProps {
  navigation: any;
}

export const ExamsScreen: React.FC<ExamsScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<'all' | 'free' | 'weapon'>('all');

  const filteredExams = EXAM_PERIODS.filter((exam) => {
    if (filter === 'free') return exam.isFree;
    if (filter === 'weapon') return exam.hasWeaponSection;
    return true;
  });

  const handleExamPress = (exam: ExamPeriod) => {
    if (!exam.isFree) {
      if (Platform.OS === 'web') {
        const goVip = window.confirm(
          '👑 VIP Özel Arşiv\n\nBu sınav arşivi Premium üyelerimize açıktır. Son 3 dönemin sınavlarını tamamen ücretsiz çözebilirsiniz!\n\nAyrıcalıkları görmek ister misiniz?'
        );
        if (goVip) {
          navigation.navigate('ProfileTab');
        }
      } else {
        Alert.alert(
          '👑 VIP Özel Arşiv',
          'Bu sınav arşivi Premium üyelerimize açıktır. Son 3 dönemin sınavlarını tamamen ücretsiz çözebilirsiniz!\n\nTüm çıkmış sorulara ve detaylı çözümlere sınırsız erişmek ister misiniz?',
          [
            { text: 'Daha Sonra', style: 'cancel' },
            { text: 'Ayrıcalıkları Gör', onPress: () => navigation.navigate('ProfileTab') },
          ]
        );
      }
      return;
    }

    if (Platform.OS === 'web') {
      navigation.navigate('ExamSolve', {
        examId: exam.id,
        mode: 'real',
      });
      return;
    }

    // Modal / Alert for Mode Selection
    Alert.alert(
      exam.title,
      'Sınavı hangi modda çözmek istersiniz?',
      [
        {
          text: 'Gerçek Sınav Modu (Süreli)',
          onPress: () =>
            navigation.navigate('ExamSolve', {
              examId: exam.id,
              mode: 'real',
            }),
        },
        {
          text: 'Pratik Modu (Anında Çözümlü)',
          onPress: () =>
            navigation.navigate('ExamSolve', {
              examId: exam.id,
              mode: 'practice',
            }),
        },
        { text: 'İptal', style: 'cancel' },
      ]
    );
  };

  const renderExamCard = ({ item }: { item: ExamPeriod }) => (
    <TouchableOpacity
      style={[styles.examCard, !item.isFree && styles.premiumCard]}
      activeOpacity={0.8}
      onPress={() => handleExamPress(item)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.periodBadge}>
          <Text style={styles.periodNumber}>{item.periodNumber}. DÖNEM</Text>
        </View>
        {item.isFree ? (
          <View style={styles.freeTag}>
            <Text style={styles.freeTagText}>Ücretsiz</Text>
          </View>
        ) : (
          <View style={styles.premiumTag}>
            <Text style={styles.premiumTagText}>👑 VIP</Text>
          </View>
        )}
      </View>

      <Text style={styles.examTitle}>{item.title}</Text>
      <Text style={styles.examDesc}>{item.description}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>⏱️</Text>
          <Text style={styles.metaText}>{item.durationMinutes} Dk</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>📋</Text>
          <Text style={styles.metaText}>{item.questionCount} Soru</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>🎯</Text>
          <Text style={styles.metaText}>
            {item.hasWeaponSection ? 'Silahlı + Silahsız' : 'Silahsız'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 24) + 18 }]}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('HomeTab')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backButtonText}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Çıkmış Sınavlar</Text>
        </View>
        <Text style={styles.screenSubtitle}>
          EGM Özel Güvenlik Denetleme Başkanlığı Resmi Sınavları
        </Text>

        {/* Filtre Sekmeleri */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
            onPress={() => setFilter('all')}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === 'all' && styles.filterChipTextActive,
              ]}
            >
              Tüm Dönemler
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, filter === 'free' && styles.filterChipActive]}
            onPress={() => setFilter('free')}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === 'free' && styles.filterChipTextActive,
              ]}
            >
              Ücretsizler (Son 3)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, filter === 'weapon' && styles.filterChipActive]}
            onPress={() => setFilter('weapon')}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === 'weapon' && styles.filterChipTextActive,
              ]}
            >
              Silahlı Dahil
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredExams}
        keyExtractor={(item) => item.id}
        renderItem={renderExamCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
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
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  screenSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  filterRow: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  examCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  premiumCard: {
    backgroundColor: '#FBFDFF',
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  periodBadge: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 6,
  },
  periodNumber: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  freeTag: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  freeTagText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: 'bold',
  },
  premiumTag: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  premiumTagText: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: 'bold',
  },
  examTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 4,
  },
  examDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    marginTop: spacing.md,
    paddingTop: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  metaIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
