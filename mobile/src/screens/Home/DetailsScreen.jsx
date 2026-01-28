import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView, Dimensions, Platform } from 'react-native';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function DetailsScreen({ navigation, route }) {
  const { product } = route.params;
  const [isSaved, setIsSaved] = useState(false);

  // Fallback defaults
  const title = product?.title || 'Product Details';
  const price = product?.price || '$0.00';
  const imgUrl = product?.image || product?.imageUrl || 'https://via.placeholder.com/300';
  const location = product?.location || 'Unknown Location';
  const seller = product?.seller || 'Unknown Seller';
  const category = product?.category || 'General';

  return (
    <SafeAreaView style={styles.container}>
      {/* Absolute Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleBtn}>
            <Ionicons name="chevron-back" size={24} color="#111418" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <TouchableOpacity onPress={() => setIsSaved(!isSaved)} style={styles.circleBtn}>
            <Ionicons name={isSaved ? "heart" : "heart-outline"} size={24} color={isSaved ? COLORS.primary : "#111418"} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          {/* Hero Image */}
          <View style={styles.imageContainer}>
              <Image source={{uri: imgUrl}} style={styles.heroImage} resizeMode="cover" />
              <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.5)']}
                  style={styles.imageGradient}
              />
              <View style={styles.dotsContainer}>
                  <View style={[styles.dot, styles.activeDot]} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
              </View>
          </View>

          <View style={styles.content}>
              <View style={styles.titleRow}>
                  <Text style={styles.title}>{title}</Text>
                  {product?.verified && (
                      <View style={styles.verifiedTag}>
                          <Text style={styles.verifiedText}>Verified</Text>
                      </View>
                  )}
              </View>
              <Text style={styles.price}>{price}</Text>
              <View style={styles.metaRow}>
                  <Ionicons name="location" size={16} color="#60758a" />
                  <Text style={styles.metaText}>{location}</Text>
                  <Text style={styles.metaText}>•</Text>
                  <Text style={styles.metaText}>Posted Today</Text>
              </View>

              {/* Seller Card */}
              <View style={styles.sellerCard}>
                  <View style={styles.sellerRow}>
                      <View style={styles.avatarContainer}>
                          <Ionicons name="person" size={24} color={COLORS.primary} />
                          <View style={styles.onlineStatus} />
                      </View>
                      <View style={{flex: 1}}>
                          <Text style={styles.sellerName}>{seller}</Text>
                          <View style={styles.ratingRow}>
                              <Ionicons name="star" size={12} color="#EAB308" />
                              <Text style={styles.ratingText}>4.9 • Official Trusted Seller</Text>
                          </View>
                      </View>
                  </View>
                  <TouchableOpacity style={styles.viewProfileBtn}>
                      <Text style={styles.viewProfileText}>View Profile</Text>
                      <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
                  </TouchableOpacity>
              </View>

              {/* Secure Box */}
              <View style={styles.secureBox}>
                  <View style={styles.secureIcon}>
                      <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} />
                  </View>
                  <View style={{flex: 1}}>
                      <Text style={styles.secureTitle}>Safe Pay Escrow Active</Text>
                      <Text style={styles.secureDesc}>Funds are held securely and released only when you confirm receipt.</Text>
                  </View>
              </View>

              {/* Description */}
              <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Description</Text>
                  <Text style={styles.descText}>
                      Authentic {title} from a verified student seller. In excellent condition, barely used. Perfect for anyone looking for quality items at a student-friendly price. Includes all original documentation and verified by TrustMart team.
                  </Text>
              </View>

              {/* Meta Grid */}
              <View style={styles.grid}>
                  <View style={styles.gridItem}>
                      <Text style={styles.gridLabel}>CATEGORY</Text>
                      <Text style={styles.gridValue}>{category}</Text>
                  </View>
                  <View style={styles.gridItem}>
                      <Text style={styles.gridLabel}>SAFETY</Text>
                      <Text style={[styles.gridValue, {color: '#16A34A'}]}>High Trust</Text>
                  </View>
              </View>
          </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.chatBtn}
            onPress={() => navigation.navigate('Chat', { product })}
          >
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="#111418" />
              <Text style={styles.chatText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buyBtn}
            onPress={() => navigation.navigate('EscrowStatus', { product })}
          >
              <Ionicons name="card-outline" size={20} color="#fff" />
              <Text style={styles.buyBtnText}>Buy with Safe Pay</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
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
      paddingTop: 45, // Safe area
      paddingBottom: 10,
  },
  headerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#111418',
  },
  circleBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.8)',
      alignItems: 'center',
      justifyContent: 'center',
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
      height: 100,
  },
  dotsContainer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
  },
  dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.5)',
  },
  activeDot: {
      backgroundColor: COLORS.primary,
  },
  content: {
      padding: 20,
      backgroundColor: '#fff',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      marginTop: -24,
  },
  titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#111418',
      flex: 1,
      marginRight: 10,
  },
  verifiedTag: {
      backgroundColor: 'rgba(0,102,255,0.1)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
  },
  verifiedText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: COLORS.primary,
      textTransform: 'uppercase',
  },
  price: {
      fontSize: 28,
      fontWeight: '900',
      color: COLORS.primary,
      marginVertical: 4,
  },
  metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 8,
  },
  metaText: {
      fontSize: 14,
      color: '#60758a',
      fontWeight: '500',
  },
  sellerCard: {
      marginTop: 24,
      padding: 20,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#F0F0F0',
      borderRadius: 16,
      gap: 16,
  },
  sellerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
  },
  avatarContainer: {
      position: 'relative',
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(0,102,255,0.1)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  onlineStatus: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: '#22C55E',
      borderWidth: 2,
      borderColor: '#fff',
  },
  sellerName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#111418',
  },
  ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 2,
  },
  ratingText: {
      fontSize: 12,
      color: '#60758a',
      fontWeight: '600',
  },
  viewProfileBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  viewProfileText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.primary,
  },
  secureBox: {
      marginTop: 16,
      backgroundColor: '#EFF6FF',
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderWidth: 1,
      borderColor: '#DBEAFE',
  },
  secureIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,102,255,0.1)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  secureTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#111418',
  },
  secureDesc: {
      fontSize: 11,
      color: '#60758a',
      marginTop: 2,
  },
  section: {
      marginTop: 24,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111418',
      marginBottom: 12,
  },
  descText: {
      fontSize: 16,
      color: '#60758a',
      lineHeight: 24,
  },
  grid: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 24,
  },
  gridItem: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#F0F0F0',
      borderRadius: 16,
  },
  gridLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#9E9E9E',
      marginBottom: 4,
  },
  gridValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#111418',
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      padding: 16,
      paddingBottom: 32,
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
      flexDirection: 'row',
      gap: 16,
      ...getShadow('#000', { width: 0, height: -4 }, 0.05, 10, 0),
  },
  chatBtn: {
      width: 60,
      height: 60,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FAFAFA',
  },
  chatText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#111418',
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
      ...getShadow(COLORS.primary, { width: 0, height: 4 }, 0.25, 8, 4),
  },
  buyBtnText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
  }
});
