import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing, ThemeColors } from '../theme/colors';
import { useTheme } from '../context/ThemeContext';
import { getLessonBookById, LESSON_BOOKS } from '../data/lessons';
import { StorageService } from '../utils/storage';

interface LessonReaderScreenProps {
  route: any;
  navigation: any;
}

export const LessonReaderScreen: React.FC<LessonReaderScreenProps> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const scrollRef = useRef<ScrollView>(null);

  const lessonId = route.params?.lessonId ?? LESSON_BOOKS[0].id;
  const book = getLessonBookById(lessonId) ?? LESSON_BOOKS[0];

  const [chapterIndex, setChapterIndex] = useState(
    route.params?.initialChapterIndex ?? 0
  );
  const [fontScale, setFontScale] = useState(1); // 0.9 | 1 | 1.15 | 1.3
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [tocVisible, setTocVisible] = useState(false);

  useEffect(() => {
    const loadCompleted = async () => {
      const ids = await StorageService.getCompletedChapterIds();
      setCompletedIds(ids);
    };
    loadCompleted();
  }, []);

  const currentChapter = book.chapters[chapterIndex] ?? book.chapters[0];
  const isCurrentCompleted = completedIds.includes(currentChapter.id);
  const isFirstChapter = chapterIndex === 0;
  const isLastChapter = chapterIndex === book.chapters.length - 1;

  const goToChapter = (index: number) => {
    if (index < 0 || index >= book.chapters.length) return;
    setChapterIndex(index);
    setTocVisible(false);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleToggleComplete = async () => {
    const nowCompleted = await StorageService.toggleCompletedChapter(
      currentChapter.id
    );
    setCompletedIds((prev) =>
      nowCompleted
        ? Array.from(new Set([...prev, currentChapter.id]))
        : prev.filter((id) => id !== currentChapter.id)
    );
  };

  const handleNextOrFinish = async () => {
    if (!isCurrentCompleted) {
      await handleToggleComplete();
    }
    if (!isLastChapter) {
      goToChapter(chapterIndex + 1);
    } else {
      navigation.goBack();
    }
  };

  const decreaseFont = () =>
    setFontScale((prev) => Math.max(0.85, Number((prev - 0.15).toFixed(2))));
  const increaseFont = () =>
    setFontScale((prev) => Math.min(1.3, Number((prev + 0.15).toFixed(2))));

  const bodyFontSize = Math.round(15 * fontScale);
  const bodyLineHeight = Math.round(24 * fontScale);
  const headingFontSize = Math.round(17 * fontScale);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {/* Üst Okuyucu Çubuğu */}
      <View style={[styles.topHeader, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.backButtonText}>← Dersler</Text>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.toolButton}
              onPress={decreaseFont}
              activeOpacity={0.75}
            >
              <Text style={styles.toolButtonText}>A−</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.toolButton}
              onPress={increaseFont}
              activeOpacity={0.75}
            >
              <Text style={styles.toolButtonText}>A+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toolButton, styles.tocButton]}
              onPress={() => setTocVisible(true)}
              activeOpacity={0.75}
            >
              <Text style={[styles.toolButtonText, { color: colors.primary }]}>
                📑 İçindekiler
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bookBannerRow}>
          <Text style={styles.bookBannerEmoji}>{book.emoji}</Text>
          <View style={styles.bookBannerTextWrap}>
            <Text style={styles.bookBannerTitle} numberOfLines={1}>
              {book.title}
            </Text>
            <Text style={styles.bookBannerMeta}>
              Bölüm {currentChapter.chapterNumber} / {book.chapters.length} • ~
              {currentChapter.estimatedMinutes} dk okuma
            </Text>
          </View>
        </View>

        {/* Bölüm Seçici Şerit */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chapterTabsRow}
        >
          {book.chapters.map((ch, idx) => {
            const active = idx === chapterIndex;
            const done = completedIds.includes(ch.id);
            return (
              <TouchableOpacity
                key={ch.id}
                style={[
                  styles.chapterTab,
                  active && {
                    backgroundColor: book.color,
                    borderColor: book.color,
                  },
                ]}
                onPress={() => goToChapter(idx)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.chapterTabText,
                    active && styles.chapterTabTextActive,
                  ]}
                >
                  {done ? '✓ ' : ''}Bölüm {ch.chapterNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Konu Kitabı Sayfa İçeriği */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.pageScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.chapterCover, { borderTopColor: book.color }]}>
          <View
            style={[
              styles.chapterTag,
              { backgroundColor: `${book.color}1A` },
            ]}
          >
            <Text style={[styles.chapterTagText, { color: book.color }]}>
              BÖLÜM {currentChapter.chapterNumber}
            </Text>
          </View>
          <Text style={styles.chapterTitle}>{currentChapter.title}</Text>
          <Text style={styles.chapterSummary}>{currentChapter.summary}</Text>
        </View>

        {currentChapter.sections.map((section, sIdx) => (
          <View key={`${currentChapter.id}-sec-${sIdx}`} style={styles.sectionCard}>
            <View style={styles.sectionHeadingRow}>
              <View
                style={[styles.sectionAccentBar, { backgroundColor: book.color }]}
              />
              <Text
                style={[styles.sectionHeading, { fontSize: headingFontSize }]}
              >
                {section.heading}
              </Text>
            </View>

            {section.paragraphs.map((para, pIdx) => (
              <Text
                key={pIdx}
                style={[
                  styles.paragraphText,
                  { fontSize: bodyFontSize, lineHeight: bodyLineHeight },
                ]}
              >
                {para}
              </Text>
            ))}

            {section.bullets && section.bullets.length > 0 && (
              <View style={styles.bulletList}>
                {section.bullets.map((item, bIdx) => (
                  <View key={bIdx} style={styles.bulletRow}>
                    <Text style={[styles.bulletDot, { color: book.color }]}>
                      •
                    </Text>
                    <Text
                      style={[
                        styles.bulletText,
                        { fontSize: bodyFontSize, lineHeight: bodyLineHeight },
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {section.lawNote && (
              <View style={styles.lawNoteBox}>
                <Text style={styles.lawNoteLabel}>⚖️ MEVZUAT / KANUN NOTU</Text>
                <Text
                  style={[
                    styles.lawNoteText,
                    { fontSize: bodyFontSize - 1, lineHeight: bodyLineHeight - 2 },
                  ]}
                >
                  {section.lawNote}
                </Text>
              </View>
            )}

            {section.examTip && (
              <View style={styles.examTipBox}>
                <Text style={styles.examTipLabel}>💡 SINAV İPUCU</Text>
                <Text
                  style={[
                    styles.examTipText,
                    { fontSize: bodyFontSize - 1, lineHeight: bodyLineHeight - 2 },
                  ]}
                >
                  {section.examTip}
                </Text>
              </View>
            )}
          </View>
        ))}

        {/* Sayfa Sonu Okundu Kartı */}
        <TouchableOpacity
          style={[
            styles.completeBanner,
            isCurrentCompleted && styles.completeBannerDone,
          ]}
          onPress={handleToggleComplete}
          activeOpacity={0.85}
        >
          <Text style={styles.completeBannerIcon}>
            {isCurrentCompleted ? '✅' : '📖'}
          </Text>
          <View style={styles.completeBannerTextWrap}>
            <Text style={styles.completeBannerTitle}>
              {isCurrentCompleted
                ? 'Bu bölümü okudun'
                : 'Bu bölümü okundu olarak işaretle'}
            </Text>
            <Text style={styles.completeBannerSub}>
              {isCurrentCompleted
                ? 'Tekrar işareti kaldırmak için dokun'
                : 'İlerleme durumun otomatik kaydedilir'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Alt Sayfa Çevirme Çubuğu */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, spacing.sm) },
        ]}
      >
        <TouchableOpacity
          style={[styles.navBtn, isFirstChapter && styles.navBtnDisabled]}
          onPress={() => goToChapter(chapterIndex - 1)}
          disabled={isFirstChapter}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.navBtnText,
              isFirstChapter && styles.navBtnTextDisabled,
            ]}
          >
            ← Önceki
          </Text>
        </TouchableOpacity>

        <Text style={styles.pageCounter}>
          {chapterIndex + 1} / {book.chapters.length}
        </Text>

        <TouchableOpacity
          style={[styles.navBtnPrimary, { backgroundColor: book.color }]}
          onPress={handleNextOrFinish}
          activeOpacity={0.85}
        >
          <Text style={styles.navBtnPrimaryText}>
            {isLastChapter ? 'Dersi Bitir ✓' : 'Sonraki Bölüm →'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* İçindekiler Modalı */}
      <Modal
        visible={tocVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTocVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalSheet,
              { paddingBottom: Math.max(insets.bottom, spacing.md) },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>📑 İçindekiler</Text>
              <TouchableOpacity onPress={() => setTocVisible(false)}>
                <Text style={styles.modalClose}>Kapat ✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {book.chapters.map((ch, idx) => {
                const active = idx === chapterIndex;
                const done = completedIds.includes(ch.id);
                return (
                  <TouchableOpacity
                    key={ch.id}
                    style={[
                      styles.tocItem,
                      active && {
                        borderColor: book.color,
                        backgroundColor: `${book.color}12`,
                      },
                    ]}
                    onPress={() => goToChapter(idx)}
                  >
                    <View
                      style={[
                        styles.tocNumberCircle,
                        {
                          backgroundColor: done
                            ? colors.accent
                            : active
                              ? book.color
                              : colors.surfaceMuted,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tocNumberText,
                          (done || active) && { color: '#FFFFFF' },
                        ]}
                      >
                        {done ? '✓' : ch.chapterNumber}
                      </Text>
                    </View>
                    <View style={styles.tocInfo}>
                      <Text style={styles.tocItemTitle}>{ch.title}</Text>
                      <Text style={styles.tocItemSub} numberOfLines={2}>
                        {ch.summary}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm + 2,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
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
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    toolButton: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: colors.surfaceMuted,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tocButton: {
      backgroundColor: colors.surfaceHighlight,
      borderColor: colors.border,
    },
    toolButtonText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    bookBannerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    bookBannerEmoji: {
      fontSize: 22,
    },
    bookBannerTextWrap: {
      flex: 1,
    },
    bookBannerTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    bookBannerMeta: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 1,
    },
    chapterTabsRow: {
      gap: 8,
      paddingVertical: 2,
    },
    chapterTab: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: colors.surfaceMuted,
      borderWidth: 1,
      borderColor: colors.border,
    },
    chapterTabText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    chapterTabTextActive: {
      color: '#FFFFFF',
    },
    pageScrollContent: {
      padding: spacing.md,
      paddingBottom: spacing.xl,
      gap: spacing.md,
    },
    chapterCover: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      borderTopWidth: 4,
    },
    chapterTag: {
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 6,
      marginBottom: spacing.xs + 2,
    },
    chapterTagText: {
      fontSize: 11,
      fontWeight: '800',
      letterSpacing: 0.6,
    },
    chapterTitle: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.textPrimary,
      lineHeight: 27,
    },
    chapterSummary: {
      fontSize: 13.5,
      color: colors.textSecondary,
      marginTop: 6,
      lineHeight: 20,
    },
    sectionCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      gap: spacing.sm + 2,
    },
    sectionHeadingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    sectionAccentBar: {
      width: 4,
      height: 20,
      borderRadius: 2,
    },
    sectionHeading: {
      flex: 1,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    paragraphText: {
      color: colors.textPrimary,
    },
    bulletList: {
      gap: 8,
      marginTop: 2,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
    },
    bulletDot: {
      fontSize: 18,
      lineHeight: 22,
      fontWeight: 'bold',
    },
    bulletText: {
      flex: 1,
      color: colors.textPrimary,
    },
    lawNoteBox: {
      backgroundColor: colors.surfaceHighlight,
      borderRadius: 12,
      padding: spacing.sm + 4,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      marginTop: 4,
    },
    lawNoteLabel: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.primary,
      marginBottom: 4,
      letterSpacing: 0.5,
    },
    lawNoteText: {
      color: colors.textPrimary,
    },
    examTipBox: {
      backgroundColor: colors.warningSurface,
      borderRadius: 12,
      padding: spacing.sm + 4,
      borderLeftWidth: 4,
      borderLeftColor: colors.secondary,
      marginTop: 4,
    },
    examTipLabel: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.gold,
      marginBottom: 4,
      letterSpacing: 0.5,
    },
    examTipText: {
      color: colors.textPrimary,
    },
    completeBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      gap: spacing.sm + 4,
    },
    completeBannerDone: {
      backgroundColor: colors.successSurface,
      borderColor: colors.accent,
    },
    completeBannerIcon: {
      fontSize: 24,
    },
    completeBannerTextWrap: {
      flex: 1,
    },
    completeBannerTitle: {
      fontSize: 14.5,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    completeBannerSub: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    bottomBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm + 2,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    navBtn: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      backgroundColor: colors.surfaceMuted,
    },
    navBtnDisabled: {
      opacity: 0.45,
    },
    navBtnText: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    navBtnTextDisabled: {
      color: colors.textMuted,
    },
    pageCounter: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    navBtnPrimary: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    navBtnPrimaryText: {
      fontSize: 13,
      fontWeight: '800',
      color: '#FFFFFF',
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalSheet: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: spacing.md,
      maxHeight: '75%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: spacing.sm,
      marginBottom: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: 17,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    modalClose: {
      fontSize: 13.5,
      fontWeight: '700',
      color: colors.primary,
    },
    tocItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.sm + 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.sm,
      gap: spacing.sm + 2,
    },
    tocNumberCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tocNumberText: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    tocInfo: {
      flex: 1,
    },
    tocItemTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    tocItemSub: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
  });
