import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing, ThemeColors } from '../theme/colors';
import { useTheme } from '../context/ThemeContext';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: 'Silahlı ve Silahsız sınav arasındaki fark nedir?',
    answer:
      'Silahsız adaylar sadece 100 soruluk Temel Eğitim sınavına girer ve 120 dakika süre verilir. Silahlı adaylar ise buna ek olarak 25 soruluk Silah Bilgisi yazılı sınavına (toplam 150 dakika) ve poligon atış sınavına katılır.',
  },
  {
    id: '2',
    question: 'Sınavda geçme barajı kaç puandır?',
    answer:
      'Silahsız sınavda 100 sorudan en az 60 doğru (60 puan) almak gerekir. Silahlı sınavda ise Toplam Silah Puanının (Silah Yazılı + Atış) en az 50 olması ve Temel Eğitim + Toplam Silah ortalamasının en az 60 puan olması şarttır.',
  },
  {
    id: '3',
    question: 'Yanlış cevaplar doğruyu götürür mü?',
    answer:
      'Hayır. Özel Güvenlik sınavlarında yanlış cevaplar doğru cevapları götürmez. Bu nedenle emin olmadığınız soruları boş bırakmamanız önerilir.',
  },
  {
    id: '4',
    question: 'Uygulamalı atış sınavı nasıl puanlanır?',
    answer:
      'Poligonda 5 adet fişek atılır ve hedefe isabet eden her fişek 10 puan değerindedir (maksimum 50 puan). Silah Bilgisi yazılı sınavındaki 25 sorunun her biri ise 2 puandır (maksimum 50 puan). İkisinin toplamı 100 üzerinden Silah Puanını oluşturur.',
  },
  {
    id: '5',
    question: 'Silahlı sınavdan kalırsam silahsız sertifika alabilir miyim?',
    answer:
      'Evet. Silahlı sınav ortalamanız 60’ın altında kalsa bile Temel Eğitim puanınız 60 ve üzerindeyse Silahsız Özel Güvenlik Görevlisi olmaya hak kazanırsınız.',
  },
  {
    id: '6',
    question: 'Bir sınav döneminde kaç sınav hakkım vardır?',
    answer:
      'Temel eğitimi tamamlayan adayların 1 yıl içerisinde toplam 4 sınav hakkı bulunur. Başarısız olunan ilk sınavın ardından kalan haklarda tekrar eğitim almadan sınava girilebilir.',
  },
  {
    id: '7',
    question: 'Yenileme eğitiminde sınav puanı şartı var mı?',
    answer:
      'Yenileme eğitiminde adaylar sınava girer ancak geçme/kalma barajı uygulanmaz; sınava katılım ve eğitim tamamlama şartı aranır.',
  },
  {
    id: '8',
    question: 'Çözdüğüm sorular ve istatistiklerim nerede saklanır?',
    answer:
      'Tüm sınav geçmişiniz, hata defteriniz ve tercihleriniz yalnızca telefonunuzun yerel hafızasında saklanır; sunuculara kişisel veri gönderilmez.',
  },
];

interface FaqScreenProps {
  navigation: any;
}

export const FaqScreen: React.FC<FaqScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [expandedId, setExpandedId] = useState<string | null>('1');

  const toggleItem = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View style={[styles.topHeader, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backButtonText}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sıkça Sorulan Sorular</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {FAQ_ITEMS.map((item) => {
          const isOpen = expandedId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.faqCard, isOpen && styles.faqCardActive]}
              activeOpacity={0.85}
              onPress={() => toggleItem(item.id)}
            >
              <View style={styles.questionRow}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Text style={styles.chevron}>{isOpen ? '−' : '+'}</Text>
              </View>
              {isOpen && <Text style={styles.answerText}>{item.answer}</Text>}
            </TouchableOpacity>
          );
        })}
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
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 8,
      backgroundColor: colors.surfaceMuted,
    },
    backButtonText: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.primary,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    scrollArea: {
      padding: spacing.md,
      paddingBottom: spacing.xl,
      gap: spacing.sm,
    },
    faqCard: {
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    faqCardActive: {
      borderColor: colors.primary,
    },
    questionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    questionText: {
      flex: 1,
      fontSize: 14,
      fontWeight: '700',
      color: colors.textPrimary,
      lineHeight: 20,
    },
    chevron: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.primary,
    },
    answerText: {
      marginTop: spacing.sm,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
      fontSize: 13,
      lineHeight: 20,
      color: colors.textSecondary,
    },
  });
