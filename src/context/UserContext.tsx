import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DailyProgress, ExamTrack, UserPreferences } from '../types';
import { DEFAULT_PREFERENCES, StorageService } from '../utils/storage';

export const EXAM_TRACK_LABELS: Record<ExamTrack, string> = {
  silahli: 'Silahlı ÖGG',
  silahsiz: 'Silahsız ÖGG',
  yenileme: 'Yenileme',
};

interface UserContextValue {
  preferences: UserPreferences;
  dailyProgress: DailyProgress;
  isLoading: boolean;
  completeOnboarding: (examType: ExamTrack, dailyGoal: number) => Promise<void>;
  updateExamType: (examType: ExamTrack) => Promise<void>;
  updateDailyGoal: (dailyGoal: number) => Promise<void>;
  recordSolvedQuestions: (count: number) => Promise<void>;
  refreshDailyProgress: () => Promise<void>;
}

const UserContext = createContext<UserContextValue>({
  preferences: DEFAULT_PREFERENCES,
  dailyProgress: { date: '', solvedCount: 0 },
  isLoading: true,
  completeOnboarding: async () => {},
  updateExamType: async () => {},
  updateDailyGoal: async () => {},
  recordSolvedQuestions: async () => {},
  refreshDailyProgress: async () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [dailyProgress, setDailyProgress] = useState<DailyProgress>({
    date: new Date().toISOString().split('T')[0],
    solvedCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitial = async () => {
      const [prefs, progress] = await Promise.all([
        StorageService.getUserPreferences(),
        StorageService.getDailyProgress(),
      ]);
      setPreferences(prefs);
      setDailyProgress(progress);
      setIsLoading(false);
    };
    loadInitial();
  }, []);

  const persistPreferences = useCallback(async (next: UserPreferences) => {
    setPreferences(next);
    await StorageService.saveUserPreferences(next);
  }, []);

  const completeOnboarding = useCallback(
    async (examType: ExamTrack, dailyGoal: number) => {
      await persistPreferences({
        ...preferences,
        hasCompletedOnboarding: true,
        examType,
        dailyGoal,
      });
    },
    [preferences, persistPreferences]
  );

  const updateExamType = useCallback(
    async (examType: ExamTrack) => {
      await persistPreferences({ ...preferences, examType });
    },
    [preferences, persistPreferences]
  );

  const updateDailyGoal = useCallback(
    async (dailyGoal: number) => {
      await persistPreferences({ ...preferences, dailyGoal });
    },
    [preferences, persistPreferences]
  );

  const recordSolvedQuestions = useCallback(async (count: number) => {
    const updated = await StorageService.incrementDailyProgress(count);
    setDailyProgress(updated);
  }, []);

  const refreshDailyProgress = useCallback(async () => {
    const progress = await StorageService.getDailyProgress();
    setDailyProgress(progress);
  }, []);

  return (
    <UserContext.Provider
      value={{
        preferences,
        dailyProgress,
        isLoading,
        completeOnboarding,
        updateExamType,
        updateDailyGoal,
        recordSolvedQuestions,
        refreshDailyProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
