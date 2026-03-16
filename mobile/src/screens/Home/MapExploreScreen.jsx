import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MapView, Marker, PROVIDER_GOOGLE } from "../../components/MapComponents";

const { width, height } = Dimensions.get("window");

const MARKERS = [
  { id: "1", coordinate: { latitude: 37.78825, longitude: -122.4324 }, price: "$2,450", active: true },
  { id: "2", coordinate: { latitude: 37.79525, longitude: -122.4524 }, price: "$3,100", active: false },
  { id: "3", coordinate: { latitude: 37.77825, longitude: -122.4624 }, price: "$1,800", active: false },
  { id: "4", coordinate: { latitude: 37.76825, longitude: -122.4324 }, price: "$2,200", active: false },
];

export default function MapExploreScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={false}
      >
        {MARKERS.map((marker) => (
          <Marker key={marker.id} coordinate={marker.coordinate}>
            <View style={[styles.priceMarker, marker.active && styles.priceMarkerActive]}>
              <Text style={[styles.priceText, marker.active && styles.priceTextActive]}>
                {marker.price}
              </Text>
              <View style={[styles.triangle, marker.active && styles.triangleActive]} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Floating Header Components */}
      <View style={[styles.floatingHeader, { paddingTop: Math.max(insets.top, 50) }]}>
        
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for listings"
              placeholderTextColor="#94A3B8"
            />
            <View style={styles.verticalDivider} />
            <TouchableOpacity style={styles.filterBtn}>
                <Ionicons name="options-outline" size={18} color="#2563EB" />
                <Text style={styles.filterText}>Filters</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.crosshairBtn}>
            <Ionicons name="locate" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Price: Under $2k</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Type: Apartment</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>2+ Bedrooms</Text>
          </View>
        </ScrollView>
      </View>

      {/* Zoom Controls */}
      <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomBtn}>
              <Ionicons name="add" size={24} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.zoomDivider} />
          <TouchableOpacity style={styles.zoomBtn}>
              <Ionicons name="remove" size={24} color="#0F172A" />
          </TouchableOpacity>
      </View>

      {/* Floating Bottom Card */}
      <View style={styles.bottomCardContainer}>
        <View style={styles.cardIndicator} />
        
        <View style={styles.cardContent}>
            <Image 
                source={{ uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80" }} 
                style={styles.cardImage} 
            />
            <View style={styles.cardDetails}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle} numberOfLines={2}>Skyline Heights Luxury Suite</Text>
                    <Ionicons name="heart" size={22} color="#2563EB" />
                </View>
                
                <Text style={styles.cardLocation}>SOMA, San Francisco</Text>

                <View style={styles.metaRow}>
                    <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>NEW</Text>
                    </View>
                    <Ionicons name="bed" size={14} color="#475569" style={{marginLeft: 10}} />
                    <Text style={styles.metaText}>2</Text>
                    <Ionicons name="water" size={14} color="#475569" style={{marginLeft: 10}} />
                    <Text style={styles.metaText}>1</Text>
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.cardPrice}>$2,450</Text>
                    <Text style={styles.cardPriceUnit}>/mo</Text>
                    <View style={{flex: 1}} />
                    <TouchableOpacity style={styles.viewBtn}>
                        <Text style={styles.viewBtnText}>View Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 48,
    paddingLeft: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#0F172A",
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 8,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 4,
  },
  filterText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 4,
  },
  crosshairBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chipsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  priceMarker: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  priceMarkerActive: {
    backgroundColor: '#2563EB',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  priceTextActive: {
    color: '#FFFFFF',
  },
  triangle: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
  triangleActive: {
    borderTopColor: '#2563EB',
  },
  zoomControls: {
      position: 'absolute',
      right: 20,
      bottom: 270,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
  },
  zoomBtn: {
      padding: 12,
      alignItems: 'center',
  },
  zoomDivider: {
      height: 1,
      backgroundColor: '#E2E8F0',
      marginHorizontal: 10,
  },
  bottomCardContainer: {
    position: 'absolute',
    bottom: 80, // Leave room for bottom navigation tab
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  cardIndicator: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: '#E2E8F0',
      alignSelf: 'center',
      marginBottom: 16,
      marginTop: -4,
  },
  cardContent: {
      flexDirection: 'row',
  },
  cardImage: {
      width: 100,
      height: 100,
      borderRadius: 16,
  },
  cardDetails: {
      flex: 1,
      marginLeft: 16,
  },
  cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
  },
  cardTitle: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#0F172A',
      marginRight: 10,
  },
  cardLocation: {
      fontSize: 13,
      color: '#64748B',
      marginTop: 4,
  },
  metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
  },
  newBadge: {
      backgroundColor: '#EFF6FF',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
  },
  newBadgeText: {
      color: '#2563EB',
      fontSize: 10,
      fontWeight: '900',
  },
  metaText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#475569',
      marginLeft: 4,
  },
  priceRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginTop: 8,
  },
  cardPrice: {
      fontSize: 20,
      fontWeight: '900',
      color: '#2563EB',
  },
  cardPriceUnit: {
      fontSize: 12,
      fontWeight: '600',
      color: '#64748B',
      marginLeft: 2,
  },
  viewBtn: {
      backgroundColor: '#2563EB',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
  },
  viewBtnText: {
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: 'bold',
  }
});
