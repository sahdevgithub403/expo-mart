import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigation.replace('Login');
    } catch (error) {
      navigation.replace('Login');
    }
  };

  const MENU_ITEMS = [
    { id: '1', label: 'My Listings', icon: 'list-outline', route: 'Listings' },
    { id: '2', label: 'Saved Items', icon: 'heart-outline', route: 'Saved' },
    { id: '3', label: 'Reviews', icon: 'chatbubble-outline', route: 'Reviews' },
    { id: '4', label: 'Settings', icon: 'settings-outline', route: 'Settings' },
    { id: '5', label: 'Help Center', icon: 'help-circle-outline', route: 'Help' },
  ];

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 10) }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://avatar.iran.liara.run/public/boy?username=Ash' }}
              style={styles.avatarImage}
            />
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="pencil" size={12} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.nameText}>Alex Johnson</Text>
            <Text style={styles.memberText}>Member since Jan 2022</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} activeOpacity={0.6}>
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={20} color={COLORS.textPrimary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutLabel}>Log Out</Text>
        </TouchableOpacity>

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
    paddingHorizontal: SPACING.lg,
  },
  header: {
    paddingVertical: SPACING.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.card,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.border,
  },
  editBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  memberText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.xs,
    marginBottom: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.errorLight,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    gap: SPACING.sm,
  },
  logoutLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.error,
  },
});
