import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthService } from '../../services/authService';
import { setAuthToken } from '../../services/api';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(40);
  const scaleAnim = new Animated.Value(0.8);
  const progressAnim = new Animated.Value(0);
  const taglineFade = new Animated.Value(0);
  const footerFade = new Animated.Value(0);

  useEffect(() => {
    // Staggered entrance animations
    Animated.sequence([
      // Logo + Title fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 60,
          friction: 12,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      // Tagline fade
      Animated.timing(taglineFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Footer fade
      Animated.timing(footerFade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Progress bar
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    const checkAuth = async () => {
      try {
        const token = await AuthService.getToken();
        const user = await AuthService.getUser();
        
        await new Promise(resolve => setTimeout(resolve, 3200));

        if (token && user) {
          setAuthToken(token);
          navigation.replace('MainTabs');
        } else {
          navigation.replace('Onboarding');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        navigation.replace('Login');
      }
    };

    checkAuth();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Center Content */}
      <View style={styles.centerContent}>
        {/* Logo Circle */}
        <Animated.View 
          style={[
            styles.logoOuter, 
            { 
              opacity: fadeAnim, 
              transform: [{ scale: scaleAnim }] 
            }
          ]}
        >
          <View style={styles.logoInner}>
            <Ionicons name="location" size={32} color={COLORS.primary} />
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.Text 
          style={[
            styles.appName, 
            { 
              opacity: fadeAnim, 
              transform: [{ translateY: slideAnim }] 
            }
          ]}
        >
          Lumina
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text 
          style={[styles.tagline, { opacity: taglineFade }]}
        >
          Discover the best places{'\n'}near you.
        </Animated.Text>

        {/* Progress section */}
        <Animated.View style={[styles.progressSection, { opacity: taglineFade }]}>
          <Text style={styles.progressLabel}>Curating premium experiences...</Text>
          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View style={[styles.footer, { opacity: footerFade }]}>
        <Text style={styles.footerText}>LUXURY STAYS & EXPERIENCES</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  logoOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE4E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  logoInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: SPACING.lg,
  },
  tagline: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: SPACING.xl,
  },
  progressSection: {
    width: '80%',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: SPACING.xl + SPACING.md,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    letterSpacing: 2,
  },
});
