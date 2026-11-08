import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { colors, spacing } from '../theme/colors';
import { calculateOGGScore } from '../utils/scoreCalculator';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScoreCalculatorScreenProps {
  navigation?: any;
}

export const ScoreCalculatorScreen: React.FC<ScoreCalculatorScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [examType, setExamType] = useState<'silahsiz' | 'silahli'>('silahli');
  const [temelDogru, setTemelDogru] = useState<string>('65');
  const [silahDogru, setSilahDogru] = useState<string>('18');
  const [atisIsabet, setAtisIsabet] = useState<string>('4');

  const temelNum = parseInt(temelDogru, 10) || 0;
  const silahNum = parseInt(silahDogru, 10) || 0;
  const atisNum = parseInt(atisIsabet, 10) || 0;

  const result = calculateOGGScore({
    examType,
    temelDogru: temelNum,
    silahDogru: silahNum,
    atisIsabet: atisNum,
  });

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
          <Text style={styles.headerTitle}>ÖGG Puan Hesaplama</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          EGM 5188 Sayılı Kanun Resmi Değerlendirme Kriterleri
        </Text>

        {/* Silahlı / Silahsız Seçimi */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              examType === 'silahsiz' && styles.segmentBtnActive,
            ]}
            onPress={() => setExamType('silahsiz')}
          >
            <Text
              style={[
                styles.segmentText,
                examType === 'silahsiz' && styles.segmentTextActive,
              ]}
            >
              Silahsız Sınav
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentBtn,
              examType === 'silahli' && styles.segmentBtnActive,
            ]}
            onPress={() => setExamType('silahli')}
          >
            <Text
              style={[
                styles.segmentText,
                examType === 'silahli' && styles.segmentTextActive,
              ]}
            >
              Silahlı Sınav
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* Giriş Alanları */}
        <View style={styles.inputCard}>
          <Text style={styles.inputCardTitle}>Net ve İsabet Bilgileriniz</Text>

          {/* Temel Eğitim */}
          <View style={styles.inputRow}>
            <View style={styles.inputLabelCol}>
              <Text style={styles.inputLabel}>Temel Eğitim Doğru Sayısı</Text>
              <Text style={styles.inputHint}>100 soru üzerinden (Yanlış doğruyu götürmez)</Text>
            </View>
            <View style={styles.inputBoxContainer}>
              <TextInput
                style={styles.inputBox}
                keyboardType="numeric"
                maxLength={3}
                value={temelDogru}
                onChangeText={(text) => {
                  const val = parseInt(text, 10);
                  if (!text || (val >= 0 && val <= 100)) {
                    setTemelDogru(text);
                  }
                }}
              />
              <Text style={styles.inputMaxText}>/100</Text>
            </View>
          </View>

          {examType === 'silahli' && (
            <>
              <View style={styles.divider} />

              {/* Silah Bilgisi Yazılı */}
              <View style={styles.inputRow}>
                <View style={styles.inputLabelCol}>
                  <Text style={styles.inputLabel}>Silah Yazılı Doğru Sayısı</Text>
                  <Text style={styles.inputHint}>25 soru üzerinden (Her doğru 2 puan)</Text>
                </View>
                <View style={styles.inputBoxContainer}>
                  <TextInput
                    style={styles.inputBox}
                    keyboardType="numeric"
                    maxLength={2}
                    value={silahDogru}
                    onChangeText={(text) => {
                      const val = parseInt(text, 10);
                      if (!text || (val >= 0 && val <= 25)) {
                        setSilahDogru(text);
                      }
                    }}
                  />
                  <Text style={styles.inputMaxText}>/25</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Poligon Atışı */}
              <View style={styles.inputRow}>
                <View style={styles.inputLabelCol}>
                  <Text style={styles.inputLabel}>Poligon Atış İsabeti</Text>
                  <Text style={styles.inputHint}>5 fişek atışı (Her isabet 10 puan)</Text>
                </View>
                <View style={styles.inputBoxContainer}>
                  <TextInput
                    style={styles.inputBox}
                    keyboardType="numeric"
                    maxLength={1}
                    value={atisIsabet}
                    onChangeText={(text) => {
                      const val = parseInt(text, 10);
                      if (!text || (val >= 0 && val <= 5)) {
                        setAtisIsabet(text);
                      }
                    }}
                  />
                  <Text style={styles.inputMaxText}>/5</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Sonuç Kartı */}
        <View
          style={[
            styles.resultCard,
            (result.silahliGecti || (examType === 'silahsiz' && result.silahsizGecti))
              ? styles.resultCardPass
              : styles.resultCardFail,
          ]}
        >
          <View style={styles.statusHeader}>
            <Text style={styles.statusIcon}>
              {result.silahliGecti || (examType === 'silahsiz' && result.silahsizGecti)
                ? '✅'
                : '❌'}
            </Text>
            <Text style={styles.statusTitle}>{result.statusMessage}</Text>
          </View>

          {/* Skor Kutuları */}
          <View style={styles.scoresGrid}>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreVal}>{result.temelPuan}</Text>
              <Text style={styles.scoreDesc}>Temel Puan</Text>
            </View>

            {examType === 'silahli' && (
              <>
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreVal}>{result.toplamSilahPuan}</Text>
                  <Text style={styles.scoreDesc}>Silah Puanı</Text>
                </View>

                <View style={styles.scoreItem}>
                  <Text style={[styles.scoreVal, { color: colors.secondary }]}>
                    {result.ortalamaPuan}
                  </Text>
                  <Text style={styles.scoreDesc}>Genel Ortalama</Text>
                </View>
              </>
            )}
          </View>

          {/* Açıklama Maddeleri */}
          <View style={styles.detailsList}>
            {result.details.map((detail, index) => (
              <Text key={index} style={styles.detailItemText}>
                • {detail}
              </Text>
            ))}
          </View>
        </View>

        {/* Resmi Mevzuat Bilgilendirmesi */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📋 Resmi Baraj Kuralları:</Text>
          <Text style={styles.infoParagraph}>
            1. <Text style={{ fontWeight: 'bold' }}>Silahsız Barajı:</Text> Temel Eğitim sınavından en az 60 puan (60 doğru) alınmalıdır.
          </Text>
          <Text style={styles.infoParagraph}>
            2. <Text style={{ fontWeight: 'bold' }}>Silahlı Barajı:</Text> Temel puan ile Silah puanının ortalaması en az 60 olmalı ve Silah puanı (yazılı + atış) en az 50 olmalıdır.
          </Text>
          <Text style={styles.infoParagraph}>
            3. <Text style={{ fontWeight: 'bold' }}>Kazanılmış Hak:</Text> Silahlı ortalamasını tutturamayan aday, temel puanı 60 ve üzerindeyse "Silahsız Güvenlik" sertifikası almaya hak kazanır.
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
  topHeader: {
    backgroundColor: colors.card,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.md,
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
    marginBottom: spacing.sm,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 3,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentBtnActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  scrollArea: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  inputCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  inputCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  inputLabelCol: {
    flex: 1,
    marginRight: spacing.sm,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  inputHint: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  inputBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 80,
    justifyContent: 'center',
  },
  inputBox: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    minWidth: 32,
  },
  inputMaxText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm + 2,
  },
  resultCard: {
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1.5,
  },
  resultCardPass: {
    backgroundColor: '#ECFDF5',
    borderColor: colors.accent,
  },
  resultCardFail: {
    backgroundColor: '#FEF2F2',
    borderColor: colors.danger,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusIcon: {
    fontSize: 22,
    marginRight: spacing.sm,
  },
  statusTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 18,
  },
  scoresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreVal: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  scoreDesc: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    marginTop: 2,
  },
  detailsList: {
    marginTop: 4,
  },
  detailItemText: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 18,
    marginBottom: 2,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  infoParagraph: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
});
