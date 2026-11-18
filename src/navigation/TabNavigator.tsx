import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from '../screens/HomeScreen';
import { ExamsScreen } from '../screens/ExamsScreen';
import { FlashcardsScreen } from '../screens/FlashcardsScreen';
import { ScoreCalculatorScreen } from '../screens/ScoreCalculatorScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { spacing } from '../theme/colors';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 60 + insets.bottom + 10,
          paddingBottom: insets.bottom + 12,
          paddingTop: spacing.sm + 2,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="ExamsTab"
        component={ExamsScreen}
        options={{
          tabBarLabel: 'Sınavlar',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18 }}>📝</Text>,
        }}
      />
      <Tab.Screen
        name="FlashcardsTab"
        component={FlashcardsScreen}
        options={{
          tabBarLabel: 'Kartlar',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18 }}>💡</Text>,
        }}
      />
      <Tab.Screen
        name="ScoreCalculatorTab"
        component={ScoreCalculatorScreen}
        options={{
          tabBarLabel: 'Hesapla',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18 }}>🧮</Text>,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
