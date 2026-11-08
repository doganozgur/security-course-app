export type QuestionCategory =
  | 'hukuk'
  | 'guvenlik_tedbirleri'
  | 'yangin'
  | 'ilk_yardim'
  | 'uyusturucu'
  | 'iletisim'
  | 'kalabalik'
  | 'kisi_koruma'
  | 'cihazlar'
  | 'silah_bilgisi';

export interface Question {
  id: string;
  examId?: string;
  questionNumber: number;
  text: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation?: string;
  category: QuestionCategory;
  isWeaponQuestion?: boolean; // Silah sorusu (25 adetlik bölüm)
  imageUrl?: string;
}

export interface ExamPeriod {
  id: string;
  title: string; // e.g. "105. Temel Eğitim Sınavı"
  periodNumber: number;
  year: number;
  month: string;
  isFree: boolean; // Son 3 dönem ücretsiz, eskiler Premium
  durationMinutes: number; // 120 veya 150
  questionCount: number; // 100 veya 125
  description: string;
  hasWeaponSection: boolean;
}

export interface UserExamAttempt {
  id: string;
  examId: string;
  date: string;
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>;
  flaggedQuestionIds: string[];
  totalScore: number;
  correctCount: number;
  wrongCount: number;
  emptyCount: number;
  passed: boolean;
  timeSpentSeconds: number;
  categoryBreakdown: Record<QuestionCategory, { correct: number; total: number }>;
}

export interface Flashcard {
  id: string;
  topic: QuestionCategory;
  topicTitle: string;
  frontText: string;
  backText: string;
  importantNote?: string;
  lawReference?: string; // 5188 sayılı kanun md. 7 vb.
  isKnown?: boolean;
}

export interface ScoreCalculationInput {
  examType: 'silahsiz' | 'silahli';
  temelDogru: number; // 0 - 100
  silahDogru: number; // 0 - 25
  atisIsabet: number; // 0 - 5
}

export interface ScoreCalculationResult {
  temelPuan: number; // 0 - 100
  silahYaziliPuan: number; // 0 - 50 (silahDogru * 2)
  atisPuan: number; // 0 - 50 (atisIsabet * 10)
  toplamSilahPuan: number; // 0 - 100 (yazılı + atış)
  ortalamaPuan: number; // (Temel + Silah) / 2
  silahliGecti: boolean;
  silahsizGecti: boolean;
  statusMessage: string;
  details: string[];
}
