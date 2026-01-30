import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
import { COLORS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { ProductCard } from '../../components/ProductCard';
import { ProductService } from '../../services/productService';

export default function MarketplaceScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    { icon: 'grid-outline', label: 'All' },
    { icon: 'laptop-outline', label: 'Electronics' },
    { icon: 'car-outline', label: 'Vehicles' },
    { icon: 'bicycle-outline', label: 'Bikes' },
    { icon: 'book-outline', label: 'Books' },
    { icon: 'bed-outline', label: 'Furniture' },
    { icon: 'shirt-outline', label: 'Fashion' },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.headerTitle}>TrustMart</Text>
                <Text style={styles.headerSubtitle}>CAMPUS MARKET</Text>
            </View>
            <TouchableOpacity onPress={onRefresh} style={styles.refreshBtn}>
                <Ionicons name="refresh" size={20} color={COLORS.primary} />
            </TouchableOpacity>
        </View>

        <View style={styles.searchSection}>
             <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#9E9E9E" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for items..."
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
        {loading ? (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        ) : (
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{paddingBottom: 100}}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>
                        {activeCategory === 'All' ? 'Recent Listings' : `${activeCategory} Listings`}
                    </Text>
                    <Text style={styles.listCount}>{filteredProducts.length} items found</Text>
                </View>

                <View style={styles.grid}>
                    {filteredProducts.map((item) => (
                        <ProductCard 
                            key={item.id} 
                            product={{
                                ...item,
                                image: item.imageUrl // Normalize for ProductCard
                            }} 
                            onPress={() => navigation.navigate('Details', { product: item })} 
                        />
                    ))}
                </View>

                {filteredProducts.length === 0 && (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconCircle}>
                            <Ionicons name="search" size={40} color="#BDBDBD" />
                        </View>
                        <Text style={styles.emptyTitle}>No results found</Text>
                        <Text style={styles.emptySubtitle}>Try adjusting your filters or search keywords.</Text>
                        <TouchableOpacity style={styles.resetBtn} onPress={() => {setSearch(''); setActiveCategory('All')}}>
                            <Text style={styles.resetBtnText}>Clear all filters</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        )}
      </View>
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
      backgroundColor: 'rgba(0,102,255,0.05)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  refreshBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1E293B',
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
      backgroundColor: '#F1F5F9',
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 44,
  },
  searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 14,
      color: '#1E293B',
  },
  categoryList: {
      paddingHorizontal: 16,
      gap: 8,
      paddingVertical: 8,
  },
  categoryChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#E2E8F0',
      gap: 6,
  },
  activeChip: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
  },
  categoryText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#64748B',
  },
  activeCategoryText: {
      color: '#fff',
  },
  content: {
      flex: 1,
  },
  center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
      color: '#1E293B',
  },
  listCount: {
      fontSize: 12,
      color: '#94A3B8',
  },
  grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 8,
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
      backgroundColor: '#F1F5F9',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
  },
  emptyTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1E293B',
      marginBottom: 4,
  },
  emptySubtitle: {
      fontSize: 14,
      color: '#64748B',
      textAlign: 'center',
      paddingHorizontal: 40,
      marginBottom: 20,
  },
  resetBtn: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: COLORS.primary,
  },
  resetBtnText: {
      color: COLORS.primary,
      fontWeight: 'bold',
  }
});
