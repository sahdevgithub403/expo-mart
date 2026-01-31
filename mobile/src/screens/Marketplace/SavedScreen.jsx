import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { ProductCard } from '../../components/ProductCard';

export default function SavedScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  // Dummy Data (in real app, fetched from context/store)
  const products = []; // Empty for now to show empty state as per source desire

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <Text style={styles.title}>Saved Items</Text>
        <Text style={styles.subtitle}>Tracking {products.length} items</Text>
        
        <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#9E9E9E" />
            <TextInput
                style={styles.searchInput}
                placeholder="Search saved items..."
                value={search}
                onChangeText={setSearch}
            />
        </View>
      </View>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
            {filtered.length > 0 ? (
                 <View style={styles.grid}>
                    {filtered.map((item) => (
                        <ProductCard 
                            key={item.id} 
                            product={item} 
                            onPress={() => navigation.navigate('Details', { product: item })} 
                        />
                    ))}
                 </View>
            ) : (
                <View style={styles.emptyState}>
                    <View style={styles.emptyIconCircle}>
                         <Ionicons name="heart-outline" size={48} color="#E0E0E0" />
                    </View>
                    <Text style={styles.emptyTitle}>No saved items found</Text>
                    <Text style={styles.emptySubtitle}>Save listings you're interested in to easily find them later and get price drop alerts.</Text>
                    
                    <TouchableOpacity 
                        style={styles.exploreBtn}
                        onPress={() => navigation.navigate('Marketplace')}
                    >
                        <Text style={styles.exploreBtnText}>Start Exploring</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
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
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#111418',
  },
  subtitle: {
      fontSize: 14,
      color: '#60758a',
      marginBottom: 16,
  },
  searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      paddingHorizontal: 16,
      height: 52,
  },
  searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 14,
      color: '#111418',
  },
  content: {
      flex: 1,
  },
  grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 16,
  },
  emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
      marginTop: 60,
  },
  emptyIconCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
  },
  emptyTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#111418',
      marginBottom: 8,
  },
  emptySubtitle: {
      fontSize: 14,
      color: '#60758a',
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 32,
  },
  exploreBtn: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 32,
      paddingVertical: 14,
      borderRadius: 16,
      ...getShadow(COLORS.primary, { width: 0, height: 4 }, 0.2, 8, 4),
  },
  exploreBtnText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  }
});
