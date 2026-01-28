import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, getShadow } from '../constants/theme';

// Auth Stack
import SplashScreen from '../screens/Auth/SplashScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import LocationPermissionScreen from '../screens/Auth/LocationPermissionScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

// Main Stack
import HomeScreen from '../screens/Home/HomeScreen';
import DetailsScreen from '../screens/Home/DetailsScreen';
import MarketplaceScreen from '../screens/Marketplace/MarketplaceScreen';
import SavedScreen from '../screens/Marketplace/SavedScreen';
import PostListingScreen from '../screens/Listing/PostListingScreen';
import ServicesScreen from '../screens/Listing/ServicesScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EscrowStatusScreen from '../screens/Escrow/EscrowStatusScreen';
import ChatConversationScreen from '../screens/Chat/ChatConversationScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder for Listing to handle modal-like behavior for "Post" tab
function Placeholder() {
  return <View />;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
            marginTop: -5,
            marginBottom: 5,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#9E9E9E',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
            )
        }}
      />
      
      <Tab.Screen 
        name="Marketplace" 
        component={MarketplaceScreen} 
        options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? "compass" : "compass-outline"} size={24} color={color} />
            )
        }}
      />

      <Tab.Screen 
        name="PostInput" 
        component={Placeholder} 
        options={({navigation}) => ({
            tabBarLabel: '',
            tabBarIcon: () => (
                <View style={styles.fabContainer}>
                    <View style={styles.fab}>
                        <Ionicons name="add" size={32} color="#fff" />
                    </View>
                </View>
            ),
            tabBarButton: (props) => (
                <TouchableOpacity
                    {...props}
                    onPress={() => navigation.navigate('PostListing')}
                />
            )
        })}
      />

      <Tab.Screen 
        name="Saved" 
        component={SavedScreen} 
        options={{
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? "heart" : "heart-outline"} size={24} color={color} />
            )
        }}
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
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

        {/* Main App */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
        
        {/* Screens separate from Tabs */}
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="PostListing" component={PostListingScreen} options={{ presentation: 'modal' }} />
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
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 0,
  },
  fabContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...getShadow(COLORS.primary, { width: 0, height: 8 }, 0.3, 10, 8),
    borderWidth: 4,
    borderColor: '#fff',
  }
});
