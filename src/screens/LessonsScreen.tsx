import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing, ThemeColors } from '../theme/colors';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { LESSON_BOOKS, TOTAL_LESSON_CHAPTERS } from '../data/lessons';
import { StorageService } from '../utils/storage';

interface LessonsScreenProps {
  navigation: any;
}

export const LessonsScreen: React.FC<LessonsScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { preferences } = useUser();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadProgress = async () => {
      const ids = await StorageService.getCompletedChapterIds();
      setCompletedIds(ids);
    };
    const unsubscribe = navigation.addListener('focus', loadProgress);
    loadProgress();
    return unsubscribe;
  }, [navigation]);

  const completedSet = useMemo(() => new Set(completedIds), [completedIds]);

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return LESSON_BOOKS;
    return LESSON_BOOKS.filter((book) => {
      if (
        book.title.toLowerCase().includes(q) ||
        book.subtitle.toLowerCase().includes(q)
      ) {
        return true;
      }
      return book.chapters.some(
        (ch) =>
          ch.title.toLowerCase().includes(q) ||
          ch.summary.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const totalCompleted = completedIds.length;
  const overallRatio =
    TOTAL_LESSON_CHAPTERS > 0
      ? Math.min(1, totalCompleted / TOTAL_LESSON_CHAPTERS)
      : 0;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {/* Header */}
      <View style={[styles.topHeader, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backButtonText}>← Geri</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>Dersler • Konu Kitabı</Text>
            <Text style={styles.headerSubtitle}>
              {LESSON_BOOKS.length} Ders • {TOTAL_LESSON_CHAPTERS} Bölüm
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        {/* Genel Okuma İlerlemesi */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>📖 Okuma İlerlemen</Text>
              <Text style={styles.progressSub}>
                {totalCompleted} / {TOTAL_LESSON_CHAPTERS} bölüm tamamlandı
              </Text>
            </View>
            <View style={styles.progressPercentBadge}>
              <Text style={styles.progressPercentText}>
                %{Math.round(overallRatio * 100)}
              </Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.round(overallRatio * 100)}%` },
              ]}
            />
          </View>
        </View>

        {/* Arama Kutusu */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Ders veya konu ara (ör. 5188, X-Ray, turnike)..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Ders Kitapları Listesi */}
        {filteredBooks.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>📚</Text>
            <Text style={styles.emptyText}>
              "{searchQuery}" ile eşleşen bir ders veya bölüm bulunamadı.
            </Text>
          </View>
        ) : (
          filteredBooks.map((book) => {
            const readCount = book.chapters.filter((ch) =>
              completedSet.has(ch.id)
            ).length;
            const totalChapters = book.chapters.length;
            const ratio = totalChapters > 0 ? readCount / totalChapters : 0;
            const totalMinutes = book.chapters.reduce(
              (sum, ch) => sum + ch.estimatedMinutes,
              0
            );
            const isFinished = readCount === totalChapters && totalChapters > 0;

            return (
              <TouchableOpacity
                key={book.id}
                style={[styles.bookCard, { borderLeftColor: book.color }]}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate('LessonReader', { lessonId: book.id })
                }
              >
                <View style={styles.bookTopRow}>
                  <View
                    style={[
                      styles.bookIconWrap,
                      { backgroundColor: `${book.color}18` },
                    ]}
                  >
                    <Text style={styles.bookEmoji}>{book.emoji}</Text>
                  </View>

                  <View style={styles.bookMainInfo}>
                    <View style={styles.bookTitleRow}>
                      <Text style={styles.bookTitle} numberOfLines={2}>
                        {book.title}
                      </Text>
                    </View>
                    <Text style={styles.bookSubtitle} numberOfLines={2}>
                      {book.subtitle}
                    </Text>

                    <View style={styles.metaRow}>
                      <View
                        style={[
                          styles.metaPill,
                          { backgroundColor: `${book.color}18` },
                        ]}
                      >
                        <Text
                          style={[styles.metaPillText, { color: book.color }]}
                        >
                          {book.examQuestionCount} Soru
                        </Text>
                      </View>
                      <View style={styles.metaPillMuted}>
                        <Text style={styles.metaPillMutedText}>
                          {totalChapters} Bölüm • ~{totalMinutes} dk
                        </Text>
                      </View>
                      {book.isWeaponOnly && (
                        <View style={styles.weaponBadge}>
                          <Text style={styles.weaponBadgeText}>
                            {preferences.examType === 'silahsiz'
                              ? 'Silahlı Aday'
                              : 'Silahlı'}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                {/* Bölüm İlerleme Çubuğu */}
                <View style={styles.bookFooter}>
                  <View style={styles.miniProgressTrack}>
                    <View
                      style={[
                        styles.miniProgressFill,
                        {
                          width: `${Math.round(ratio * 100)}%`,
                          backgroundColor: isFinished
                            ? colors.accent
                            : book.color,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.readStatusText,
                      isFinished && { color: colors.accent },
                    ]}
                  >
                    {isFinished
                      ? 'Tamamlandı ✓'
                      : `${readCount}/${totalChapters} bölüm • Oku →`}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
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
      backgroundColor: colors.card,
      paddingBottom: spacing.md,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
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
    headerTitleWrap: {
      flex: 1,
    },
    headerTitle: {
      fontSize: 19,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    headerSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 1,
    },
    scrollArea: {
      padding: spacing.md,
      paddingBottom: spacing.xl,
      gap: spacing.md,
    },
    progressCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    progressTitle: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    progressSub: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    progressPercentBadge: {
      backgroundColor: colors.surfaceHighlight,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
    },
    progressPercentText: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.primary,
    },
    progressTrack: {
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.surfaceMuted,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 4,
      backgroundColor: colors.accent,
    },
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: spacing.md,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.border,
      gap: spacing.sm,
    },
    searchIcon: {
      fontSize: 15,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      color: colors.textPrimary,
      padding: 0,
    },
    clearBtn: {
      fontSize: 14,
      color: colors.textMuted,
      fontWeight: '700',
      paddingHorizontal: 4,
    },
    bookCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      borderLeftWidth: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 5,
      elevation: 1,
    },
    bookTopRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.sm + 4,
    },
    bookIconWrap: {
      width: 48,
      height: 56,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookEmoji: {
      fontSize: 24,
    },
    bookMainInfo: {
      flex: 1,
    },
    bookTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bookTitle: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.textPrimary,
      lineHeight: 20,
    },
    bookSubtitle: {
      fontSize: 12.5,
      color: colors.textSecondary,
      marginTop: 3,
      lineHeight: 17,
    },
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: spacing.sm,
    },
    metaPill: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
    metaPillText: {
      fontSize: 11,
      fontWeight: '700',
    },
    metaPillMuted: {
      backgroundColor: colors.surfaceMuted,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
    metaPillMutedText: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    weaponBadge: {
      backgroundColor: colors.secondaryLight,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
    weaponBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.gold,
    },
    bookFooter: {
      marginTop: spacing.md,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    miniProgressTrack: {
      flex: 1,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.surfaceMuted,
      overflow: 'hidden',
    },
    miniProgressFill: {
      height: '100%',
      borderRadius: 3,
    },
    readStatusText: {
      fontSize: 11.5,
      fontWeight: '700',
      color: colors.primary,
    },
    emptyBox: {
      alignItems: 'center',
      paddingVertical: spacing.xl,
      gap: spacing.sm,
    },
    emptyEmoji: {
      fontSize: 36,
    },
    emptyText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });
