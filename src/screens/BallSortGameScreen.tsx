import React, { useState, useEffect, useMemo } from 'react';
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

const TUBE_CAPACITY = 4;

const BALL_PALETTE = [
  { id: 'red', color: '#EF4444', shine: '#FCA5A5' },
  { id: 'blue', color: '#3B82F6', shine: '#93C5FD' },
  { id: 'green', color: '#10B981', shine: '#6EE7B7' },
  { id: 'amber', color: '#F59E0B', shine: '#FDE68A' },
  { id: 'purple', color: '#8B5CF6', shine: '#C4B5FD' },
  { id: 'pink', color: '#EC4899', shine: '#F9A8D4' },
  { id: 'cyan', color: '#06B6D4', shine: '#67E8F9' },
];

type Tube = number[]; // indices into BALL_PALETTE, bottom -> top

const isTubeSolved = (tube: Tube): boolean =>
  tube.length === TUBE_CAPACITY && tube.every((b) => b === tube[0]);

const isBoardSolved = (tubes: Tube[]): boolean =>
  tubes.every((t) => t.length === 0 || isTubeSolved(t));

const getColorCountForLevel = (level: number): number => {
  if (level <= 1) return 3;
  if (level === 2) return 4;
  if (level <= 4) return 5;
  if (level <= 7) return 6;
  return 7;
};

const generateLevel = (level: number): Tube[] => {
  const colorCount = getColorCountForLevel(level);
  const pool: number[] = [];
  for (let c = 0; c < colorCount; c++) {
    for (let k = 0; k < TUBE_CAPACITY; k++) {
      pool.push(c);
    }
  }

  // Shuffle until no tube starts already solved
  let tubes: Tube[] = [];
  for (let attempt = 0; attempt < 25; attempt++) {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    tubes = [];
    for (let i = 0; i < colorCount; i++) {
      tubes.push(shuffled.slice(i * TUBE_CAPACITY, (i + 1) * TUBE_CAPACITY));
    }
    if (!tubes.some((t) => isTubeSolved(t))) {
      break;
    }
  }

  // Add 2 empty tubes (guarantees solvability)
  tubes.push([], []);
  return tubes;
};

const cloneTubes = (tubes: Tube[]): Tube[] => tubes.map((t) => [...t]);

interface BallSortGameScreenProps {
  navigation: any;
}

