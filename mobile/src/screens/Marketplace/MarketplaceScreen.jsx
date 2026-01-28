import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { ProductCard } from '../../components/ProductCard';

export default function MarketplaceScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { icon: 'grid-outline', label: 'All' },
    { icon: 'book-outline', label: 'Books' },
    { icon: 'bicycle-outline', label: 'Cycles' },
    { icon: 'document-text-outline', label: 'Notes' },
    { icon: 'laptop-outline', label: 'Gadgets' },
    { icon: 'bed-outline', label: 'Dorm' },
  ];

  const products = [
      { id: '1', title: 'Sony XM4 Headphones', price: '$120', location: 'Stanford, CA', isFeatured: true, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop', category: 'Gadgets', verified: true },
      { id: '2', title: 'Trek Mountain Bike', price: '$450', location: 'Palo Alto', isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1470&auto=format&fit=crop', category: 'Cycles', verified: true },
      { id: '3', title: 'iPad Air 4th Gen', price: '$299', location: 'Menlo Park', isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1415&auto=format&fit=crop', category: 'Gadgets', verified: false },
      { id: '4', title: 'Canon EOS M50', price: '$350', location: 'Stanford, CA', isFeatured: true, imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop', category: 'Gadgets', verified: true },
  ];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backBtn}>
                <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.headerTitle}>TrustMart</Text>
                <Text style={styles.headerSubtitle}>CAMPUS MARKET</Text>
            </View>
            <View style={{width: 40}} /> 
        </View>

        <View style={styles.searchSection}>
             <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#9E9E9E" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search in Stanford Marketplace..."
                    value={search}
                    onChangeText={setSearch}
                />
             </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
            {categories.map((cat) => (
                <TouchableOpacity 
                    key={cat.label} 
                    style={[styles.categoryChip, activeCategory === cat.label && styles.activeChip]}
                    onPress={() => setActiveCategory(cat.label)}
                >
                    <Ionicons name={cat.icon} size={16} color={activeCategory === cat.label ? '#fff' : '#616161'} />
                    <Text style={[styles.categoryText, activeCategory === cat.label && styles.activeCategoryText]}>{cat.label}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        <View style={styles.listHeader}>
            <Text style={styles.listTitle}>
                {activeCategory === 'All' ? 'Recent Listings' : `${activeCategory} Listings`}
            </Text>
            <Text style={styles.listCount}>{filteredProducts.length} items found</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
            <View style={styles.grid}>
                 {filteredProducts.map((item) => (
                    <ProductCard 
                        key={item.id} 
                        product={item} 
                        onPress={() => navigation.navigate('Details', { product: item })} 
                    />
                 ))}
                 {filteredProducts.length === 0 && (
                     <View style={styles.emptyState}>
                         <View style={styles.emptyIconCircle}>
                            <Ionicons name="search" size={40} color="#BDBDBD" />
                         </View>
                         <Text style={styles.emptyTitle}>No results found</Text>
                         <Text style={styles.emptySubtitle}>Try adjusting your filters or search keywords.</Text>
                     </View>
                 )}
            </View>
        </ScrollView>
      </View>

      {/* Floating Add Button handled by Tab Navigator, but we can add one here if needed for specific flow */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
  },
  headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 8,
  },
  backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,102,255,0.1)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111418',
  },
  headerSubtitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: COLORS.primary,
      letterSpacing: 1,
  },
  searchSection: {
      paddingHorizontal: 16,
      marginVertical: 8,
  },
  searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 44,
  },
  searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 14,
      color: '#111418',
  },
  categoryList: {
      paddingHorizontal: 16,
      gap: 8,
      paddingVertical: 8,
  },
  categoryChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      gap: 6,
  },
  activeChip: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
  },
  categoryText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#616161',
  },
  activeCategoryText: {
      color: '#fff',
  },
  content: {
      flex: 1,
  },
  listHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 16,
  },
  listTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111418',
  },
  listCount: {
      fontSize: 12,
      color: '#9E9E9E',
  },
  grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
  },
  emptyState: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: 60,
  },
  emptyIconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
  },
  emptyTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111418',
      marginBottom: 4,
  },
  emptySubtitle: {
      fontSize: 14,
      color: '#757575',
  }
});
