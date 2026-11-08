import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, spacing } from '../theme/colors';
import { MOCK_FLASHCARDS } from '../data/mockFlashcards';
import { QuestionCategory } from '../types';
import { CATEGORIES } from '../data/categories';
import { StorageService } from '../utils/storage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface FlashcardsScreenProps {
  navigation?: any;
}

export const FlashcardsScreen: React.FC<FlashcardsScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedTopic, setSelectedTopic] = useState<QuestionCategory | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCardIds, setKnownCardIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadKnownCards();
  }, []);

  const loadKnownCards = async () => {
    const ids = await StorageService.getKnownCardIds();
    setKnownCardIds(new Set(ids));
  };

  const filteredCards = MOCK_FLASHCARDS.filter((card) => {
    if (selectedTopic === 'all') return true;
    return card.topic === selectedTopic;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const isCardKnown = currentCard ? knownCardIds.has(currentCard.id) : false;

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // başa sar
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleToggleKnown = async () => {
    if (!currentCard) return;
    const isNowKnown = await StorageService.toggleKnownCard(currentCard.id);
    setKnownCardIds((prev) => {
      const next = new Set(prev);
      if (isNowKnown) {
        next.add(currentCard.id);
      } else {
        next.delete(currentCard.id);
      }
      return next;
    });
    handleNext();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.topHeader, { paddingTop: Math.max(insets.top, 24) + 18 }]}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.navigate('HomeTab')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backButtonText}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hap Bilgi Kartları</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Sınavda en çok çıkan kritik maddeler ve terimler
        </Text>

        {/* Konu Filtreleri */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <TouchableOpacity
            style={[styles.topicChip, selectedTopic === 'all' && styles.topicChipActive]}
            onPress={() => {
              setSelectedTopic('all');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
          >
            <Text
              style={[
                styles.topicChipText,
                selectedTopic === 'all' && styles.topicChipTextActive,
              ]}
            >
              Tümü ({MOCK_FLASHCARDS.length})
            </Text>
          </TouchableOpacity>

          {Object.values(CATEGORIES).map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.topicChip,
                selectedTopic === cat.key && styles.topicChipActive,
              ]}
              onPress={() => {
                setSelectedTopic(cat.key);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
            >
              <Text
                style={[
                  styles.topicChipText,
                  selectedTopic === cat.key && styles.topicChipTextActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Kart Alanı */}
      <View style={styles.contentArea}>
        {currentCard ? (
          <>
            {/* Sayaç ve Durum */}
            <View style={styles.counterRow}>
              <Text style={styles.counterText}>
                Kart {currentIndex + 1} / {filteredCards.length}
              </Text>
              {isCardKnown && (
                <View style={styles.learnedBadge}>
                  <Text style={styles.learnedText}>✓ Öğrenildi</Text>
                </View>
              )}
            </View>

            {/* İnteraktif Kart */}
            <TouchableOpacity
              style={[styles.cardContainer, isFlipped && styles.cardFlipped]}
              activeOpacity={0.9}
              onPress={() => setIsFlipped(!isFlipped)}
            >
              <View style={styles.cardHeaderRow}>
                <View style={styles.topicBadge}>
                  <Text style={styles.topicBadgeText}>{currentCard.topicTitle}</Text>
                </View>
                <Text style={styles.flipHintText}>
                  {isFlipped ? 'Soruya Dön ↺' : 'Cevabı Gör 👆'}
                </Text>
              </View>

              <View style={styles.cardBody}>
                {!isFlipped ? (
                  // Ön Yüz (Soru / Kavram)
                  <View style={styles.frontBox}>
                    <Text style={styles.frontIcon}>❓</Text>
                    <Text style={styles.frontQuestion}>{currentCard.frontText}</Text>
                    <Text style={styles.tapToReveal}>Cevabı görmek için karta dokunun</Text>
                  </View>
                ) : (
                  // Arka Yüz (Açıklama / Kanun Maddesi)
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.backAnswer}>{currentCard.backText}</Text>

                    {currentCard.importantNote && (
                      <View style={styles.importantBox}>
                        <Text style={styles.importantTitle}>⚠️ Sınav İpucu:</Text>
                        <Text style={styles.importantText}>
                          {currentCard.importantNote}
                        </Text>
                      </View>
                    )}

                    {currentCard.lawReference && (
                      <Text style={styles.lawRef}>
                        Mevzuat: {currentCard.lawReference}
                      </Text>
                    )}
                  </ScrollView>
                )}
              </View>
            </TouchableOpacity>

            {/* Değerlendirme Butonları */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.rateButton, styles.repeatBtn]}
                onPress={handleNext}
              >
                <Text style={styles.repeatBtnText}>Tekrar Et 🔴</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.rateButton, styles.knownBtn]}
                onPress={handleToggleKnown}
              >
                <Text style={styles.knownBtnText}>
                  {isCardKnown ? 'Öğrenildi Olarak Kaldır' : 'Öğrendim 🟢'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Bu kategoride henüz kart bulunmuyor.</Text>
          </View>
        )}
      </View>
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
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
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
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  filterScroll: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  topicChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  topicChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  topicChipText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  topicChipTextActive: {
    color: '#FFFFFF',
  },
  contentArea: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  counterText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  learnedBadge: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  learnedText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accent,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: spacing.sm,
  },
  cardFlipped: {
    borderColor: colors.primaryLight,
    backgroundColor: '#F8FAFF',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  topicBadge: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  topicBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  flipHintText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
  },
  frontBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  frontIcon: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  frontQuestion: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
  },
  tapToReveal: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xl,
    fontWeight: '500',
  },
  backAnswer: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 24,
    fontWeight: '500',
  },
  importantBox: {
    backgroundColor: '#FEF3C7',
    padding: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
  },
  importantTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.gold,
    marginBottom: 4,
  },
  importantText: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 18,
  },
  lawRef: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginTop: spacing.md,
    fontStyle: 'italic',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  rateButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatBtn: {
    backgroundColor: '#FEE2E2',
    marginRight: spacing.sm,
  },
  repeatBtnText: {
    color: colors.danger,
    fontWeight: 'bold',
    fontSize: 13,
  },
  knownBtn: {
    backgroundColor: colors.accent,
    marginLeft: spacing.sm,
  },
  knownBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
