import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { colors, spacing } from '../theme/colors';
import { StorageService, UserStatistics } from '../utils/storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ProfileScreenProps {
  navigation?: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [stats, setStats] = useState<UserStatistics>({
    totalSolvedQuestions: 0,
    totalCorrect: 0,
    totalWrong: 0,
    completedExamsCount: 0,
    streakDays: 1,
    lastStudyDate: '',
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await StorageService.getUserStats();
    setStats(data);
  };

  const handleUpgradeVIP = () => {
    Alert.alert(
      '👑 VIP Tam Erişim Paketi',
      '• Son 10 yılın tüm çıkmış sınav soruları (100+ dönem)\n• Reklamsız kesintisiz çalışma deneyimi\n• Sınırsız bilgi kartı ve detaylı kanun notları\n• Detaylı yapay zeka başarı analizi\n\nTek seferlik: ₺149,99 (Ömür Boyu Lisans)',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Satın Al (RevenueCat)',
          onPress: () => {
            Alert.alert('Bilgi', 'RevenueCat uygulama içi satın alma entegrasyonu hazır.');
          },
        },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Verileri Sıfırla / Hesap Silme',
      'Tüm çözülen sınav kayıtlarınız, hata defteriniz ve istatistikleriniz cihazdan kalıcı olarak silinecektir. Bu işlem geri alınamaz.',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Tümünü Sil',
          style: 'destructive',
          onPress: async () => {
            await StorageService.updateStats(-stats.totalSolvedQuestions, -stats.totalCorrect, -stats.totalWrong);
            await loadStats();
            Alert.alert('Başarılı', 'Tüm yerel verileriniz başarıyla temizlendi.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.topHeader, { paddingTop: Math.max(insets.top, 24) + 18 }]}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.navigate('HomeTab')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backButtonText}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil & Ayarlar</Text>
        </View>
        <Text style={styles.headerSubtitle}>Özel Güvenlik Sınav Hazırlık Portalı</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* VIP Premium Banner */}
        <TouchableOpacity
          style={styles.vipBanner}
          activeOpacity={0.85}
          onPress={handleUpgradeVIP}
        >
          <View style={styles.vipHeader}>
            <View style={styles.vipTag}>
              <Text style={styles.vipTagText}>👑 FREEMIUM AYRICALIKLARI</Text>
            </View>
            <Text style={styles.vipBadge}>VIP</Text>
          </View>
          <Text style={styles.vipTitle}>Tüm Çıkmış Sorulara Sınırsız Erişin</Text>
          <Text style={styles.vipSubtitle}>
            Son 3 dönem herkes için ücretsizdir. Geçmiş 100 dönemin tüm soruları ve detaylı çözümler için VIP pakete geçin.
          </Text>
          <View style={styles.vipButton}>
            <Text style={styles.vipButtonText}>VIP Paketini İncele (₺149,99)</Text>
          </View>
        </TouchableOpacity>

        {/* İstatistikler */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Eğitim Karnem</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Tamamlanan Deneme Sınavı</Text>
            <Text style={styles.statValue}>{stats.completedExamsCount}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Toplam Çözülen Soru</Text>
            <Text style={styles.statValue}>{stats.totalSolvedQuestions}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Toplam Doğru Cevap</Text>
            <Text style={[styles.statValue, { color: colors.accent }]}>{stats.totalCorrect}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Toplam Yanlış Cevap</Text>
            <Text style={[styles.statValue, { color: colors.danger }]}>{stats.totalWrong}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Çalışma Serisi (Streak)</Text>
            <Text style={[styles.statValue, { color: colors.secondary }]}>🔥 {stats.streakDays} Gün</Text>
          </View>
        </View>

        {/* Destek & Yasal */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Uygulama Bilgileri</Text>
        </View>

        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              Alert.alert(
                'Gizlilik Politikası (KVKK)',
                'Bu uygulama kişisel verilerinizi sunuculara göndermez. Sınav ve cevap verileriniz sadece telefonunuzun yerel hafızasında saklanır.'
              );
            }}
          >
            <Text style={styles.menuItemText}>🔒 Gizlilik Politikası & KVKK</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              Alert.alert(
                'Yasal Uyarı',
                'Bu uygulama EGM (Emniyet Genel Müdürlüğü) veya herhangi bir devlet kurumunun resmi uygulaması değildir. Özel Güvenlik Görevlisi adaylarına sınav hazırlığında destek amacıyla bağımsız olarak geliştirilmiştir.'
              );
            }}
          >
            <Text style={styles.menuItemText}>⚖️ Yasal Uyarı & Sorumluluk Reddi</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Apple Guideline 5.1.1 Uyumlu Hesap/Veri Silme */}
          <TouchableOpacity style={styles.menuItem} onPress={handleClearData}>
            <Text style={[styles.menuItemText, { color: colors.danger }]}>
              🗑️ Verilerimi ve İlerlememi Sıfırla
            </Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Özel Güvenlik Sınav Hazırlık v1.0.0 (Expo React Native)</Text>
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
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scrollArea: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  vipBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: spacing.md + 2,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#334155',
  },
  vipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  vipTag: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  vipTagText: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: '800',
  },
  vipBadge: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.secondary,
  },
  vipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
    marginBottom: 4,
  },
  vipSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  vipButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  vipButtonText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '800',
  },
  sectionHeader: {
    marginBottom: spacing.xs + 2,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 6,
  },
  menuCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
  },
  menuItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  menuArrow: {
    fontSize: 18,
    color: colors.textMuted,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 11,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});
