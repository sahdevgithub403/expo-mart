import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigationState } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, getShadow } from '../constants/theme';
import { AuthService } from '../services/authService';

// Auth Stack
import SplashScreen from '../screens/Auth/SplashScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import LocationPermissionScreen from '../screens/Auth/LocationPermissionScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';

// Main Stack
import HomeScreen from '../screens/Home/HomeScreen';
import DetailsScreen from '../screens/Home/DetailsScreen';
import MarketplaceScreen from '../screens/Marketplace/MarketplaceScreen';
import SavedScreen from '../screens/Marketplace/SavedScreen';
import PostListingScreen from '../screens/Listing/PostListingScreen';
import PostTypeScreen from '../screens/Listing/PostTypeScreen';
import SpecializedHubScreen from '../screens/Listing/SpecializedHubScreen';
import ServicesScreen from '../screens/Listing/ServicesScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProfileSettingsScreen from '../screens/Profile/ProfileSettingsScreen';
import EscrowStatusScreen from '../screens/Escrow/EscrowStatusScreen';
import ChatConversationScreen from '../screens/Chat/ChatConversationScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder for Listing to handle modal-like behavior for "Post" tab
function Placeholder() {
  return <View />;
}

function MainTabs() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => {
        // We can get the state to check which tab is active
        const state = navigation.getState();
        const activeRouteName = state?.routes[state.index]?.name;
        const isProfileActive = activeRouteName === 'Profile';

        return {
          headerShown: false,
          tabBarStyle: [
              styles.tabBar,
              { height: 60 + insets.bottom, paddingBottom: insets.bottom }
          ],
          tabBarShowLabel: true,
          tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: 'bold',
              marginBottom: 5,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: '#757575',
        };
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
            tabBarLabel: 'HOME',
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
            )
        }}
      />
      
      <Tab.Screen 
        name="Marketplace" 
        component={MarketplaceScreen} 
        options={{
            tabBarLabel: 'EXPLORE',
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? "search" : "search-outline"} size={22} color={color} />
            )
        }}
      />

      <Tab.Screen 
        name="PostInput" 
        component={Placeholder} 
        options={({navigation}) => {
            const state = navigation.getState();
            const activeRouteName = state?.routes[state.index]?.name;
            const isProfileActive = activeRouteName === 'Profile';

            return {
                tabBarLabel: 'SELL',
                tabBarLabelStyle: {
                    color: COLORS.primary,
                    fontWeight: '900',
                    fontSize: 11,
                    bottom: -2,
                },
                tabBarIcon: () => (
                    <View style={styles.fabContainer}>
                        <View style={styles.fab}>
                            <Ionicons name="add" size={32} color={COLORS.primary} />
                        </View>
                    </View>
                ),
                tabBarButton: isProfileActive ? () => null : (props) => (
                    <TouchableOpacity
                        {...props}
                        onPress={() => navigation.navigate('PostType')}
                    />
                )
            };
        }}
      />

      <Tab.Screen 
        name="Saved" 
        component={SavedScreen} 
        options={{
            tabBarLabel: 'MY ADS',
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? "heart" : "heart-outline"} size={22} color={color} />
            )
        }}
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
            tabBarLabel: 'ACCOUNT',
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? "person" : "person-outline"} size={22} color={color} />
            )
        }}
      />
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
        <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
        
        {/* Screens separate from Tabs */}
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="PostType" component={PostTypeScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="PostListing" component={PostListingScreen} />
        <Stack.Screen name="SpecializedHub" component={SpecializedHubScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="EscrowStatus" component={EscrowStatusScreen} />
        <Stack.Screen name="Chat" component={ChatConversationScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fabContainer: {
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 5,
    borderColor: '#FFFFFF',
  }
});
