import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView, Platform } from 'react-native';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function EscrowStatusScreen({ navigation, route }) {
  // Mock product data if not provided
  const product = route.params?.product || {
      title: 'Sony XM4 Headphones',
      price: '$120',
      seller: 'Arjun Sharma',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop'
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#111418" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escrow Status</Text>
        <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.productCard}>
              <Image source={{uri: product.image}} style={styles.productImage} />
              <View style={{flex: 1}}>
                  <Text style={styles.orderId}>Order #TM-384920</Text>
                  <Text style={styles.productTitle} numberOfLines={1}>{product.title}</Text>
                  <Text style={styles.sellerName}>Seller: {product.seller}</Text>
              </View>
          </View>

          <View style={styles.timelineSection}>
              <View style={styles.timelineBarBase} />
              <View style={styles.timelineBarProgress} />
              
              <View style={styles.timelineSteps}>
                   <View style={styles.step}>
                       <View style={[styles.stepCircle, styles.stepActive]}>
                           <Ionicons name="lock-closed" size={20} color="#fff" />
                       </View>
                       <Text style={styles.stepLabel}>Payment{'\n'}Locked</Text>
                   </View>
                   <View style={styles.step}>
                       <View style={[styles.stepCircle, styles.stepCurrent]}>
                           <Ionicons name="eye" size={20} color={COLORS.primary} />
                       </View>
                       <Text style={styles.stepLabel}>Inspection{'\n'}Phase</Text>
                   </View>
                   <View style={styles.step}>
                       <View style={[styles.stepCircle, styles.stepPending]}>
                           <Ionicons name="checkmark-done" size={20} color="#BDBDBD" />
                       </View>
                       <Text style={[styles.stepLabel, {color: '#BDBDBD'}]}>Final{'\n'}Approval</Text>
                   </View>
                   <View style={styles.step}>
                       <View style={[styles.stepCircle, styles.stepPending]}>
                           <Ionicons name="checkmark-circle" size={20} color="#BDBDBD" />
                       </View>
                       <Text style={[styles.stepLabel, {color: '#BDBDBD'}]}>Funds{'\n'}Released</Text>
                   </View>
              </View>
          </View>

          <View style={styles.card}>
              <View style={styles.securityHeader}>
                  <View style={styles.securityIcon}>
                      <Ionicons name="shield-checkmark" size={20} color="#15803D" />
                  </View>
                  <View>
                      <Text style={styles.securityTitle}>Safe Deposit Secured</Text>
                      <Text style={styles.securitySubtitle}>Your {product.price} is protected by TrustMart.</Text>
                  </View>
              </View>
              <View style={styles.securityDivider} />
              <Text style={styles.securityDesc}>
                  Please meet the seller in a public place. Only confirm "Release Funds" after you have personally inspected and received the item.
              </Text>
          </View>

          <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>Transaction Info</Text>
              <View style={styles.summaryCard}>
                  <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Subtotal</Text>
                      <Text style={styles.summaryValue}>{product.price}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Service Fee</Text>
                      <Text style={styles.summaryValue}>$2.50</Text>
                  </View>
                  <View style={[styles.summaryRow, {backgroundColor: '#F9FAFB', marginHorizontal: -16, paddingHorizontal: 16, paddingVertical: 12}]}>
                      <Text style={[styles.summaryLabel, {color: '#111418', fontWeight: 'bold'}]}>Grand Total</Text>
                      <Text style={[styles.summaryValue, {color: COLORS.primary, fontWeight: 'bold'}]}>${(parseFloat(product.price.replace('$','')) + 2.5).toFixed(2)}</Text>
                  </View>
              </View>
          </View>
      </ScrollView>

      <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.homeBtn}
            onPress={() => navigation.navigate('MainTabs')}
          >
              <Text style={styles.homeBtnText}>Back to Home</Text>
              <Ionicons name="home" size={18} color="#fff" />
          </TouchableOpacity>
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
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
  productCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      margin: 16,
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#F0F0F0',
      gap: 16,
  },
  productImage: {
      width: 64,
      height: 64,
      borderRadius: 12,
      backgroundColor: '#F5F5F5',
  },
  orderId: {
      fontSize: 10,
      fontWeight: 'bold',
      color: COLORS.primary,
      textTransform: 'uppercase',
      letterSpacing: 1,
  },
  productTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#111418',
      marginVertical: 2,
  },
  sellerName: {
      fontSize: 14,
      color: '#60758a',
  },
  timelineSection: {
      paddingHorizontal: 16,
      paddingVertical: 32,
      position: 'relative',
  },
  timelineBarBase: {
      position: 'absolute',
      top: 52, // approximate center of circles
      left: 32,
      right: 32,
      height: 4,
      backgroundColor: '#F3F4F6',
      borderRadius: 2,
  },
  timelineBarProgress: {
      position: 'absolute',
      top: 52,
      left: 32,
      width: '35%', // Hardcoded for demo state "Inspection"
      height: 4,
      backgroundColor: COLORS.primary,
      borderRadius: 2,
  },
  timelineSteps: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  step: {
      alignItems: 'center',
      width: 70,
  },
  stepCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
      backgroundColor: '#fff',
      borderWidth: 2,
      zIndex: 1,
  },
  stepActive: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
  },
  stepCurrent: {
      borderColor: COLORS.primary,
  },
  stepPending: {
      borderColor: '#E5E7EB',
  },
  stepLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#111418',
  },
  card: {
      backgroundColor: '#fff',
      margin: 16,
      marginTop: 0,
      padding: 20,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#F0F0F0',
  },
  securityHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  securityIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F0FDF4',
      alignItems: 'center',
      justifyContent: 'center',
  },
  securityTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#111418',
  },
  securitySubtitle: {
      fontSize: 12,
      color: '#4B5563',
  },
  securityDivider: {
      height: 1,
      backgroundColor: '#F3F4F6',
      marginVertical: 16,
  },
  securityDesc: {
      fontSize: 12,
      color: '#60758a',
      lineHeight: 18,
  },
  summarySection: {
      paddingHorizontal: 16,
  },
  summaryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111418',
      marginBottom: 12,
      paddingLeft: 4,
  },
  summaryCard: {
      backgroundColor: '#fff',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#F0F0F0',
      overflow: 'hidden',
  },
  summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F9FAFB',
  },
  summaryLabel: {
      fontSize: 14,
      color: '#6B7280',
  },
  summaryValue: {
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
  },
  homeBtn: {
      backgroundColor: COLORS.primary,
      height: 56,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      ...getShadow(COLORS.primary, { width: 0, height: 4 }, 0.2, 8, 4),
  },
  homeBtnText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  }
});
