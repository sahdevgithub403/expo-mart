import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SafeMap from '../../components/SafeMap';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

export default function DetailsScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { product } = route.params;
  const [isSaved, setIsSaved] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  // Fallback defaults
  const title = product?.title || 'Product Details';
  const price = typeof product?.price === 'number' ? `₹${product.price}` : product?.price || '₹0.00';
  const imgUrl = product?.image || product?.imageUrl || 'https://via.placeholder.com/300';
  const locationName = product?.location || 'Unknown Location';
  const seller = product?.seller?.name || product?.seller || 'Unknown Seller';
  const category = product?.category || 'General';
  const description = product?.description || `Authentic ${title} from a verified student seller. In excellent condition, barely used. Perfect for anyone looking for quality items at a student-friendly price.`;
  
  const latitude = product?.latitude || 37.4275;
  const longitude = product?.longitude || -122.1697;

  useEffect(() => {
    const getDistance = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let loc = await Location.getCurrentPositionAsync({});
                setUserLocation(loc.coords);
                
                if (product?.latitude && product?.longitude) {
                    const dist = calculateDistance(
                        loc.coords.latitude,
                        loc.coords.longitude,
                        product.latitude,
                        product.longitude
                    );
                    setDistance(dist.toFixed(1));
                }
            }
        } catch (e) {
            console.log('Distance calculation skipped');
        }
    };
    getDistance();
  }, [product]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return (
    <View style={styles.container}>
      {/* Absolute Header with safe inset */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleBtn}>
            <Ionicons name="chevron-back" size={24} color="#111418" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Details</Text>
        <TouchableOpacity onPress={() => setIsSaved(!isSaved)} style={styles.circleBtn}>
            <Ionicons name={isSaved ? "heart" : "heart-outline"} size={24} color={isSaved ? COLORS.primary : "#111418"} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 120}} showsVerticalScrollIndicator={false}>
          {/* Hero Image */}
          <View style={styles.imageContainer}>
              <Image source={{uri: imgUrl}} style={styles.heroImage} resizeMode="cover" />
              <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.imageGradient}
              />
              <View style={styles.badgeContainer}>
                  <View style={styles.categoryBadge}>
                      <Text style={styles.badgeText}>{category.toUpperCase()}</Text>
                  </View>
                  {distance && (
                     <View style={styles.distanceBadge}>
                        <Ionicons name="map" size={12} color="#fff" />
                        <Text style={styles.badgeText}>{distance} km away</Text>
                     </View>
                  )}
              </View>
          </View>

          <View style={styles.content}>
              <View style={styles.titleRow}>
                  <View style={{flex: 1}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.price}>{price}</Text>
                  </View>
                  <View style={styles.conditionTag}>
                      <Text style={styles.conditionText}>{product?.condition || 'Used'}</Text>
                  </View>
              </View>

              <View style={styles.metaRow}>
                  <Ionicons name="location" size={16} color={COLORS.primary} />
                  <Text style={styles.metaText}>{locationName}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaText}>Posted Today</Text>
              </View>

              <View style={styles.divider} />

              {/* Specialized Info */}
              {(product?.postType === 'service' || product?.postType === 'farmer' || product?.postType === 'student') && (
                  <View style={styles.specContainer}>
                      <View style={styles.specGrid}>
                          {product.postType === 'service' && (
                              <>
                                  <View style={styles.specItem}>
                                      <Text style={styles.specLabel}>Experience</Text>
                                      <Text style={styles.specValue}>{product.experience} Years</Text>
                                  </View>
                                  <View style={styles.specItem}>
                                      <Text style={styles.specLabel}>Level</Text>
                                      <Text style={styles.specValue}>{product.skillLevel}</Text>
                                  </View>
                              </>
                          )}
                          {product.postType === 'farmer' && (
                              <>
                                  <View style={styles.specItem}>
                                      <Text style={styles.specLabel}>Quantity</Text>
                                      <Text style={styles.specValue}>{product.quantity} {product.unit}</Text>
                                  </View>
                                  <View style={styles.specItem}>
                                      <Text style={styles.specLabel}>Harvest</Text>
                                      <Text style={styles.specValue}>{product.harvestDate}</Text>
                                  </View>
                              </>
                          )}
                          {product.postType === 'student' && (
                              <>
                                  <View style={styles.specItem}>
                                      <Text style={styles.specLabel}>Institution</Text>
                                      <Text style={styles.specValue} numberOfLines={1}>{product.institution}</Text>
                                  </View>
                                  <View style={styles.specItem}>
                                      <Text style={styles.specLabel}>Type</Text>
                                      <Text style={styles.specValue}>{product.documentType}</Text>
                                  </View>
                              </>
                          )}
                      </View>
                  </View>
              )}

              {/* Seller Card */}
              <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Seller Information</Text>
              </View>
              <TouchableOpacity style={styles.sellerCard}>
                  <View style={styles.sellerRow}>
                      <View style={styles.avatarContainer}>
                          <Ionicons name="person" size={24} color={COLORS.primary} />
                      </View>
                      <View style={{flex: 1}}>
                          <Text style={styles.sellerName}>{seller}</Text>
                          <View style={styles.ratingRow}>
                              <Ionicons name="star" size={12} color="#EAB308" />
                              <Text style={styles.ratingText}>4.8 • Student Member</Text>
                          </View>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
                  </View>
              </TouchableOpacity>

              {/* Description */}
              <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Description</Text>
                  <Text style={styles.descText}>{description}</Text>
              </View>

              {/* Location Map */}
              <View style={styles.section}>
                  <View style={styles.locationHeader}>
                      <Text style={styles.sectionTitle}>Meetup Location</Text>
                      <Text style={styles.locationSubText}>{locationName}</Text>
                  </View>
                  <View style={styles.mapContainer}>
                      <SafeMap
                        style={styles.map}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        coords={{ latitude, longitude }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                      />
                      <View style={styles.mapOverlay}>
                          <TouchableOpacity 
                            style={styles.expandMapBtn}
                            onPress={() => {}} // Could open full map
                          >
                            <Ionicons name="expand" size={16} color="#fff" />
                            <Text style={styles.expandMapText}>Full View</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>

              {/* Secure Box */}
              <View style={styles.secureBox}>
                  <View style={styles.secureIcon}>
                      <Ionicons name="shield-checkmark" size={24} color={COLORS.primary} />
                  </View>
                  <View style={{flex: 1}}>
                      <Text style={styles.secureTitle}>Safe Pay Escrow Active</Text>
                      <Text style={styles.secureDesc}>Protect your money. Funds are only released to the seller once you verify the item in person.</Text>
                  </View>
              </View>
          </View>
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity 
            style={styles.chatBtn}
            onPress={() => navigation.navigate('Chat', { product })}
          >
              <Ionicons name="chatbubble-ellipses" size={24} color="#1E293B" />
              <Text style={styles.chatText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buyBtn}
            onPress={() => navigation.navigate('EscrowStatus', { product })}
          >
              <Text style={styles.buyBtnText}>Buy Now</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'ios' ? 50 : 20,
      paddingBottom: 10,
  },
  headerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      textShadowColor: 'rgba(0,0,0,0.5)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 4,
  },
  circleBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.9)',
      alignItems: 'center',
      justifyContent: 'center',
      ...getShadow('#000', { width: 0, height: 2 }, 0.1, 4, 1),
  },
  imageContainer: {
      height: 400,
      width: '100%',
      position: 'relative',
  },
  heroImage: {
      width: '100%',
      height: '100%',
  },
  imageGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 120,
  },
  badgeContainer: {
      position: 'absolute',
      bottom: 40,
      left: 20,
      flexDirection: 'row',
      gap: 10,
  },
  categoryBadge: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.3)',
  },
  distanceBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#fff',
      letterSpacing: 1,
  },
  content: {
      padding: 24,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: -30,
  },
  titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 12,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1E293B',
      marginBottom: 4,
  },
  price: {
      fontSize: 28,
      fontWeight: '800',
      color: COLORS.primary,
  },
  conditionTag: {
      backgroundColor: '#F1F5F9',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
  },
  conditionText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#64748B',
  },
  metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 20,
  },
  metaText: {
      fontSize: 14,
      color: '#64748B',
      fontWeight: '500',
  },
  metaDot: {
      color: '#CBD5E1',
      fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 16,
  },
  specContainer: {
      backgroundColor: '#F8FAFC',
      padding: 16,
      borderRadius: 16,
      marginBottom: 20,
  },
  specGrid: {
      flexDirection: 'row',
      justifyContent: 'space-around',
  },
  specItem: {
      alignItems: 'center',
      flex: 1,
  },
  specLabel: {
      fontSize: 10,
      color: '#64748B',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: 4,
  },
  specValue: {
      fontSize: 14,
      color: '#1E293B',
      fontWeight: 'bold',
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1E293B',
  },
  sellerCard: {
      padding: 16,
      backgroundColor: '#F8FAFC',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#F1F5F9',
      marginBottom: 24,
  },
  sellerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  avatarContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#E2E8F0',
  },
  sellerName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1E293B',
  },
  ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  ratingText: {
      fontSize: 12,
      color: '#64748B',
      fontWeight: '500',
  },
  section: {
      marginBottom: 24,
  },
  descText: {
      fontSize: 15,
      color: '#64748B',
      lineHeight: 24,
      marginTop: 8,
  },
  locationHeader: {
      marginBottom: 12,
  },
  locationSubText: {
      fontSize: 13,
      color: '#64748B',
      marginTop: 2,
  },
  mapContainer: {
      height: 180,
      borderRadius: 16,
      overflow: 'hidden',
      position: 'relative',
      borderWidth: 1,
      borderColor: '#F1F5F9',
  },
  map: {
      flex: 1,
  },
  mapOverlay: {
      position: 'absolute',
      bottom: 12,
      right: 12,
  },
  expandMapBtn: {
      backgroundColor: 'rgba(30,41,59,0.7)',
      height: 32,
      paddingHorizontal: 12,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
  },
  expandMapText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#fff',
  },
  secureBox: {
      backgroundColor: '#F0F9FF',
      borderRadius: 16,
      padding: 18,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      borderWidth: 1,
      borderColor: '#BAE6FD',
  },
  secureIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      ...getShadow('#0369A1', { width: 0, height: 2 }, 0.1, 4, 1),
  },
  secureTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#0369A1',
  },
  secureDesc: {
      fontSize: 11,
      color: '#0C4A6E',
      lineHeight: 16,
      marginTop: 4,
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      padding: 16,
      paddingBottom: Platform.OS === 'ios' ? 32 : 16,
      borderTopWidth: 1,
      borderTopColor: '#F1F5F9',
      flexDirection: 'row',
      gap: 16,
      ...getShadow('#000', { width: 0, height: -10 }, 0.05, 20, 0),
  },
  chatBtn: {
      width: 64,
      height: 56,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F8FAFC',
  },
  chatText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#1E293B',
      marginTop: 2,
  },
  buyBtn: {
      flex: 1,
      backgroundColor: COLORS.primary,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      height: 56,
      ...getShadow(COLORS.primary, { width: 0, height: 4 }, 0.3, 12, 4),
  },
  buyBtnText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
  }
});
