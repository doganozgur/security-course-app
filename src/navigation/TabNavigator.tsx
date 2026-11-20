import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from '../screens/HomeScreen';
import { ExamsScreen } from '../screens/ExamsScreen';
import { FlashcardsScreen } from '../screens/FlashcardsScreen';
import { ScoreCalculatorScreen } from '../screens/ScoreCalculatorScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const bottomPad = Math.max(insets.bottom, 8);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelPosition: 'below-icon',
        tabBarAllowFontScaling: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 58 + bottomPad,
          paddingBottom: bottomPad,
          paddingTop: 6,
        },
        tabBarItemStyle: {
          paddingHorizontal: 2,
          paddingVertical: 2,
          justifyContent: 'center',
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          lineHeight: 14,
          fontWeight: '600',
          marginTop: 0,
          marginBottom: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: () => <Text style={{ fontSize: 18, lineHeight: 22 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="ExamsTab"
        component={ExamsScreen}
        options={{
          tabBarLabel: 'Sınavlar',
          tabBarIcon: () => <Text style={{ fontSize: 18, lineHeight: 22 }}>📝</Text>,
        }}
      />
      <Tab.Screen
        name="FlashcardsTab"
        component={FlashcardsScreen}
        options={{
          tabBarLabel: 'Kartlar',
          tabBarIcon: () => <Text style={{ fontSize: 18, lineHeight: 22 }}>💡</Text>,
        }}
      />
      <Tab.Screen
        name="ScoreCalculatorTab"
        component={ScoreCalculatorScreen}
        options={{
          tabBarLabel: 'Hesapla',
          tabBarIcon: () => <Text style={{ fontSize: 18, lineHeight: 22 }}>🧮</Text>,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: () => <Text style={{ fontSize: 18, lineHeight: 22 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
