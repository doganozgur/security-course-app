import { QuestionCategory } from '../types';

export interface CategoryMeta {
  key: QuestionCategory;
  name: string;
  description: string;
  questionCountInExam: number; // 100 soruluk sınavdaki yaklaşık soru adedi
  icon: string;
  color: string;
}

export const CATEGORIES: Record<QuestionCategory, CategoryMeta> = {
  hukuk: {
    key: 'hukuk',
    name: 'Özel Güvenlik Hukuku',
    description: '5188 sayılı kanun, yetkiler, meşru müdafaa ve ceza hükümleri',
    questionCountInExam: 20,
    icon: 'scale-balance',
    color: '#3B82F6',
  },
  guvenlik_tedbirleri: {
    key: 'guvenlik_tedbirleri',
    name: 'Güvenlik Tedbirleri',
    description: 'Devriye, nokta koruma, üst arama, olay yeri ve delil koruma',
    questionCountInExam: 20,
    icon: 'shield-check',
    color: '#10B981',
  },
  yangin: {
    key: 'yangin',
    name: 'Yangın Güvenliği & Afetler',
    description: 'Yanma çeşitleri, söndürücüler, tahliye ve afet yönetimi',
    questionCountInExam: 8,
    icon: 'fire',
    color: '#EF4444',
  },
  ilk_yardim: {
    key: 'ilk_yardim',
    name: 'Temel İlk Yardım',
    description: 'Hayati fonksiyonlar, suni solunum, kanamalar, kırıklar',
    questionCountInExam: 10,
    icon: 'medical-bag',
    color: '#EC4899',
  },
  uyusturucu: {
    key: 'uyusturucu',
    name: 'Uyuşturucu Madde Bilgisi',
    description: 'Maddeler, bağımlılık belirtileri ve yasal mevzuat',
    questionCountInExam: 2,
    icon: 'pill',
    color: '#8B5CF6',
  },
  iletisim: {
    key: 'iletisim',
    name: 'Etkili İletişim',
    description: 'Beden dili, empati, aktif dinleme ve iletişim engelleri',
    questionCountInExam: 12,
    icon: 'account-voice',
    color: '#06B6D4',
  },
  kalabalik: {
    key: 'kalabalik',
    name: 'Kalabalık Yönetimi',
    description: 'Grup psikolojisi, panik, cop kullanımı ve kitle kontrolü',
    questionCountInExam: 10,
    icon: 'account-group',
    color: '#F59E0B',
  },
  kisi_koruma: {
    key: 'kisi_koruma',
    name: 'Kişi Koruma',
    description: 'Öncü istihbarat, yaya ve araç koruma düzenleri, suikastler',
    questionCountInExam: 9,
    icon: 'account-tie',
    color: '#6366F1',
  },
  cihazlar: {
    key: 'cihazlar',
    name: 'Güvenlik Sistem ve Cihazları',
    description: 'X-Ray cihazı, el ve kapı dedektörleri, CCTV kameralar',
    questionCountInExam: 9,
    icon: 'cctv',
    color: '#14B8A6',
  },
  silah_bilgisi: {
    key: 'silah_bilgisi',
    name: 'Silah Bilgisi & Atış',
    description: 'Tabanca parçaları, emniyet sistemleri, nişan ve atış kuralları',
    questionCountInExam: 25,
    icon: 'target',
    color: '#D97706',
  },
};
