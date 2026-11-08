import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { ExamSolveScreen } from '../screens/ExamSolveScreen';
import { ExamResultScreen } from '../screens/ExamResultScreen';
import { MistakesScreen } from '../screens/MistakesScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
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
    </Stack.Navigator>
  );
};
