import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from '../screens/HomeScreen';
import { ExamsScreen } from '../screens/ExamsScreen';
import { FlashcardsScreen } from '../screens/FlashcardsScreen';
import { ScoreCalculatorScreen } from '../screens/ScoreCalculatorScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

const TAB_CONFIG: Record<string, { label: string; icon: string }> = {
  HomeTab: { label: 'Ana Sayfa', icon: '🏠' },
  ExamsTab: { label: 'Sınavlar', icon: '📝' },
  FlashcardsTab: { label: 'Kartlar', icon: '💡' },
  ScoreCalculatorTab: { label: 'Hesapla', icon: '🧮' },
  ProfileTab: { label: 'Profil', icon: '👤' },
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const bottomPadding = Math.max(insets.bottom, 10);

  return (
    <View
      style={[
        styles.barContainer,
        {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingBottom: bottomPadding,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const meta = TAB_CONFIG[route.name] ?? { label: route.name, icon: '•' };
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? meta.label}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.75}
            style={styles.tabItem}
          >
            <View
              style={[
                styles.iconPill,
                isFocused && { backgroundColor: colors.surfaceHighlight },
              ]}
            >
              <Text style={styles.tabIcon}>{meta.icon}</Text>
            </View>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={[
                styles.tabLabel,
                { color: isFocused ? colors.primary : colors.textMuted },
                isFocused && styles.tabLabelActive,
              ]}
            >
              {meta.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
      <Tab.Screen name="ExamsTab" component={ExamsScreen} options={{ title: 'Sınavlar' }} />
      <Tab.Screen name="FlashcardsTab" component={FlashcardsScreen} options={{ title: 'Kartlar' }} />
      <Tab.Screen name="ScoreCalculatorTab" component={ScoreCalculatorScreen} options={{ title: 'Hesapla' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  iconPill: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 3,
  },
  tabIcon: {
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
  },
  tabLabel: {
    fontSize: 10.5,
    lineHeight: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabLabelActive: {
    fontWeight: '800',
  },
});
