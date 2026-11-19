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
import { StorageService } from '../utils/storage';

type XrayColorType = 'organic' | 'inorganic' | 'mixed' | 'opaque';

interface XrayItem {
  id: string;
  name: string;
  emoji: string;
  colorType: XrayColorType;
  isProhibited: boolean;
  reason: string;
}

const XRAY_COLOR_META: Record<
  XrayColorType,
  { label: string; bg: string; border: string; text: string; dot: string }
> = {
  organic: {
    label: 'TURUNCU • Organik',
    bg: 'rgba(249, 115, 22, 0.22)',
    border: '#F97316',
    text: '#FDBA74',
    dot: '#F97316',
  },
  inorganic: {
    label: 'MAVİ • Metal / İnorganik',
    bg: 'rgba(59, 130, 246, 0.24)',
    border: '#3B82F6',
    text: '#93C5FD',
    dot: '#3B82F6',
  },
  mixed: {
    label: 'YEŞİL • Karışık / Elektronik',
    bg: 'rgba(16, 185, 129, 0.22)',
    border: '#10B981',
    text: '#6EE7B7',
    dot: '#10B981',
  },
  opaque: {
    label: 'SİYAH • Çok Yoğun / Opak',
    bg: 'rgba(148, 163, 184, 0.16)',
    border: '#94A3B8',
    text: '#E2E8F0',
    dot: '#64748B',
  },
};

const SAFE_ITEMS: XrayItem[] = [
  { id: 's1', name: 'Elma / Yiyecek', emoji: '🍎', colorType: 'organic', isProhibited: false, reason: 'Gıda maddesi (organik) güvenlidir.' },
  { id: 's2', name: 'Kitap / Defter', emoji: '📘', colorType: 'organic', isProhibited: false, reason: 'Kâğıt ürünler (organik) güvenlidir.' },
  { id: 's3', name: 'Kıyafet', emoji: '👕', colorType: 'organic', isProhibited: false, reason: 'Tekstil (organik) güvenlidir.' },
  { id: 's4', name: 'Dizüstü Bilgisayar', emoji: '💻', colorType: 'mixed', isProhibited: false, reason: 'Elektronik cihaz (karışık/yeşil) güvenlidir.' },
  { id: 's5', name: 'Cep Telefonu', emoji: '📱', colorType: 'mixed', isProhibited: false, reason: 'Elektronik cihaz (karışık/yeşil) güvenlidir.' },
  { id: 's6', name: 'Kulaklık', emoji: '🎧', colorType: 'mixed', isProhibited: false, reason: 'Kişisel elektronik cihaz güvenlidir.' },
  { id: 's7', name: 'Anahtarlık', emoji: '🔑', colorType: 'inorganic', isProhibited: false, reason: 'Standart anahtarlık güvenlidir.' },
  { id: 's8', name: 'Gözlük', emoji: '👓', colorType: 'mixed', isProhibited: false, reason: 'Cam/plastik gözlük güvenlidir.' },
  { id: 's9', name: 'Şemsiye', emoji: '☂️', colorType: 'mixed', isProhibited: false, reason: 'Katlanır şemsiye güvenlidir.' },
  { id: 's10', name: 'Su Şişesi', emoji: '🧴', colorType: 'organic', isProhibited: false, reason: 'Sıvı/plastik şişe (organik) güvenlidir.' },
];

