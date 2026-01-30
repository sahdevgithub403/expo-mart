import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, TextInput, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, getShadow } from '../constants/theme';

export default function FilterModal({ visible, onClose, onApply, currentFilters }) {
  const [minPrice, setMinPrice] = useState(currentFilters?.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(currentFilters?.maxPrice?.toString() || '');
  const [condition, setCondition] = useState(currentFilters?.condition || 'All');
  const [postType, setPostType] = useState(currentFilters?.postType || 'All');
  const [sortBy, setSortBy] = useState(currentFilters?.sortBy || 'Newest');

  const conditions = ['All', 'New', 'Used', 'Refurbished'];
  const postTypes = ['All', 'product', 'service', 'farmer', 'student'];
  const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low'];

  const handleApply = () => {
    onApply({
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      condition,
      postType,
      sortBy
    });
    onClose();
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setCondition('All');
    setPostType('All');
    setSortBy('Newest');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#111418" />
            </TouchableOpacity>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Sort Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.chipGrid}>
                {sortOptions.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.chip, sortBy === option && styles.activeChip]}
                    onPress={() => setSortBy(option)}
                  >
                    <Text style={[styles.chipText, sortBy === option && styles.activeChipText]}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <View style={styles.priceRow}>
                <View style={styles.priceInputWrapper}>
                  <Text style={styles.currency}>$</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Min"
                    keyboardType="numeric"
                    value={minPrice}
                    onChangeText={setMinPrice}
                  />
                </View>
                <View style={styles.divider} />
                <View style={styles.priceInputWrapper}>
                  <Text style={styles.currency}>$</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Max"
                    keyboardType="numeric"
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                  />
                </View>
              </View>
            </View>

            {/* Condition */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Condition</Text>
              <View style={styles.chipGrid}>
                {conditions.map(c => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.chip, condition === c && styles.activeChip]}
                    onPress={() => setCondition(c)}
                  >
                    <Text style={[styles.chipText, condition === c && styles.activeChipText]}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Post Type */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Listing Type</Text>
              <View style={styles.chipGrid}>
                {postTypes.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.chip, postType === type && styles.activeChip]}
                    onPress={() => setPostType(type)}
                  >
                    <Text style={[styles.chipText, postType === type && styles.activeChipText]}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
              <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '85%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  closeBtn: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  resetText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  activeChipText: {
    color: '#fff',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  currency: {
    fontSize: 14,
    color: '#94A3B8',
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
  },
  divider: {
    width: 10,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  applyBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...getShadow(COLORS.primary, { width: 0, height: 4 }, 0.2, 8, 4),
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
