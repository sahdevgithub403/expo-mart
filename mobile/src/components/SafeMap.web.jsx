import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SafeMap({ style }) {
  return (
    <View style={[style, styles.webPlaceholder]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📍</Text>
      </View>
      <Text style={styles.webText}>Maps Preview</Text>
      <Text style={styles.webSubText}>
        Map features are optimized for our Mobile App.
      </Text>
      <View style={styles.actionButton}>
        <Text style={styles.actionText}>Available on iOS & Android</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webPlaceholder: {
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    borderStyle: 'dashed',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
  },
  webText: {
    color: '#1E293B',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  webSubText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: '80%',
  },
  actionButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  }
});
