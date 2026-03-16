import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';

export default function SearchBar({ placeholder = 'Where to?', onPress, editable = false }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.inner}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          editable={editable}
          pointerEvents={editable ? 'auto' : 'none'}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    height: 50,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
});
