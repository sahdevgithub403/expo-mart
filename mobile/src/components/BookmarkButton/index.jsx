import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme';

export default function BookmarkButton({ isBookmarked = false, onPress, size = 20, style }) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons
        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
        size={size}
        color={COLORS.white}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
