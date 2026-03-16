import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  RefreshControl,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

import LocationHeader from '../../components/LocationHeader';
import SearchBar from '../../components/SearchBar';
import CategoryIcon from '../../components/CategoryIcon';
import ListingCard from '../../components/ListingCard';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../theme';

const { width } = Dimensions.get('window');

// Categories matching the reference
const CATEGORIES = [
  { id: '1', label: 'Hotels', icon: 'bed-outline', bgColor: '#FFE4E9' },
  { id: '2', label: 'Eats', icon: 'restaurant-outline', bgColor: '#FFE4E9' },
  { id: '3', label: 'Stays', icon: 'business-outline', bgColor: '#E0F4F4' },
  { id: '4', label: 'Cafes', icon: 'cafe-outline', bgColor: '#E0F8E9' },
];

// Best places data for horizontal scroll
const BEST_PLACES = [
  {
    id: '1',
    title: 'The Grand Meridian',
    rating: '4.8',
    distance: '0.8 miles away',
    badge: 'GUEST FAVORITE',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80',
  },
  {
    id: '2',
    title: 'Lumos Courtyard',
    rating: '4.6',
    distance: '1.2 miles away',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80',
  },
  {
    id: '3',
    title: 'Skyline Executive PG',
    rating: '4.9',
    distance: '0.5 miles away',
    badge: 'TOP RATED',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80',
  },
];

// Discover more grid
const DISCOVER_MORE = [
  {
    id: '1',
    title: 'Rooftop Bars',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
  },
  {
    id: '2',
    title: 'Street Food',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
  },
];

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Manhattan, New York');

  const fetchLocation = async () => {
    try {
      if (Platform.OS !== 'web') {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          let loc = await Location.getCurrentPositionAsync({});
          let reverse = await Location.reverseGeocodeAsync(loc.coords);
          if (reverse.length > 0) {
            const addr = reverse[0];
            const city = addr.city || addr.name || 'Current Location';
            const region = addr.region || '';
            setCurrentLocation(region ? `${city}, ${region}` : city);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchLocation();
    setTimeout(() => setRefreshing(false), 1500);
  };

  const navigateToCategory = (cat) => {
    navigation.navigate('Marketplace', { category: cat.label });
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 10) }]}>
      {/* Location Header */}
      <LocationHeader location={currentLocation} />

      {/* Search Bar */}
      <SearchBar placeholder="Where to?" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        {/* Categories Row */}
        <View style={styles.categoriesRow}>
          {CATEGORIES.map((cat) => (
            <CategoryIcon
              key={cat.id}
              icon={cat.icon}
              label={cat.label}
              bgColor={cat.bgColor}
              onPress={() => navigateToCategory(cat)}
            />
          ))}
        </View>

        {/* Best places near you */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best places near you</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={BEST_PLACES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListingCard
              image={item.image}
              title={item.title}
              rating={item.rating}
              distance={item.distance}
              badge={item.badge}
              onPress={() => navigation.navigate('Details')}
              horizontal
            />
          )}
          ItemSeparatorComponent={() => <View style={{ width: SPACING.md }} />}
        />

        {/* Discover more */}
        <View style={[styles.sectionHeader, { marginTop: SPACING.xl }]}>
          <Text style={styles.sectionTitle}>Discover more</Text>
        </View>

        <View style={styles.discoverGrid}>
          {DISCOVER_MORE.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.discoverCard}
              onPress={() => navigation.navigate('Details')}
              activeOpacity={0.85}
            >
              <Image source={{ uri: item.image }} style={styles.discoverImage} />
              <View style={styles.discoverOverlay} />
              <Text style={styles.discoverTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom spacer for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  horizontalList: {
    paddingHorizontal: SPACING.lg,
  },
  discoverGrid: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  discoverCard: {
    flex: 1,
    height: 140,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  discoverImage: {
    width: '100%',
    height: '100%',
  },
  discoverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: RADIUS.lg,
  },
  discoverTitle: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});
