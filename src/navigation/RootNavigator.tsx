import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { ExamSolveScreen } from '../screens/ExamSolveScreen';
import { ExamResultScreen } from '../screens/ExamResultScreen';
import { MistakesScreen } from '../screens/MistakesScreen';
import { FaqScreen } from '../screens/FaqScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { LessonsScreen } from '../screens/LessonsScreen';
import { LessonReaderScreen } from '../screens/LessonReaderScreen';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { preferences, isLoading } = useUser();
  const { colors } = useTheme();

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!preferences.hasCompletedOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen
            name="ExamSolve"
            component={ExamSolveScreen}
            options={{
              gestureEnabled: false, // Sınav esnasında yanlışlıkla geri kaydırmayı önle
            }}
          />
          <Stack.Screen
            name="ExamResult"
            component={ExamResultScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="Mistakes" component={MistakesScreen} />
          <Stack.Screen name="Faq" component={FaqScreen} />
          <Stack.Screen
            name="Lessons"
            component={LessonsScreen}
            options={{ title: 'Dersler' }}
          />
          <Stack.Screen
            name="LessonReader"
            component={LessonReaderScreen}
            options={{ title: 'Konu Kitabı' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
