import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, StyleSheet as RNStyleSheet, Platform } from 'react-native';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();

    // Navigate after 2.5 seconds
    const timer = setTimeout(() => {
        navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#E3F2FD', '#FFFFFF']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.logoCircle}>
             <Ionicons name="shield-checkmark" size={60} color={COLORS.primary} />
          </View>
        </Animated.View>
        
        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
            <Text style={styles.title}>TrustMart</Text>
            <View style={styles.divider} />
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.tagline}>Buy, Sell & Hire Safely</Text>
        <View style={styles.trustBadge}>
            <Ionicons name="shield-checkmark" size={14} color={COLORS.primary} />
            <Text style={styles.trustText}>Secure Escrow Protection</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
  },
  logoContainer: {
      marginBottom: 24,
  },
  logoCircle: {
      width: 100,
      height: 100,
      borderRadius: 24,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      ...getShadow(COLORS.primary, { width: 0, height: 10 }, 0.1, 20, 5),
      borderWidth: 1,
      borderColor: 'rgba(0,102,255,0.05)',
  },
  textContainer: {
      alignItems: 'center',
  },
  title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#111418',
      letterSpacing: -0.5,
  },
  divider: {
      width: 50,
      height: 4,
      backgroundColor: COLORS.primary,
      borderRadius: 2,
      marginTop: 10,
  },
  footer: {
      alignItems: 'center',
      width: '100%',
      paddingBottom: 40,
  },
  tagline: {
      fontSize: 14,
      fontWeight: '600',
      color: 'rgba(17,20,24,0.6)',
      textTransform: 'uppercase',
      letterSpacing: 2,
      marginBottom: 16,
  },
  trustBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      opacity: 0.8,
  },
  trustText: {
      fontSize: 12,
      fontWeight: '600',
      color: COLORS.primary,
  }
});
