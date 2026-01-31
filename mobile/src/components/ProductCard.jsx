import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, getShadow } from '../constants/theme';

export function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.imageUrl || product.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        {product.verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
            <Text style={styles.verifiedText}>VERIFIED</Text>
          </View>
        )}
        <TouchableOpacity style={styles.favoriteBtn}>
          <Ionicons name="heart-outline" size={20} color="#111418" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="location" size={11} color="#9E9E9E" />
          <Text style={styles.location} numberOfLines={1}>{product.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
    ...getShadow('#000', { width: 0, height: 2 }, 0.05, 4, 2),
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4/5,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111418',
  },
  favoriteBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...getShadow('#000', { width: 0, height: 2 }, 0.1, 4, 2),
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111418',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 10,
    color: '#9E9E9E',
    fontWeight: '500',
    flex: 1,
  }
});
