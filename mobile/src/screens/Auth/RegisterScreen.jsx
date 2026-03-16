import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';

export default function RegisterScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();

    if (!emailRegex.test(cleanEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await AuthService.register(name.trim(), cleanEmail, phone.trim(), password);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.replace('LocationPermission') }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 10) }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Branding */}
          <View style={styles.brandContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="location" size={28} color={COLORS.white} />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Lumina and start discovering amazing places near you</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputBox}>
              <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputText}
                placeholder="John Doe"
                placeholderTextColor={COLORS.textTertiary}
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Email */}
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputText}
                placeholder="name@example.com"
                placeholderTextColor={COLORS.textTertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Phone */}
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputBox}>
              <Ionicons name="call-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputText}
                placeholder="+1 (555) 000-0000"
                placeholderTextColor={COLORS.textTertiary}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* Password */}
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputText}
                placeholder="••••••••"
                placeholderTextColor={COLORS.textTertiary}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconBtn}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Create Button */}
            <TouchableOpacity
              style={styles.createBtn}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? <ActivityIndicator color="#fff" /> : (
                <Text style={styles.createBtnText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Sign In */}
            <View style={styles.signinRow}>
              <Text style={styles.signinText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signinLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              By creating an account, you agree to Lumina's{' '}
              <Text style={styles.footerLink}>Terms of Service</Text>{' '}
              and <Text style={styles.footerLink}>Privacy Policy</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: 40,
  },
  headerRow: {
    marginBottom: SPACING.lg,
    marginTop: SPACING.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: SPACING.lg,
  },
  formContainer: {
    gap: SPACING.sm,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 4,
    marginTop: SPACING.sm,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: COLORS.backgroundSecondary,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.md,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  eyeIconBtn: {
    padding: SPACING.xs,
  },
  createBtn: {
    backgroundColor: COLORS.primary,
    height: 54,
    borderRadius: RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
    ...SHADOWS.button,
  },
  createBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  signinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  signinText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  signinLink: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  footerContainer: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.sm,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    color: COLORS.primary,
  },
});
