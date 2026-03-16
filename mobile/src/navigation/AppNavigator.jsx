import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme';

// Auth Stack
import SplashScreen from '../screens/Auth/SplashScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import LocationPermissionScreen from '../screens/Auth/LocationPermissionScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';

// Main App Stack
import HomeScreen from '../screens/Home/HomeScreen';
import ExploreScreen from '../screens/Home/ExploreScreen';
import SavedScreen from '../screens/Home/SavedScreen';
import DetailsScreen from '../screens/Home/DetailsScreen';
import MarketplaceScreen from '../screens/Marketplace/MarketplaceScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

import MapExploreScreen from '../screens/Home/MapExploreScreen';
import AddListingFlow from '../screens/Listing/AddListingScreen';
import ServicesScreen from '../screens/Listing/ServicesScreen';
import ChatInboxScreen from '../screens/Chat/ChatInboxScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          { height: 60 + insets.bottom, paddingBottom: insets.bottom + 4 },
        ],
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: -2,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Explore':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Saved':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ tabBarLabel: 'Explore' }} />
      <Tab.Screen name="Saved" component={SavedScreen} options={{ tabBarLabel: 'Saved' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth Flow */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

        {/* Main App */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Auxiliary Screens */}
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="Map" component={MapExploreScreen} />
        <Stack.Screen name="Chat" component={ChatInboxScreen} />
        <Stack.Screen name="AddListingFlow" component={AddListingFlow} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    position: 'absolute',
    elevation: 0,
    ...SHADOWS.xs,
  },
});