const PROHIBITED_ITEMS: XrayItem[] = [
  { id: 'p1', name: 'Tabanca', emoji: '🔫', colorType: 'inorganic', isProhibited: true, reason: 'Ateşli silah (Mavi/İnorganik) kesinlikle yasaklıdır!' },
  { id: 'p2', name: 'Sustalı Bıçak', emoji: '🔪', colorType: 'inorganic', isProhibited: true, reason: 'Kesici-delici alet (Mavi/İnorganik) yasaklıdır!' },
  { id: 'p3', name: 'Patlayıcı Düzenek (C4)', emoji: '💣', colorType: 'organic', isProhibited: true, reason: 'Patlayıcı madde X-Ray’de TURUNCU (organik) görünür ve yasaklıdır!' },
  { id: 'p4', name: 'Uyuşturucu Paketi', emoji: '📦', colorType: 'organic', isProhibited: true, reason: 'Şüpheli organik paket (Turuncu) yasaklı madde riski taşır!' },
  { id: 'p5', name: 'Kablolu Şüpheli Cihaz', emoji: '🧨', colorType: 'mixed', isProhibited: true, reason: 'Kablolu el yapımı düzenek (Yeşil/Karışık) tehlikelidir!' },
  { id: 'p6', name: 'Kurşun Zırhlı Kutu', emoji: '⬛', colorType: 'opaque', isProhibited: true, reason: 'X-ışınının geçemediği siyah/opak cisimler mutlaka fiziki kontrole alınmalıdır!' },
  { id: 'p7', name: 'Biber Gazı / Yanıcı Sprey', emoji: '🧯', colorType: 'inorganic', isProhibited: true, reason: 'Basınçlı savunma/yanıcı sprey tesise sokulamaz!' },
  { id: 'p8', name: 'Balta / Kesici Alet', emoji: '🪓', colorType: 'inorganic', isProhibited: true, reason: 'Ağır kesici metal alet (Mavi/İnorganik) yasaklıdır!' },
];

interface BagRound {
  bagNumber: number;
  items: XrayItem[];
  hasProhibited: boolean;
  prohibitedItem?: XrayItem;
}

const generateBag = (bagNumber: number): BagRound => {
  const hasProhibited = Math.random() < 0.55;
  const shuffledSafe = [...SAFE_ITEMS].sort(() => Math.random() - 0.5);
  const items: XrayItem[] = shuffledSafe.slice(0, hasProhibited ? 3 : 4);
  let prohibitedItem: XrayItem | undefined;

  if (hasProhibited) {
    prohibitedItem =
      PROHIBITED_ITEMS[Math.floor(Math.random() * PROHIBITED_ITEMS.length)];
    items.push(prohibitedItem);
    items.sort(() => Math.random() - 0.5);
  }

  return { bagNumber, items, hasProhibited, prohibitedItem };
};

interface XrayGameScreenProps {
  navigation: any;
}

const ROUND_SECONDS = 12;

