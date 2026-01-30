import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, StatusBar, Image, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';
import { COLORS, SIZES, SHADOWS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      Keyboard.dismiss();
    });
    return unsubscribe;
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
    }

    setLoading(true);
    try {
      await AuthService.login(email, password);
      navigation.replace('LocationPermission'); 
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#111418" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Secure Login</Text>
        <View style={{width: 24}} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1, padding: 24}}>
            
            <View style={styles.heroCard}>
                <Image 
                    source={{uri: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop'}} 
                    style={styles.heroImage}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.heroGradient}
                >
                    <Text style={styles.heroTitle}>Welcome to TrustMart</Text>
                    <Text style={styles.heroSubtitle}>Building a safer marketplace together.</Text>
                </LinearGradient>
            </View>

            <View style={styles.card}>
                <View style={{marginBottom: 20}}>
                    <Text style={styles.cardTitle}>Sign In</Text>
                    <Text style={styles.cardSubtitle}>Enter your credentials to continue</Text>
                </View>

                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#60758a" style={{marginRight: 12}} />
                    <TextInput
                        style={styles.input}
                        placeholder="your.email@example.com"
                        placeholderTextColor="#BDBDBD"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#60758a" style={{marginRight: 12}} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#BDBDBD"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#60758a" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={{alignSelf: 'flex-end', marginBottom: 24}}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : (
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                            <Text style={styles.buttonText}>Login</Text>
                            <Ionicons name="arrow-forward" size={18} color="#fff" />
                        </View>
                    )}
                </TouchableOpacity>

                <View style={styles.registerPrompt}>
                    <Text style={styles.registerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.registerText, {color: COLORS.primary, fontWeight: 'bold'}]}>Register now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.badgesGrid}>
                <View style={styles.badgeItem}>
                    <View style={styles.badgeIconBg}>
                        <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} />
                    </View>
                    <Text style={styles.badgeText}>Verified</Text>
                </View>
                <View style={styles.badgeItem}>
                    <View style={styles.badgeIconBg}>
                        <Ionicons name="lock-closed" size={20} color={COLORS.primary} />
                    </View>
                    <Text style={styles.badgeText}>Secure</Text>
                </View>
                <View style={styles.badgeItem}>
                    <View style={styles.badgeIconBg}>
                        <Ionicons name="headset" size={20} color={COLORS.primary} />
                    </View>
                    <Text style={styles.badgeText}>Support</Text>
                </View>
            </View>
          </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  navBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
  },
  navTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111418',
  },
  heroCard: {
      borderRadius: 16,
      overflow: 'hidden',
      height: 160,
      marginBottom: 24,
      position: 'relative',
  },
  heroImage: {
      width: '100%',
      height: '100%',
  },
  heroGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60%',
      justifyContent: 'flex-end',
      padding: 16,
  },
  heroTitle: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
  },
  heroSubtitle: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: 13,
      marginTop: 4,
  },
  card: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 24,
      ...getShadow('#000', { width: 0, height: 4 }, 0.05, 10, 2),
      borderWidth: 1,
      borderColor: '#F0F0F0',
      marginBottom: 32,
  },
  cardTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#111418',
      marginBottom: 4,
  },
  cardSubtitle: {
      fontSize: 14,
      color: '#60758a',
  },
  label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#111418',
      marginBottom: 8,
  },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      height: 56,
      paddingHorizontal: 16,
      marginBottom: 20,
  },
  countryCode: {
      fontSize: 16,
      fontWeight: '600',
      color: '#60758a',
  },
  divider: {
      width: 1,
      height: 24,
      backgroundColor: '#E0E0E0',
      marginHorizontal: 12,
  },
  input: {
      flex: 1,
      fontSize: 16,
      color: '#111418',
      height: '100%',
  },
  button: {
      backgroundColor: COLORS.primary,
      height: 56,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      ...getShadow(COLORS.primary, { width: 0, height: 4 }, 0.2, 8, 4),
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  registerPrompt: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
  },
  registerText: {
      fontSize: 14,
      color: '#60758a',
  },
  badgesGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
  },
  badgeItem: {
      alignItems: 'center',
      gap: 8,
  },
  badgeIconBg: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(0,102,255,0.05)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  badgeText: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#60758a',
      textTransform: 'uppercase',
  }
});
