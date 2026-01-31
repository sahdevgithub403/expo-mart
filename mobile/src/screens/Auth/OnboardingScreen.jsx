import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SIZES, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    
  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
            <View style={styles.glow} />
            <View style={styles.iconCircle}>
                <View style={[styles.floatingIcon, { left: 0 }]}>
                    <Ionicons name="storefront" size={28} color={COLORS.primary} />
                </View>
                <View style={[styles.floatingIcon, { right: 0 }]}>
                    <Ionicons name="person" size={28} color={COLORS.primary} />
                </View>
                <View style={styles.connectionLine} />
                <View style={styles.centerShield}>
                    <Ionicons name="shield-checkmark" size={48} color="#fff" />
                </View>
            </View>
        </View>

        <Text style={styles.title}>Your Money is Safe</Text>
        <Text style={styles.description}>
            TrustMart holds payments in our secure escrow vault until you receive and verify the item. Secure transactions for every trade.
        </Text>
      </View>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
        </View>

        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.replace('Login')}
        >
            <Text style={styles.buttonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
      padding: 16,
      alignItems: 'flex-end',
  },
  skipText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#60758a',
  },
  content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
  },
  illustrationContainer: {
      width: 300,
      height: 300,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
      position: 'relative',
  },
  glow: {
      position: 'absolute',
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: 'rgba(0,102,255,0.1)',
  },
  iconCircle: {
      width: 250,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
  },
  floatingIcon: {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      ...getShadow('#000', { width: 0, height: 4 }, 0.1, 8, 4),
  },
  connectionLine: {
      width: 200,
      height: 4,
      backgroundColor: 'rgba(0,102,255,0.3)',
      borderRadius: 2,
  },
  centerShield: {
      position: 'absolute',
      width: 90,
      height: 90,
      borderRadius: 20,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      ...getShadow(COLORS.primary, { width: 0, height: 10 }, 0.3, 15, 10),
  },
  title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#111418',
      textAlign: 'center',
      marginBottom: 12,
  },
  description: {
      fontSize: 16,
      color: '#4b5563',
      textAlign: 'center',
      lineHeight: 24,
  },
  footer: {
      padding: 24,
      paddingBottom: 40,
  },
  pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 30,
  },
  dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#D1D5DB',
  },
  activeDot: {
      width: 24,
      backgroundColor: COLORS.primary,
  },
  button: {
      width: '100%',
      height: 56,
      backgroundColor: COLORS.primary,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      ...getShadow(COLORS.primary, { width: 0, height: 8 }, 0.25, 16, 6),
  },
  buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
  }
});