export const BallSortGameScreen: React.FC<BallSortGameScreenProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [level, setLevel] = useState(1);
  const [initialTubes, setInitialTubes] = useState<Tube[]>(() => generateLevel(1));
  const [tubes, setTubes] = useState<Tube[]>(() => cloneTubes(initialTubes));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<Tube[][]>([]);
  const [moves, setMoves] = useState(0);
  const [extraTubeUsed, setExtraTubeUsed] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    StorageService.getGameProgress().then((gp) => {
      const savedLevel = Math.max(1, gp.ballSortLevel);
      setLevel(savedLevel);
      const fresh = generateLevel(savedLevel);
      setInitialTubes(fresh);
      setTubes(cloneTubes(fresh));
    });
  }, []);

  const loadLevel = (targetLevel: number) => {
    const fresh = generateLevel(targetLevel);
    setLevel(targetLevel);
    setInitialTubes(fresh);
    setTubes(cloneTubes(fresh));
    setSelectedIndex(null);
    setHistory([]);
    setMoves(0);
    setExtraTubeUsed(false);
    setWon(false);
  };

  const handleRestart = () => {
    setTubes(cloneTubes(initialTubes));
    setSelectedIndex(null);
    setHistory([]);
    setMoves(0);
    setExtraTubeUsed(false);
    setWon(false);
  };

  const handleUndo = () => {
    if (history.length === 0 || won) return;
    const prev = history[history.length - 1];
    setTubes(prev);
    setHistory((h) => h.slice(0, -1));
    setSelectedIndex(null);
    setMoves((m) => Math.max(0, m - 1));
  };

  const handleAddExtraTube = () => {
    if (extraTubeUsed || won) return;
    setHistory((h) => [...h, cloneTubes(tubes)]);
    setTubes((prev) => [...prev, []]);
    setExtraTubeUsed(true);
    setSelectedIndex(null);
  };

  const handleTubePress = async (idx: number) => {
    if (won) return;

    // Select source tube
    if (selectedIndex === null) {
      if (tubes[idx].length === 0) return;
      setSelectedIndex(idx);
      return;
    }

    // Deselect if same tube tapped
    if (selectedIndex === idx) {
      setSelectedIndex(null);
      return;
    }

    const fromTube = tubes[selectedIndex];
    const toTube = tubes[idx];
    const movingBall = fromTube[fromTube.length - 1];

    const canDrop =
      toTube.length < TUBE_CAPACITY &&
      (toTube.length === 0 || toTube[toTube.length - 1] === movingBall);

    if (canDrop) {
      const snapshot = cloneTubes(tubes);
      const next = cloneTubes(tubes);
      const ball = next[selectedIndex].pop()!;
      next[idx].push(ball);

      setHistory((h) => [...h, snapshot]);
      setTubes(next);
      setMoves((m) => m + 1);
      setSelectedIndex(null);

      if (isBoardSolved(next)) {
        setWon(true);
        const nextLevel = level + 1;
        await StorageService.updateGameProgress({ ballSortLevel: nextLevel });
      }
    } else {
      // Switch selection smoothly if tapped another non-empty tube
      if (toTube.length > 0) {
        setSelectedIndex(idx);
      } else {
        setSelectedIndex(null);
      }
    }
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
        <Text style={styles.headerTitle}>🎨 Mola Oyunu • Renkli Toplar</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>Seviye {level}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bilgi ve Hamle Çubuğu */}
        <View style={styles.infoBar}>
          <Text style={styles.infoText}>
            Aynı renkteki topları aynı tüpte üst üste dizerek kafanı dinle!
          </Text>
          <View style={styles.movesPill}>
            <Text style={styles.movesText}>Hamle: {moves}</Text>
          </View>
        </View>

        {/* Kontrol Butonları */}
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[
              styles.controlBtn,
              history.length === 0 && styles.controlBtnDisabled,
            ]}
            onPress={handleUndo}
            disabled={history.length === 0 || won}
          >
            <Text style={styles.controlBtnText}>↩️ Geri Al</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn} onPress={handleRestart}>
            <Text style={styles.controlBtnText}>🔄 Yeniden</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.controlBtn,
              extraTubeUsed && styles.controlBtnDisabled,
            ]}
            onPress={handleAddExtraTube}
            disabled={extraTubeUsed || won}
          >
            <Text style={styles.controlBtnText}>
              {extraTubeUsed ? '✓ Ek Tüp' : '+1 Boş Tüp'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tüpler Alanı */}
        <View style={styles.boardCard}>
          <View style={styles.tubesGrid}>
            {tubes.map((tube, idx) => {
              const isSelected = selectedIndex === idx;
              const solved = isTubeSolved(tube);
              const liftedBall =
                isSelected && tube.length > 0 ? tube[tube.length - 1] : null;
              const bodyBalls =
                isSelected && tube.length > 0 ? tube.slice(0, -1) : tube;

              return (
                <TouchableOpacity
                  key={`tube-${idx}`}
                  style={styles.tubeSlot}
                  onPress={() => handleTubePress(idx)}
                  activeOpacity={0.85}
                >
                  {/* Yukarı Kaldırılmış Top Alanı */}
                  <View style={styles.liftedArea}>
                    {liftedBall !== null && (
                      <View
                        style={[
                          styles.ball,
                          styles.liftedBall,
                          { backgroundColor: BALL_PALETTE[liftedBall].color },
                        ]}
                      >
                        <View
                          style={[
                            styles.ballShine,
                            { backgroundColor: BALL_PALETTE[liftedBall].shine },
                          ]}
                        />
                      </View>
                    )}
                    {solved && <Text style={styles.solvedStar}>✨</Text>}
                  </View>

                  {/* Cam Tüp */}
                  <View
                    style={[
                      styles.tubeBody,
                      isSelected && styles.tubeSelected,
                      solved && styles.tubeSolved,
                    ]}
                  >
                    {/* Alt sıradan üst sıraya doğru dikey yığın */}
                    <View style={styles.ballsStack}>
                      {bodyBalls.map((colorIdx, bIdx) => (
                        <View
                          key={`${idx}-${bIdx}`}
                          style={[
                            styles.ball,
                            { backgroundColor: BALL_PALETTE[colorIdx].color },
                          ]}
                        >
                          <View
                            style={[
                              styles.ballShine,
                              { backgroundColor: BALL_PALETTE[colorIdx].shine },
                            ]}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Seviye Tamamlandı Kartı */}
        {won && (
          <View style={styles.winCard}>
            <Text style={styles.winEmoji}>🎉</Text>
            <Text style={styles.winTitle}>Seviye {level} Tamamlandı!</Text>
            <Text style={styles.winSub}>
              {moves} hamlede tüm renkleri başarıyla dizdin.
            </Text>
            <TouchableOpacity
              style={styles.nextLevelBtn}
              onPress={() => loadLevel(level + 1)}
              activeOpacity={0.85}
            >
              <Text style={styles.nextLevelBtnText}>
                Sonraki Seviye (Seviye {level + 1}) →
              </Text>
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
      fontSize: 15,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    levelBadge: {
      backgroundColor: colors.surfaceHighlight,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },
    levelBadgeText: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.primary,
    },
    scrollContent: {
      padding: spacing.md,
      paddingBottom: spacing.xl,
      gap: spacing.md,
    },
    infoBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: spacing.sm + 4,
      borderWidth: 1,
      borderColor: colors.border,
      gap: spacing.sm,
    },
    infoText: {
      flex: 1,
      fontSize: 12.5,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    movesPill: {
      backgroundColor: colors.surfaceMuted,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 10,
    },
    movesText: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    controlsRow: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    controlBtn: {
      flex: 1,
      backgroundColor: colors.card,
      paddingVertical: 10,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    controlBtnDisabled: {
      opacity: 0.45,
    },
    controlBtnText: {
      fontSize: 12.5,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    boardCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tubesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      columnGap: 16,
      rowGap: 20,
    },
    tubeSlot: {
      alignItems: 'center',
      width: 62,
    },
    liftedArea: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 4,
    },
    solvedStar: {
      fontSize: 18,
    },
    tubeBody: {
      width: 54,
      height: 164,
      borderWidth: 2.5,
      borderTopWidth: 1,
      borderColor: colors.border,
      borderBottomLeftRadius: 26,
      borderBottomRightRadius: 26,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      backgroundColor: colors.surfaceSubtle,
      paddingVertical: 6,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    tubeSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.surfaceHighlight,
    },
    tubeSolved: {
      borderColor: colors.accent,
      backgroundColor: colors.successSurface,
    },
    ballsStack: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
      gap: 4,
    },
    ball: {
      width: 34,
      height: 34,
      borderRadius: 17,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingTop: 6,
      paddingLeft: 7,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 2,
    },
    liftedBall: {
      transform: [{ scale: 1.08 }],
    },
    ballShine: {
      width: 9,
      height: 9,
      borderRadius: 5,
      opacity: 0.75,
    },
    winCard: {
      backgroundColor: colors.successSurface,
      borderRadius: 18,
      padding: spacing.lg,
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: colors.accent,
      gap: spacing.xs + 2,
    },
    winEmoji: {
      fontSize: 42,
    },
    winTitle: {
      fontSize: 20,
      fontWeight: '900',
      color: colors.textPrimary,
    },
    winSub: {
      fontSize: 13.5,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
    nextLevelBtn: {
      backgroundColor: colors.accent,
      paddingVertical: 13,
      paddingHorizontal: spacing.lg,
      borderRadius: 12,
      width: '100%',
      alignItems: 'center',
    },
    nextLevelBtnText: {
      color: '#FFFFFF',
      fontSize: 14.5,
      fontWeight: '800',
    },
  });
