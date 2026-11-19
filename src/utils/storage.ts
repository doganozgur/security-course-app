import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserExamAttempt, Question, UserPreferences, DailyProgress } from '../types';

const STORAGE_KEYS = {
  EXAM_ATTEMPTS: '@ogg_exam_attempts',
  WRONG_QUESTIONS: '@ogg_wrong_questions',
  FAVORITE_QUESTIONS: '@ogg_favorite_questions',
  KNOWN_FLASHCARDS: '@ogg_known_flashcards',
  COMPLETED_LESSON_CHAPTERS: '@ogg_completed_lesson_chapters',
  USER_STATS: '@ogg_user_stats',
  USER_PREFERENCES: '@ogg_user_preferences',
  DAILY_PROGRESS: '@ogg_daily_progress',
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  hasCompletedOnboarding: false,
  examType: 'silahli',
  dailyGoal: 20,
  targetPeriod: '124. Dönem',
};

export interface UserStatistics {
  totalSolvedQuestions: number;
  totalCorrect: number;
  totalWrong: number;
  completedExamsCount: number;
  streakDays: number;
  lastStudyDate: string;
}

export const StorageService = {
  // Sınav Denemelerini Kaydetme
  async saveExamAttempt(attempt: UserExamAttempt): Promise<void> {
    try {
      const existing = await this.getExamAttempts();
      const updated = [attempt, ...existing];
      await AsyncStorage.setItem(STORAGE_KEYS.EXAM_ATTEMPTS, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving exam attempt', e);
    }
  },

  async getExamAttempts(): Promise<UserExamAttempt[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.EXAM_ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  // Hata Defteri (Yanlış Sorular)
  async addWrongQuestions(questions: Question[]): Promise<void> {
    try {
      const existing = await this.getWrongQuestions();
      const existingIds = new Set(existing.map((q) => q.id));
      const newlyAdded: Question[] = [];
      for (const q of questions) {
        if (q && q.id && !existingIds.has(q.id)) {
          existingIds.add(q.id);
          newlyAdded.push(q);
        }
      }
      if (newlyAdded.length > 0) {
        const updated = [...newlyAdded, ...existing];
        await AsyncStorage.setItem(STORAGE_KEYS.WRONG_QUESTIONS, JSON.stringify(updated));
      }
    } catch (e) {
      console.error('Error saving wrong questions', e);
    }
  },

  async getWrongQuestions(): Promise<Question[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.WRONG_QUESTIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async removeWrongQuestion(questionId: string): Promise<void> {
    try {
      const existing = await this.getWrongQuestions();
      const filtered = existing.filter((q) => q.id !== questionId);
      await AsyncStorage.setItem(STORAGE_KEYS.WRONG_QUESTIONS, JSON.stringify(filtered));
    } catch (e) {
      console.error('Error removing wrong question', e);
    }
  },

  // Favori Sorular
  async toggleFavorite(question: Question): Promise<boolean> {
    try {
      const existing = await this.getFavoriteQuestions();
      const index = existing.findIndex((q) => q.id === question.id);
      let isFav = false;
      let updated: Question[] = [];

      if (index >= 0) {
        updated = existing.filter((q) => q.id !== question.id);
        isFav = false;
      } else {
        updated = [question, ...existing];
        isFav = true;
      }

      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_QUESTIONS, JSON.stringify(updated));
      return isFav;
    } catch (e) {
      console.error('Error toggling favorite', e);
      return false;
    }
  },

  async getFavoriteQuestions(): Promise<Question[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_QUESTIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  // Bilgi Kartları (Öğrendiklerim)
  async toggleKnownCard(cardId: string): Promise<boolean> {
    try {
      const knownIds = await this.getKnownCardIds();
      const set = new Set(knownIds);
      let isKnown = false;
      if (set.has(cardId)) {
        set.delete(cardId);
        isKnown = false;
      } else {
        set.add(cardId);
        isKnown = true;
      }
      await AsyncStorage.setItem(STORAGE_KEYS.KNOWN_FLASHCARDS, JSON.stringify(Array.from(set)));
      return isKnown;
    } catch (e) {
      return false;
    }
  },

  async getKnownCardIds(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.KNOWN_FLASHCARDS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  // İstatistikler
  async updateStats(solvedCount: number, correctCount: number, wrongCount: number): Promise<void> {
    try {
      const current = await this.getUserStats();
      const today = new Date().toISOString().split('T')[0];
      let newStreak = current.streakDays;

      if (current.lastStudyDate !== today) {
        newStreak += 1;
      }

      const updated: UserStatistics = {
        totalSolvedQuestions: current.totalSolvedQuestions + solvedCount,
        totalCorrect: current.totalCorrect + correctCount,
        totalWrong: current.totalWrong + wrongCount,
        completedExamsCount: current.completedExamsCount + 1,
        streakDays: Math.max(1, newStreak),
        lastStudyDate: today,
      };

      await AsyncStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(updated));
    } catch (e) {
      console.error('Error updating stats', e);
    }
  },

  async getUserStats(): Promise<UserStatistics> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_STATS);
      return data
        ? JSON.parse(data)
        : {
            totalSolvedQuestions: 0,
            totalCorrect: 0,
            totalWrong: 0,
            completedExamsCount: 0,
            streakDays: 1,
            lastStudyDate: new Date().toISOString().split('T')[0],
          };
    } catch (e) {
      return {
        totalSolvedQuestions: 0,
        totalCorrect: 0,
        totalWrong: 0,
        completedExamsCount: 0,
        streakDays: 1,
        lastStudyDate: new Date().toISOString().split('T')[0],
      };
    }
  },

  // Kullanıcı Tercihleri (Sınav Türü, Günlük Hedef, Onboarding)
  async getUserPreferences(): Promise<UserPreferences> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return data ? { ...DEFAULT_PREFERENCES, ...JSON.parse(data) } : DEFAULT_PREFERENCES;
    } catch (e) {
      return DEFAULT_PREFERENCES;
    }
  },

  async saveUserPreferences(prefs: UserPreferences): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(prefs));
    } catch (e) {
      console.error('Error saving user preferences', e);
    }
  },

  // Günlük Çözülen Soru İlerlemesi
  async getDailyProgress(): Promise<DailyProgress> {
    const today = new Date().toISOString().split('T')[0];
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_PROGRESS);
      if (data) {
        const parsed: DailyProgress = JSON.parse(data);
        if (parsed.date === today) {
          return parsed;
        }
      }
      return { date: today, solvedCount: 0 };
    } catch (e) {
      return { date: today, solvedCount: 0 };
    }
  },

  async incrementDailyProgress(count: number): Promise<DailyProgress> {
    const current = await this.getDailyProgress();
    const updated: DailyProgress = {
      date: current.date,
      solvedCount: Math.max(0, current.solvedCount + count),
    };
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.DAILY_PROGRESS, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving daily progress', e);
    }
    return updated;
  },

  // Dersler / Konu Kitabı Okunan Bölümler
  async getCompletedChapterIds(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_LESSON_CHAPTERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async toggleCompletedChapter(chapterId: string): Promise<boolean> {
    try {
      const existing = await this.getCompletedChapterIds();
      const set = new Set(existing);
      let isCompleted = false;
      if (set.has(chapterId)) {
        set.delete(chapterId);
        isCompleted = false;
      } else {
        set.add(chapterId);
        isCompleted = true;
      }
      await AsyncStorage.setItem(
        STORAGE_KEYS.COMPLETED_LESSON_CHAPTERS,
        JSON.stringify(Array.from(set))
      );
      return isCompleted;
    } catch (e) {
      return false;
    }
  },
};
