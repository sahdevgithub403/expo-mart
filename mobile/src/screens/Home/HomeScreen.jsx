import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Platform } from 'react-native';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  
  const categories = [
    { id: '1', label: 'Cars', icon: 'car-sport' },
    { id: '2', label: 'Phones', icon: 'phone-portrait' },
    { id: '3', label: 'Books', icon: 'book' },
    { id: '4', label: 'Cycles', icon: 'bicycle' },
    { id: '5', label: 'Jobs', icon: 'briefcase' },
    { id: '6', label: 'Dorm', icon: 'bed' },
    { id: '7', label: 'Services', icon: 'construct' },
    { id: '8', label: 'More', icon: 'grid' },
  ];

  // Dummy Data for Home
  const recommended = [
    { id: 'd1', title: 'Sony XM4 Headphones', price: '$120', location: 'Stanford, CA', time: 'TODAY', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop', seller: 'Arjun Sharma' },
    { id: 'd2', title: 'Trek Mountain Bike', price: '$450', location: 'Palo Alto', time: 'YESTERDAY', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1470&auto=format&fit=crop', seller: 'Mike Ross' },
  ];

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
                        <Text style={styles.locationText}>Stanford Campus</Text>
                        <Ionicons name="chevron-down" size={14} color="#60758a" style={{marginLeft: 4}} />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
                <Ionicons name="notifications-outline" size={24} color="#111418" />
                <View style={styles.badgetDot} />
            </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#9E9E9E" />
                <TextInput 
                    placeholder="Find Cars, Mobile Phones and more..."
                    style={styles.searchInput}
                    placeholderTextColor="#9E9E9E"
                />
            </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
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
                      <Text style={styles.bannerSubtitle}>SAFE TRADING</Text>
                      <TouchableOpacity style={styles.bannerBtn}>
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
                        onPress={() => {
                            if (cat.label === 'Services') {
                                navigation.navigate('Services');
                            } else {
                                navigation.navigate('Marketplace');
                            }
                        }}
                      >
                          <View style={styles.catIconCircle}>
                              <Ionicons name={cat.icon} size={24} color={COLORS.primary} />
                          </View>
                          <Text style={styles.catLabel}>{cat.label}</Text>
                      </TouchableOpacity>
                  ))}
              </View>
          </View>

          {/* Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft: 16, marginVertical: 8}}>
              {['Recommended', 'Near You', 'New Arrivals', 'Low Price'].map((chip, idx) => (
                  <TouchableOpacity 
                    key={chip} 
                    style={[styles.chip, idx === 0 && styles.activeChip]}
                  >
                      <Text style={[styles.chipText, idx === 0 && styles.activeChipText]}>{chip}</Text>
                  </TouchableOpacity>
              ))}
              <View style={{width: 32}} />
          </ScrollView>

          {/* Recommendations */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Fresh recommendations</Text>
              
              <View style={styles.recGrid}>
                  {recommended.map(item => (
                      <TouchableOpacity 
                        key={item.id} 
                        style={styles.recCard}
                        onPress={() => navigation.navigate('Details', { product: item })}
                      >
                          <View style={styles.recImageWrapper}>
                              <Image source={{uri: item.image}} style={styles.recImage} />
                              <TouchableOpacity style={styles.favBtn}>
                                  <Ionicons name="heart-outline" size={20} color="#111418" />
                              </TouchableOpacity>
                          </View>
                          <View style={styles.recContent}>
                              <Text style={styles.recPrice}>{item.price}</Text>
                              <Text style={styles.recTitle} numberOfLines={1}>{item.title}</Text>
                              <View style={styles.recMeta}>
                                  <Text style={styles.recLoc} numberOfLines={1}>{item.location}</Text>
                                  <Text style={styles.recTime}>{item.time}</Text>
                              </View>
                          </View>
                      </TouchableOpacity>
                  ))}
              </View>
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
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
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
      color: '#60758a',
      fontWeight: 'bold',
      textTransform: 'uppercase',
  },
  locationText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#111418',
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
      borderWidth: 1,
      borderColor: '#fff',
  },
  searchContainer: {
      paddingHorizontal: 16,
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
      marginLeft: 12,
      fontSize: 14,
      color: '#111418',
  },
  bannerContainer: {
      padding: 16,
  },
  banner: {
      borderRadius: 16,
      height: 140,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      position: 'relative',
      overflow: 'hidden',
  },
  bannerContent: {
      zIndex: 1,
  },
  bannerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
  },
  bannerSubtitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: 'rgba(255,255,255,0.8)',
      marginVertical: 4,
      letterSpacing: 1,
  },
  bannerBtn: {
      backgroundColor: '#fff',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      marginTop: 8,
      alignSelf: 'flex-start',
  },
  bannerBtnText: {
      color: COLORS.primary,
      fontSize: 10,
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
      color: '#111418',
      paddingHorizontal: 16,
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
      paddingHorizontal: 8,
  },
  catItem: {
      width: '25%',
      alignItems: 'center',
      marginBottom: 16,
  },
  catIconCircle: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#fff', // or gray-50
      borderWidth: 1,
      borderColor: '#F0F0F0',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 6,
      ...getShadow('#000', { width: 0, height: 2 }, 0.05, 4, 2),
  },
  catLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#111418',
  },
  chip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      marginRight: 8,
      backgroundColor: '#fff',
  },
  activeChip: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
  },
  chipText: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#111418',
      textTransform: 'uppercase',
  },
  activeChipText: {
      color: '#fff',
  },
  recGrid: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      gap: 12,
      marginTop: 12,
  },
  recCard: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#F0F0F0',
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
      top: 8,
      right: 8,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  recContent: {
      padding: 12,
  },
  recPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#111418',
  },
  recTitle: {
      fontSize: 12,
      color: '#60758a',
      marginVertical: 2,
  },
  recMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
  },
  recLoc: {
      fontSize: 9,
      fontWeight: 'bold',
      color: '#9E9E9E',
      textTransform: 'uppercase',
      flex: 1,
  },
  recTime: {
      fontSize: 9,
      fontWeight: 'bold',
      color: '#9E9E9E',
      textTransform: 'uppercase',
  },
  tipCard: {
      margin: 16,
      padding: 16,
      backgroundColor: '#F0FDF4',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#DCFCE7',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  tipIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: '#16A34A',
      alignItems: 'center',
      justifyContent: 'center',
  },
  tipTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#111418',
  },
  tipDesc: {
      fontSize: 10,
      color: '#60758a',
      marginTop: 2,
  }
});
