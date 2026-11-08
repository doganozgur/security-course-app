import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ExamsScreen } from '../screens/ExamsScreen';
import { FlashcardsScreen } from '../screens/FlashcardsScreen';
import { ScoreCalculatorScreen } from '../screens/ScoreCalculatorScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
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
