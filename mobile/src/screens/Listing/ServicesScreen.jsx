import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity,  SafeAreaView, Image } from 'react-native';
import { COLORS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ServicesScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { label: 'Electrician', icon: 'flash' },
    { label: 'Plumber', icon: 'water' },
    { label: 'Tutor', icon: 'school' },
    { label: 'Cleaning', icon: 'sparkles' },
    { label: 'Carpenter', icon: 'hammer' },
    { label: 'Beauty', icon: 'rose' },
  ];

  const professionals = [
      { id: 1, name: "David Miller", title: "Master Electrician", rating: 4.9, reviews: 128, verified: true, category: 'Electrician', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: 2, name: "Sarah Jenkins", title: "Math Tutor", rating: 5.0, reviews: 45, verified: true, category: 'Tutor', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 3, name: "Mike Thorne", title: "Plumbing Expert", rating: 4.7, reviews: 89, verified: false, category: 'Plumber', image: 'https://randomuser.me/api/portraits/men/85.jpg' },
  ];

  const filtered = professionals.filter(pro => {
      const matchSearch = pro.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'All' || pro.category === activeCategory;
      return matchSearch && matchCat;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Local Services</Text>
            <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={24} color="#111418" />
            </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#9E9E9E" />
            <TextInput
                style={styles.searchInput}
                placeholder="Search for pros..."
                value={search}
                onChangeText={setSearch}
            />
            {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                    <Ionicons name="close-circle" size={18} color="#BDBDBD" />
                </TouchableOpacity>
            )}
        </View>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              {activeCategory !== 'All' && (
                  <TouchableOpacity onPress={() => setActiveCategory('All')}>
                      <Text style={styles.clearText}>Clear</Text>
                  </TouchableOpacity>
              )}
          </View>

          <View style={styles.categoryGrid}>
              {categories.map(cat => (
                  <TouchableOpacity 
                    key={cat.label} 
                    style={[styles.catCard, activeCategory === cat.label && styles.activeCatCard]}
                    onPress={() => setActiveCategory(activeCategory === cat.label ? 'All' : cat.label)}
                  >
                      <View style={styles.catIconCircle}>
                          <Ionicons name={cat.icon} size={24} color={activeCategory === cat.label ? COLORS.primary : '#111418'} />
                      </View>
                      <Text style={[styles.catText, activeCategory === cat.label && styles.activeCatText]}>{cat.label}</Text>
                  </TouchableOpacity>
              ))}
          </View>

          <View style={styles.listHeader}>
              <Text style={styles.listTitle}>
                  {activeCategory === 'All' ? 'Top Rated Pros' : `${activeCategory} Professionals`}
              </Text>
          </View>

          <View style={styles.list}>
              {filtered.map(pro => (
                  <View key={pro.id} style={styles.proCard}>
                      <View style={styles.proHeader}>
                          <View style={styles.proImageContainer}>
                              <Image source={{uri: pro.image}} style={styles.proImage} />
                              {pro.verified && (
                                  <View style={styles.verifiedBadge}>
                                      <Ionicons name="checkmark" size={10} color="#fff" />
                                  </View>
                              )}
                          </View>
                          <View style={{flex: 1, marginLeft: 12}}>
                              <Text style={styles.proName}>{pro.name}</Text>
                              <Text style={styles.proTitle}>{pro.title}</Text>
                              <View style={styles.ratingRow}>
                                  <View style={styles.ratingBadge}>
                                      <Ionicons name="star" size={10} color="#B45309" />
                                      <Text style={styles.ratingText}>{pro.rating}</Text>
                                  </View>
                                  <Text style={styles.reviewCount}>({pro.reviews} reviews)</Text>
                              </View>
                          </View>
                      </View>

                      <View style={styles.cardFooter}>
                          <View style={styles.escrowTag}>
                              <Ionicons name="shield-checkmark" size={14} color="green" />
                              <Text style={styles.escrowText}>Escrow Protected</Text>
                          </View>
                          <TouchableOpacity style={styles.bookBtn}>
                              <Text style={styles.bookBtnText}>Book Now</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              ))}
              {filtered.length === 0 && (
                  <Text style={styles.emptyText}>No professionals found.</Text>
              )}
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
  },
  headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
  },
  backBtn: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
  },
  headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111418',
  },
  searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 48,
  },
  searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
      color: '#111418',
  },
  sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
  },
  sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#111418',
      textTransform: 'uppercase',
      letterSpacing: 1,
  },
  clearText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLORS.primary,
      textTransform: 'uppercase',
  },
  categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 16,
      justifyContent: 'space-between',
      gap: 12,
  },
  catCard: {
      width: '31%',
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#F0F0F0',
      gap: 8,
  },
  activeCatCard: {
      borderColor: COLORS.primary,
      backgroundColor: 'rgba(0,102,255,0.02)',
  },
  catIconCircle: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
  },
  catText: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#111418',
  },
  activeCatText: {
      color: COLORS.primary,
  },
  listHeader: {
      padding: 16,
      paddingTop: 32,
  },
  listTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111418',
  },
  list: {
      paddingHorizontal: 16,
      gap: 16,
  },
  proCard: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: '#E0E0E0',
  },
  proHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
  },
  proImageContainer: {
      position: 'relative',
  },
  proImage: {
      width: 64,
      height: 64,
      borderRadius: 16,
      backgroundColor: '#F5F5F5',
  },
  verifiedBadge: {
      position: 'absolute',
      bottom: -4,
      right: -4,
      backgroundColor: COLORS.primary,
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#fff',
  },
  proName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#111418',
  },
  proTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: COLORS.primary,
      textTransform: 'uppercase',
      marginTop: 2,
  },
  ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      gap: 6,
  },
  ratingBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FEF3C7',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 6,
      gap: 2,
  },
  ratingText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#92400E',
  },
  reviewCount: {
      fontSize: 11,
      color: '#60758a',
  },
  cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: '#F5F5F5',
  },
  escrowTag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F0FDF4',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      gap: 4,
  },
  escrowText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#15803D',
      textTransform: 'uppercase',
  },
  bookBtn: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
  },
  bookBtnText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#fff',
  },
  emptyText: {
      textAlign: 'center',
      color: '#9E9E9E',
      marginTop: 20,
  }
});