export const XrayGameScreen: React.FC<XrayGameScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameover'>('ready');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [scannedCount, setScannedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [currentBag, setCurrentBag] = useState<BagRound>(() => generateBag(1));
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    StorageService.getGameProgress().then((gp) => setBestScore(gp.xrayBestScore));
  }, []);

  const finishGame = useCallback(
    async (finalScore: number) => {
      setGameState('gameover');
      if (finalScore > bestScore) {
        setBestScore(finalScore);
        await StorageService.updateGameProgress({ xrayBestScore: finalScore });
      }
    },
    [bestScore]
  );

  const startGame = () => {
    setScore(0);
    setLives(3);
    setCombo(0);
    setScannedCount(0);
    setCorrectCount(0);
    setTimeLeft(ROUND_SECONDS);
    setFeedback(null);
    setCurrentBag(generateBag(1));
    setGameState('playing');
  };

  const nextBag = useCallback((nextNum: number) => {
    setFeedback(null);
    setTimeLeft(ROUND_SECONDS);
    setCurrentBag(generateBag(nextNum));
  }, []);

  const handleDecision = useCallback(
    (stoppedBag: boolean) => {
      if (gameState !== 'playing' || feedback) return;

      const isCorrect = stoppedBag === currentBag.hasProhibited;
      const newScanned = scannedCount + 1;
      setScannedCount(newScanned);

      if (isCorrect) {
        const newCombo = combo + 1;
        const gained = 100 + timeLeft * 5 + (newCombo >= 3 ? 30 : 0);
        const newScore = score + gained;
        setScore(newScore);
        setCombo(newCombo);
        setCorrectCount((c) => c + 1);
        setFeedback({
          correct: true,
          message: currentBag.hasProhibited
            ? `Harika! (+${gained} puan) ${currentBag.prohibitedItem?.reason}`
            : `Doğru! (+${gained} puan) Bagaj temiz, güvenle geçti.`,
        });
        setTimeout(() => {
          nextBag(currentBag.bagNumber + 1);
        }, 1250);
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        setCombo(0);
        setFeedback({
          correct: false,
          message: currentBag.hasProhibited
            ? `Kaçırdın! ${currentBag.prohibitedItem?.name}: ${currentBag.prohibitedItem?.reason}`
            : 'Yanlış alarm! Bu bagajda yasaklı bir eşya yoktu.',
        });
        setTimeout(() => {
          if (newLives <= 0) {
            finishGame(score);
          } else {
            nextBag(currentBag.bagNumber + 1);
          }
        }, 1500);
      }
    },
    [
      gameState,
      feedback,
      currentBag,
      scannedCount,
      combo,
      timeLeft,
      score,
      lives,
      nextBag,
      finishGame,
    ]
  );

  useEffect(() => {
    if (gameState !== 'playing' || feedback) return;
    if (timeLeft <= 0) {
      const newLives = lives - 1;
      setLives(newLives);
      setCombo(0);
      setScannedCount((s) => s + 1);
      setFeedback({
        correct: false,
        message: 'Süre doldu! Bagaj kontrol edilmeden banttan geçti.',
      });
      const t = setTimeout(() => {
        if (newLives <= 0) {
          finishGame(score);
        } else {
          nextBag(currentBag.bagNumber + 1);
        }
      }, 1300);
      return () => clearTimeout(t);
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [gameState, feedback, timeLeft, lives, score, currentBag.bagNumber, finishGame, nextBag]);

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
        <Text style={styles.headerTitle}>📡 X-Ray Kontrol Oyunu</Text>
        <View style={styles.bestBadge}>
          <Text style={styles.bestBadgeText}>🏆 {bestScore}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Renk Kodu Rehberi */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>EGM X-Ray Renk Kodları</Text>
          <View style={styles.legendRow}>
            {(['organic', 'inorganic', 'mixed', 'opaque'] as XrayColorType[]).map(
              (type) => (
                <View key={type} style={styles.legendPill}>
                  <View
                    style={[
                      styles.legendDot,
                      { backgroundColor: XRAY_COLOR_META[type].dot },
                    ]}
                  />
                  <Text style={styles.legendPillText}>
                    {type === 'organic'
                      ? 'Turuncu: Organik'
                      : type === 'inorganic'
                        ? 'Mavi: Metal'
                        : type === 'mixed'
                          ? 'Yeşil: Karışık'
                          : 'Siyah: Opak'}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        {gameState === 'ready' && (
          <View style={styles.introCard}>
            <Text style={styles.introEmoji}>🛂</Text>
            <Text style={styles.introTitle}>X-Ray Operatörlüğüne Hazır mısın?</Text>
            <Text style={styles.introDesc}>
              Konveyör bandından geçen bagajları 12 saniye içinde incele. Yasaklı
              veya tehlikeli madde (silah, bıçak, patlayıcı, opak kutu) görürsen
              <Text style={{ fontWeight: '800' }}> DURDUR</Text>, bagaj temizse
              <Text style={{ fontWeight: '800' }}> GEÇSİN</Text> butonuna bas!
            </Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={startGame}
              activeOpacity={0.85}
            >
              <Text style={styles.startButtonText}>▶ Taramaya Başla</Text>
            </TouchableOpacity>
          </View>
        )}

        {gameState === 'playing' && (
          <>
            {/* HUD */}
            <View style={styles.hudRow}>
              <View style={styles.hudBox}>
                <Text style={styles.hudLabel}>PUAN</Text>
                <Text style={styles.hudValue}>{score}</Text>
              </View>
              <View style={styles.hudBox}>
                <Text style={styles.hudLabel}>SERİ</Text>
                <Text style={[styles.hudValue, { color: colors.secondary }]}>
                  {combo > 0 ? `🔥 x${combo}` : '—'}
                </Text>
              </View>
              <View style={styles.hudBox}>
                <Text style={styles.hudLabel}>CAN</Text>
                <Text style={styles.hudValue}>
                  {'❤️'.repeat(lives)}
                  {'🖤'.repeat(Math.max(0, 3 - lives))}
                </Text>
              </View>
            </View>

            {/* Süre Barı */}
            <View style={styles.timerRow}>
              <Text style={styles.timerText}>
                Bagaj #{currentBag.bagNumber} • ⏱ {timeLeft} sn
              </Text>
              <View style={styles.timerTrack}>
                <View
                  style={[
                    styles.timerFill,
                    {
                      width: `${Math.round((timeLeft / ROUND_SECONDS) * 100)}%`,
                      backgroundColor:
                        timeLeft <= 4 ? colors.danger : colors.primaryLight,
                    },
                  ]}
                />
              </View>
            </View>

            {/* X-Ray Monitörü */}
            <View style={styles.monitorFrame}>
              <View style={styles.monitorTopBar}>
                <Text style={styles.monitorCode}>X-RAY SCAN • DUAL-ENERGY</Text>
                <Text style={styles.monitorStatus}>● CANLI TARAMA</Text>
              </View>

              <View style={styles.bagSilhouette}>
                <View style={styles.bagHandle} />
                <View style={styles.itemsGrid}>
                  {currentBag.items.map((item) => {
                    const meta = XRAY_COLOR_META[item.colorType];
                    return (
                      <View
                        key={item.id}
                        style={[
                          styles.xrayItemChip,
                          {
                            backgroundColor: meta.bg,
                            borderColor: meta.border,
                          },
                        ]}
                      >
                        <Text style={styles.xrayItemEmoji}>{item.emoji}</Text>
                        <Text style={[styles.xrayItemName, { color: meta.text }]}>
                          {item.name}
                        </Text>
                        <Text style={[styles.xrayItemType, { color: meta.border }]}>
                          {meta.label}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* Geri Bildirim */}
            {feedback && (
              <View
                style={[
                  styles.feedbackBox,
                  feedback.correct ? styles.feedbackSuccess : styles.feedbackError,
                ]}
              >
                <Text style={styles.feedbackText}>
                  {feedback.correct ? '✅ ' : '❌ '}
                  {feedback.message}
                </Text>
              </View>
            )}

            {/* Karar Butonları */}
            <View style={styles.decisionRow}>
              <TouchableOpacity
                style={[styles.decisionBtn, styles.allowBtn]}
                onPress={() => handleDecision(false)}
                disabled={Boolean(feedback)}
                activeOpacity={0.85}
              >
                <Text style={styles.decisionEmoji}>✅</Text>
                <Text style={styles.decisionBtnTitle}>GEÇSİN</Text>
                <Text style={styles.decisionBtnSub}>Temiz Bagaj</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.decisionBtn, styles.stopBtn]}
                onPress={() => handleDecision(true)}
                disabled={Boolean(feedback)}
                activeOpacity={0.85}
              >
                <Text style={styles.decisionEmoji}>🚨</Text>
                <Text style={styles.decisionBtnTitle}>DURDUR!</Text>
                <Text style={styles.decisionBtnSub}>Yasaklı / Şüpheli</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {gameState === 'gameover' && (
          <View style={styles.introCard}>
            <Text style={styles.introEmoji}>🏁</Text>
            <Text style={styles.introTitle}>Vardiya Tamamlandı!</Text>
            <Text style={styles.finalScoreText}>{score} Puan</Text>
            <Text style={styles.introDesc}>
              Taranan Bagaj: {scannedCount} • Doğru Karar: {correctCount} (
              {scannedCount > 0
                ? `%${Math.round((correctCount / scannedCount) * 100)}`
                : '%0'}
              ){'\n'}En Yüksek Skor: 🏆 {bestScore}
            </Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={startGame}
              activeOpacity={0.85}
            >
              <Text style={styles.startButtonText}>🔄 Tekrar Oyna</Text>
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
      fontSize: 16,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    bestBadge: {
      backgroundColor: colors.secondaryLight,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },
    bestBadgeText: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.gold,
    },
    scrollContent: {
      padding: spacing.md,
      paddingBottom: spacing.xl,
      gap: spacing.md,
    },
    legendCard: {
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: spacing.sm + 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    legendTitle: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.textSecondary,
      marginBottom: 6,
    },
    legendRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    legendPill: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceMuted,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      gap: 5,
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    legendPillText: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    introCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      gap: spacing.sm,
    },
    introEmoji: {
      fontSize: 48,
    },
    introTitle: {
      fontSize: 19,
      fontWeight: '800',
      color: colors.textPrimary,
      textAlign: 'center',
    },
    finalScoreText: {
      fontSize: 32,
      fontWeight: '900',
      color: colors.primary,
    },
    introDesc: {
      fontSize: 13.5,
      lineHeight: 21,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
    startButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.xl,
      paddingVertical: 14,
      borderRadius: 14,
      width: '100%',
      alignItems: 'center',
    },
    startButtonText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '800',
    },
    hudRow: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    hudBox: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.sm + 2,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    hudLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    hudValue: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.textPrimary,
      marginTop: 2,
    },
    timerRow: {
      gap: 6,
    },
    timerText: {
      fontSize: 12.5,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    timerTrack: {
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.surfaceMuted,
      overflow: 'hidden',
    },
    timerFill: {
      height: '100%',
      borderRadius: 4,
    },
    monitorFrame: {
      backgroundColor: '#090F1D',
      borderRadius: 18,
      padding: spacing.md,
      borderWidth: 2,
      borderColor: '#1E3A8A',
    },
    monitorTopBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    monitorCode: {
      color: '#60A5FA',
      fontSize: 10.5,
      fontWeight: '800',
      letterSpacing: 1,
    },
    monitorStatus: {
      color: '#34D399',
      fontSize: 10.5,
      fontWeight: '800',
    },
    bagSilhouette: {
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderColor: '#334155',
      borderRadius: 14,
      padding: spacing.sm + 4,
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      alignItems: 'center',
    },
    bagHandle: {
      width: 56,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#334155',
      marginBottom: spacing.sm + 2,
    },
    itemsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: spacing.sm,
      width: '100%',
    },
    xrayItemChip: {
      width: '48.5%',
      borderRadius: 12,
      padding: spacing.sm + 2,
      borderWidth: 1.5,
      alignItems: 'center',
      gap: 3,
    },
    xrayItemEmoji: {
      fontSize: 28,
    },
    xrayItemName: {
      fontSize: 12.5,
      fontWeight: '800',
      textAlign: 'center',
    },
    xrayItemType: {
      fontSize: 9.5,
      fontWeight: '700',
      textAlign: 'center',
    },
    feedbackBox: {
      borderRadius: 12,
      padding: spacing.sm + 4,
      borderWidth: 1,
    },
    feedbackSuccess: {
      backgroundColor: colors.successSurface,
      borderColor: colors.accent,
    },
    feedbackError: {
      backgroundColor: colors.dangerSurface,
      borderColor: colors.danger,
    },
    feedbackText: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.textPrimary,
      lineHeight: 19,
    },
    decisionRow: {
      flexDirection: 'row',
      gap: spacing.sm + 4,
    },
    decisionBtn: {
      flex: 1,
      borderRadius: 16,
      paddingVertical: spacing.md,
      alignItems: 'center',
      gap: 2,
    },
    allowBtn: {
      backgroundColor: '#059669',
    },
    stopBtn: {
      backgroundColor: '#DC2626',
    },
    decisionEmoji: {
      fontSize: 24,
    },
    decisionBtnTitle: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '900',
    },
    decisionBtnSub: {
      color: 'rgba(255,255,255,0.85)',
      fontSize: 11.5,
      fontWeight: '600',
    },
  });
