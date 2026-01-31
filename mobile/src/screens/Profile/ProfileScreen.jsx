import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthService } from '../../services/authService';

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('info');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const listingCount = 3;
  const historyCount = 5;

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [])
  );

  const loadUser = async () => {
    try {
      const userData = await AuthService.fetchProfile();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]} aria-hidden={false}>
        <View style={styles.profileSection}>
            <View style={styles.avatarWrapper}>
                {user?.profileImage ? (
                    <Image source={{uri: user.profileImage}} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.initialAvatar]}>
                        <Text style={styles.initialText}>
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
                        </Text>
                    </View>
                )}
                <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark" size={12} color="#fff" />
                </View>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
                <Text style={styles.role}>{user?.email || 'No email provided'}</Text>
                <View style={styles.trustTag}>
                    <Text style={styles.trustText}>{user?.trustScore || 0} Trust Score</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('ProfileSettings')}>
                <Ionicons name="settings-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}
        >
            <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
        >
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History ({historyCount})</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          {activeTab === 'info' ? (
              <View style={styles.content}>
                  <View style={styles.statsGrid}>
                      <View style={styles.statCard}>
                          <Text style={styles.statValue}>{listingCount}</Text>
                          <Text style={styles.statLabel}>Active</Text>
                      </View>
                      <View style={styles.statCard}>
                          <Text style={styles.statValue}>{historyCount}</Text>
                          <Text style={styles.statLabel}>Orders</Text>
                      </View>
                      <View style={styles.statCard}>
                          <Text style={styles.statValue}>45</Text>
                          <Text style={styles.statLabel}>Trust</Text>
                      </View>
                  </View>

                  <LinearGradient
                    colors={[COLORS.primary, '#2563EB']}
                    style={styles.promoCard}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                  >
                      <View>
                          <Text style={styles.promoTitle}>Campus Verification</Text>
                          <Text style={styles.promoDesc}>Unlock 0% Escrow fees this month</Text>
                      </View>
                      <TouchableOpacity style={styles.promoBtn}>
                          <Text style={styles.promoBtnText}>Renew</Text>
                      </TouchableOpacity>
                  </LinearGradient>

                  <View style={styles.menu}>
                      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Marketplace')}>
                          <View style={styles.menuIconInfo}>
                              <Ionicons name="basket-outline" size={22} color="#9E9E9E" />
                              <Text style={styles.menuText}>My Listings</Text>
                          </View>
                          <View style={styles.menuArrow}>
                              <View style={styles.menuBadge}>
                                  <Text style={styles.menuBadgeText}>{listingCount}</Text>
                              </View>
                              <Ionicons name="chevron-forward" size={20} color="#E0E0E0" />
                          </View>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EscrowStatus')}>
                          <View style={styles.menuIconInfo}>
                              <Ionicons name="wallet-outline" size={22} color={COLORS.primary} />
                              <Text style={styles.menuText}>Escrow Transactions</Text>
                          </View>
                          <View style={styles.menuArrow}>
                              <View style={[styles.menuBadge, styles.activeBadge]}>
                                  <Text style={styles.activeBadgeText}>{historyCount}</Text>
                              </View>
                              <Ionicons name="chevron-forward" size={20} color="#E0E0E0" />
                          </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.menuItem}>
                          <View style={styles.menuIconInfo}>
                              <Ionicons name="shield-checkmark-outline" size={22} color="#9E9E9E" />
                              <Text style={styles.menuText}>Safety Settings</Text>
                          </View>
                          <Ionicons name="chevron-forward" size={20} color="#E0E0E0" />
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.menuItem, {borderBottomWidth: 0}]}>
                          <View style={styles.menuIconInfo}>
                              <Ionicons name="headset-outline" size={22} color="#9E9E9E" />
                              <Text style={styles.menuText}>Customer Support</Text>
                          </View>
                          <Ionicons name="chevron-forward" size={20} color="#E0E0E0" />
                      </TouchableOpacity>
                  </View>

                  <TouchableOpacity 
                    style={styles.signOutBtn}
                    onPress={async () => {
                        await AuthService.logout();
                        navigation.replace('Login');
                    }}
                  >
                      <Text style={styles.signOutText}>Sign Out Securely</Text>
                  </TouchableOpacity>
              </View>
          ) : (
              <View style={styles.content}>
                  <View style={styles.emptyHistory}>
                      <Ionicons name="file-tray-outline" size={48} color="#E0E0E0" />
                      <Text style={styles.emptyHistoryText}>No order history yet.</Text>
                  </View>
              </View>
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
      backgroundColor: '#fff',
      padding: 24,
      paddingBottom: 24,
  },
  profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
  },
  avatarWrapper: {
      position: 'relative',
  },
  avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#F5F5F5',
  },
  verifiedBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#10B981',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#fff',
  },
  initialAvatar: {
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      justifyContent: 'center',
  },
  initialText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
  },
  name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#111418',
  },
  role: {
      fontSize: 12,
      color: '#60758a',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginTop: 6,
  },
  trustTag: {
      backgroundColor: '#F0FDF4',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginTop: 8,
      alignSelf: 'flex-start',
  },
  trustText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#15803D',
      textTransform: 'uppercase',
  },
  settingsBtn: {
      padding: 8,
  },
  tabs: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
  },
  tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
  },
  activeTab: {
      borderBottomColor: COLORS.primary,
  },
  tabText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#9E9E9E',
  },
  activeTabText: {
      color: COLORS.primary,
  },
  content: {
      padding: 16,
      gap: 16,
  },
  statsGrid: {
      flexDirection: 'row',
      gap: 12,
  },
  statCard: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#F0F0F0',
  },
  statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.primary,
  },
  statLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#60758a',
      textTransform: 'uppercase',
      marginTop: 4,
  },
  promoCard: {
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...getShadow(COLORS.primary, { width: 0, height: 8 }, 0.25, 16, 6),
  },
  promoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
  },
  promoDesc: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.8)',
      marginTop: 4,
  },
  promoBtn: {
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
  },
  promoBtnText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLORS.primary,
  },
  menu: {
      backgroundColor: '#fff',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#F0F0F0',
      overflow: 'hidden',
  },
  menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F9FAFB',
  },
  menuIconInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  menuText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#111418',
  },
  menuArrow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  menuBadge: {
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
  },
  menuBadgeText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#6B7280',
  },
  activeBadge: {
      backgroundColor: COLORS.primary,
  },
  activeBadgeText: {
      color: '#fff',
  },
  signOutBtn: {
      backgroundColor: '#FEF2F2',
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
  },
  signOutText: {
      color: '#EF4444',
      fontWeight: 'bold',
      fontSize: 14,
  },
  emptyHistory: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
      opacity: 0.6,
  },
  emptyHistoryText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#111418',
      marginTop: 12,
  }
});
