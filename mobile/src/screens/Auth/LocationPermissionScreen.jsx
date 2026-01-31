import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function LocationPermissionScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const handleAllow = () => {
    // In a real app, adhere to platform permissions logic
    navigation.replace('MainTabs');
  };

  const handleDecline = () => {
      navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
            <View style={[styles.pulseCircle, { width: 128, height: 128, opacity: 0.1 }]} />
            <View style={[styles.pulseCircle, { width: 96, height: 96, opacity: 0.2 }]} />
            <View style={styles.mainIconCircle}>
                <Ionicons name="location" size={48} color={COLORS.primary} />
            </View>
            <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} />
            </View>
        </View>

        <Text style={styles.title}>Enable Location for Better Deals</Text>
        <Text style={styles.description}>
            TrustMart uses your location to show items and services available right in your campus or neighborhood.
        </Text>

        <View style={styles.benefits}>
            <View style={styles.benefitItem}>
                <Ionicons name="walk" size={24} color={COLORS.primary} />
                <Text style={styles.benefitText}>Find items within walking distance</Text>
            </View>
            <View style={styles.benefitItem}>
                <Ionicons name="time" size={24} color={COLORS.primary} />
                <Text style={styles.benefitText}>Calculate local delivery times</Text>
            </View>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleAllow}
        >
            <Text style={styles.primaryButtonText}>Use Current Location</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleDecline}
        >
            <Text style={styles.secondaryButtonText}>Enter Manually</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
  },
  iconContainer: {
      position: 'relative',
      width: 150,
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 32,
  },
  pulseCircle: {
      position: 'absolute',
      backgroundColor: COLORS.primary,
      borderRadius: 100,
  },
  mainIconCircle: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: 'rgba(0,102,255,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  verifiedBadge: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#fff',
      padding: 6,
      borderRadius: 20,
      ...getShadow('#000', { width: 0, height: 2 }, 0.1, 4, 3),
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#111418',
      textAlign: 'center',
      marginBottom: 16,
  },
  description: {
      fontSize: 16,
      color: '#60758a',
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 40,
  },
  benefits: {
      width: '100%',
      gap: 16,
  },
  benefitItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      backgroundColor: '#F9FAFB',
      padding: 16,
      borderRadius: 16,
  },
  benefitText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#374151',
  },
  footer: {
      padding: 24,
      gap: 12,
  },
  primaryButton: {
      width: '100%',
      height: 56,
      backgroundColor: COLORS.primary,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      ...getShadow(COLORS.primary, { width: 0, height: 4 }, 0.2, 8, 4),
  },
  primaryButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
  },
  secondaryButton: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
  },
  secondaryButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#60758a',
  }
});
