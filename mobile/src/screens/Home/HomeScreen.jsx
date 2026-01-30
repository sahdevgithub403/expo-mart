import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Platform, ActivityIndicator, RefreshControl } from 'react-native';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ProductService } from '../../services/productService';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Stanford Campus');

  const categories = [
    { id: '1', label: 'Cars', icon: 'car-sport', value: 'Vehicles' },
    { id: '2', label: 'Phones', icon: 'phone-portrait', value: 'Electronics' },
    { id: '3', label: 'Agri', icon: 'leaf', value: 'Farmer' },
    { id: '4', label: 'Student', icon: 'school', value: 'Student' },
    { id: '5', label: 'Books', icon: 'book', value: 'Books' },
    { id: '6', label: 'Bikes', icon: 'bicycle', value: 'Bikes' },
    { id: '7', label: 'Services', icon: 'construct', value: 'Services' },
    { id: '8', label: 'More', icon: 'grid', value: 'Others' },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getAllProducts();
      if (Array.isArray(data)) {
        setProducts(data.slice(0, 4)); 
      } else {
        setProducts([]);
      }
      
      // Try to get location
      if (Platform.OS !== 'web') {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
              let loc = await Location.getCurrentPositionAsync({});
              let reverse = await Location.reverseGeocodeAsync(loc.coords);
              if (reverse.length > 0) {
                  setCurrentLocation(reverse[0].city || reverse[0].name || 'Detected Location');
              }
          }
      }
    } catch (error) {
      console.error('Home data fetch error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // The provided instruction's useEffect dependency array change seems to be for a different context, keeping original.

  const handleCategoryPress = (cat) => {
    if (['Farmer', 'Student', 'Services'].includes(cat.label) || ['Farmer', 'Student', 'Services'].includes(cat.value)) {
        const hubType = (cat.value === 'Services' || cat.label === 'Services') ? 'service' : cat.value.toLowerCase();
        navigation.navigate('SpecializedHub', { type: hubType });
    } else {
        navigation.navigate('Marketplace', { category: cat.value });
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationRow}>
            <View style={styles.locationWrapper}>
                <Ionicons name="location" size={20} color={COLORS.primary} />
                <View>
                    <Text style={styles.locationLabel}>Current Location</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.locationText}>{currentLocation}</Text>
                        <Ionicons name="chevron-down" size={14} color="#60758a" style={{marginLeft: 4}} />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
                <Ionicons name="notifications-outline" size={24} color="#1E293B" />
                <View style={styles.badgetDot} />
            </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
            <TouchableOpacity 
                style={styles.searchBar}
                onPress={() => navigation.navigate('Marketplace')}
            >
                <Ionicons name="search" size={20} color="#94A3B8" />
                <Text style={styles.searchPlaceholder}>Find Cars, Mobile Phones and more...</Text>
            </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{paddingBottom: 100}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
          {/* Banner */}
          <View style={styles.bannerContainer}>
              <LinearGradient
                  colors={[COLORS.primary, '#2563EB']}
                  style={styles.banner}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
              >
                  <View style={styles.bannerContent}>
                      <Text style={styles.bannerTitle}>Campus Verified Only</Text>
                      <Text style={styles.bannerSubtitle}>SAFE TRADING WITHIN COMMUNITY</Text>
                      <TouchableOpacity 
                        style={styles.bannerBtn}
                        onPress={() => navigation.navigate('Marketplace')}
                      >
                          <Text style={styles.bannerBtnText}>EXPLORE NOW</Text>
                      </TouchableOpacity>
                  </View>
                  <Ionicons name="shield-checkmark" size={100} color="rgba(255,255,255,0.2)" style={styles.bannerIcon} />
              </LinearGradient>
          </View>

          {/* Categories */}
          <View style={styles.section}>
              <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Browse categories</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Marketplace')}>
                       <Text style={styles.seeAllText}>View All</Text>
                  </TouchableOpacity>
              </View>
              
              <View style={styles.categoryGrid}>
                  {categories.map(cat => (
                      <TouchableOpacity 
                        key={cat.id} 
                        style={styles.catItem}
                        onPress={() => handleCategoryPress(cat)}
                      >
                          <View style={styles.catIconCircle}>
                              <Ionicons name={cat.icon} size={24} color={COLORS.primary} />
                          </View>
                          <Text style={styles.catLabel}>{cat.label}</Text>
                      </TouchableOpacity>
                  ))}
              </View>
          </View>

           {/* Community Hubs */}
           <View style={styles.section}>
               <View style={styles.sectionHeader}>
                   <Text style={styles.sectionTitle}>Community Hubs</Text>
               </View>
               <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hubScroll}>
                   <TouchableOpacity style={styles.hubCard} onPress={() => navigation.navigate('SpecializedHub', { type: 'farmer' })}>
                       <LinearGradient colors={['#10B981', '#059669']} style={styles.hubGradient}>
                           <Ionicons name="leaf" size={28} color="#fff" />
                           <Text style={styles.hubTitle}>Farmer Market</Text>
                           <Text style={styles.hubSubtitle}>Agri-Tools & Crops</Text>
                       </LinearGradient>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.hubCard} onPress={() => navigation.navigate('SpecializedHub', { type: 'student' })}>
                       <LinearGradient colors={['#8B5CF6', '#7C3AED']} style={styles.hubGradient}>
                           <Ionicons name="school" size={28} color="#fff" />
                           <Text style={styles.hubTitle}>Student Hub</Text>
                           <Text style={styles.hubSubtitle}>Books & Tutoring</Text>
                       </LinearGradient>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.hubCard} onPress={() => navigation.navigate('SpecializedHub', { type: 'service' })}>
                       <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.hubGradient}>
                           <Ionicons name="construct" size={28} color="#fff" />
                           <Text style={styles.hubTitle}>Service Center</Text>
                           <Text style={styles.hubSubtitle}>Hire Professionals</Text>
                       </LinearGradient>
                   </TouchableOpacity>
               </ScrollView>
           </View>
          {/* Recommendations */}
          <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Fresh recommendations</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Marketplace')}>
                    <Ionicons name="arrow-forward" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              
              {loading ? (
                  <ActivityIndicator color={COLORS.primary} style={{marginTop: 20}} />
              ) : (
                  <View style={styles.recGrid}>
                      {products.map(item => (
                          <TouchableOpacity 
                            key={item.id} 
                            style={styles.recCard}
                            onPress={() => navigation.navigate('Details', { product: item })}
                          >
                              <View style={styles.recImageWrapper}>
                                  <Image source={{uri: item.imageUrl || 'https://via.placeholder.com/150'}} style={styles.recImage} />
                                  <TouchableOpacity style={styles.favBtn}>
                                      <Ionicons name="heart-outline" size={20} color="#1E293B" />
                                  </TouchableOpacity>
                              </View>
                              <View style={styles.recContent}>
                                  <Text style={styles.recPrice}>${item.price}</Text>
                                  <Text style={styles.recTitle} numberOfLines={1}>{item.title}</Text>
                                  <View style={styles.recMeta}>
                                      <Text style={styles.recLoc} numberOfLines={1}>{item.location}</Text>
                                  </View>
                              </View>
                          </TouchableOpacity>
                      ))}
                      {products.length === 0 && (
                          <View style={styles.emptyContainer}>
                              <Text style={styles.emptyText}>No listings found. Be the first to post!</Text>
                              <TouchableOpacity style={styles.postNowBtn} onPress={() => navigation.navigate('PostListing')}>
                                  <Text style={styles.postNowText}>Post Now</Text>
                              </TouchableOpacity>
                          </View>
                      )}
                  </View>
              )}
          </View>

          {/* Safe Trading Tip */}
          <View style={styles.tipCard}>
              <View style={styles.tipIcon}>
                  <Ionicons name="shield-checkmark" size={24} color="#fff" />
              </View>
              <View style={{flex: 1}}>
                  <Text style={styles.tipTitle}>Transaction Safety</Text>
                  <Text style={styles.tipDesc}>Always verify the item during pickup before releasing escrow funds.</Text>
              </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
      paddingBottom: 16,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#F1F5F9',
  },
  hubScroll: {
      paddingHorizontal: 16,
      gap: 12,
      paddingBottom: 8,
  },
  hubCard: {
      width: 160,
      height: 120,
      borderRadius: 20,
      overflow: 'hidden',
      ...getShadow('#000', { width: 0, height: 4 }, 0.1, 8, 4),
  },
  hubGradient: {
      flex: 1,
      padding: 16,
      justifyContent: 'flex-end',
  },
  hubTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 14,
      marginTop: 8,
  },
  hubSubtitle: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 10,
  },
  locationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
  },
  locationWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  locationLabel: {
      fontSize: 10,
      color: '#94A3B8',
      fontWeight: 'bold',
      textTransform: 'uppercase',
  },
  locationText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1E293B',
  },
  notifBtn: {
      position: 'relative',
      padding: 4,
  },
  badgetDot: {
      position: 'absolute',
      top: 4,
      right: 4,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#EF4444',
      borderWidth: 2,
      borderColor: '#fff',
  },
  searchContainer: {
      paddingHorizontal: 16,
  },
  searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F1F5F9',
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 48,
  },
  searchPlaceholder: {
      flex: 1,
      marginLeft: 12,
      fontSize: 14,
      color: '#94A3B8',
  },
  bannerContainer: {
      padding: 16,
  },
  banner: {
      borderRadius: 20,
      height: 150,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      position: 'relative',
      overflow: 'hidden',
  },
  bannerContent: {
      zIndex: 1,
      flex: 1,
  },
  bannerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
  },
  bannerSubtitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: 'rgba(255,255,255,0.8)',
      marginVertical: 6,
      letterSpacing: 1,
  },
  bannerBtn: {
      backgroundColor: '#fff',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 10,
      marginTop: 10,
      alignSelf: 'flex-start',
  },
  bannerBtnText: {
      color: COLORS.primary,
      fontSize: 11,
      fontWeight: 'bold',
  },
  bannerIcon: {
      position: 'absolute',
      right: -20,
      bottom: -20,
      transform: [{rotate: '-15deg'}],
  },
  section: {
      paddingVertical: 16,
  },
  sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 16,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1E293B',
  },
  seeAllText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLORS.primary,
      textTransform: 'uppercase',
  },
  categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 4,
  },
  catItem: {
      width: '25%',
      alignItems: 'center',
      marginBottom: 20,
  },
  catIconCircle: {
      width: 56,
      height: 56,
      borderRadius: 18,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#F1F5F9',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
      ...getShadow('#000', { width: 0, height: 2 }, 0.05, 4, 1),
  },
  catLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: '#475569',
  },
  recGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 12,
  },
  recCard: {
      width: (width - 48) / 2,
      backgroundColor: '#fff',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#F1F5F9',
      margin: 6,
      overflow: 'hidden',
  },
  recImageWrapper: {
      width: '100%',
      aspectRatio: 1,
      position: 'relative',
  },
  recImage: {
      width: '100%',
      height: '100%',
  },
  favBtn: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.9)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  recContent: {
      padding: 12,
  },
  recPrice: {
      fontSize: 18,
      fontWeight: '800',
      color: '#1E293B',
  },
  recTitle: {
      fontSize: 13,
      color: '#64748B',
      marginVertical: 4,
      fontWeight: '500',
  },
  recMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
  },
  recLoc: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#94A3B8',
      textTransform: 'uppercase',
      flex: 1,
  },
  emptyContainer: {
      width: '100%',
      padding: 40,
      alignItems: 'center',
  },
  emptyText: {
      color: '#94A3B8',
      textAlign: 'center',
      marginBottom: 16,
  },
  postNowBtn: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 12,
  },
  postNowText: {
      color: '#fff',
      fontWeight: 'bold',
  },
  tipCard: {
      margin: 16,
      padding: 20,
      backgroundColor: '#F0FDF4',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#DCFCE7',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
  },
  tipIcon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: '#16A34A',
      alignItems: 'center',
      justifyContent: 'center',
  },
  tipTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#166534',
  },
  tipDesc: {
      fontSize: 11,
      color: '#15803D',
      marginTop: 2,
  }
});
