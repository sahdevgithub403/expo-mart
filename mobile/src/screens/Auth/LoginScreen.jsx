import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, StatusBar, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';
import { COLORS, SIZES, SHADOWS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, app } from '../../services/firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  /* PREVIOUS LOGIC - PASSWORD BASED (Commented Out)
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleLoginPrevious = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please enter credits');
      return;
    }
    setLoading(true);
    try {
      await AuthService.login(phone, password);
      navigation.replace('MainTabs'); 
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };
  */
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const recaptchaVerifier = useRef(null);

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }

    setLoading(true);
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const vid = await phoneProvider.verifyPhoneNumber(
        `+91${phone}`,
        recaptchaVerifier.current
      );
      setVerificationId(vid);
      setShowOtpInput(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send OTP. Please check your network or Firebase configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await signInWithCredential(auth, credential);
      
      // Call backend to get JWT
      await AuthService.firebaseLogin({ phone, firebaseUid: userCredential.user.uid });
      navigation.replace('MainTabs'); 
    } catch (error) {
      console.error(error);
      Alert.alert('Verification Failed', 'Invalid OTP or session expired.');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = () => {
    if (showOtpInput) {
      handleVerifyOTP();
    } else {
      handleSendOTP();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification={true}
      />

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

            <Text style={styles.description}>
                Join our community of verified buyers and sellers. Trade with peace of mind using our <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Secure Escrow</Text> system.
            </Text>

            <View style={styles.card}>
                <View style={{marginBottom: 20}}>
                    <Text style={styles.cardTitle}>Login or Sign Up</Text>
                    <Text style={styles.cardSubtitle}>
                        {showOtpInput ? 'Enter the 6-digit code sent to your phone.' : 'Enter your phone number to continue.'}
                    </Text>
                </View>

                {!showOtpInput ? (
                    <>
                        <Text style={styles.label}>Mobile Number</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.countryCode}>+91</Text>
                            <View style={styles.divider} />
                            <TextInput
                                style={styles.input}
                                placeholder="00000 00000"
                                placeholderTextColor="#BDBDBD"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                maxLength={10}
                            />
                        </View>
                    </>
                ) : (
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <Text style={styles.label}>Verification Code</Text>
                            <TouchableOpacity onPress={() => setShowOtpInput(false)}>
                                <Text style={{ color: COLORS.primary, fontSize: 12, fontWeight: 'bold' }}>Change Number</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="key-outline" size={20} color="#60758a" style={{ marginRight: 12 }} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter 6-digit OTP"
                                placeholderTextColor="#BDBDBD"
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType="number-pad"
                                maxLength={6}
                            />
                        </View>
                    </>
                )}

                <TouchableOpacity style={styles.button} onPress={handleAction} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : (
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                            <Text style={styles.buttonText}>{showOtpInput ? 'Verify & Login' : 'Send OTP'}</Text>
                            <Ionicons name="arrow-forward" size={18} color="#fff" />
                        </View>
                    )}
                </TouchableOpacity>

                <View style={styles.verifyDivider}>
                    <View style={styles.line} />
                    <Text style={styles.verifyDividerText}>Verify Identity</Text>
                    <View style={styles.line} />
                </View>

                <TouchableOpacity style={styles.verifyBtn}>
                    <Ionicons name="card-outline" size={20} color={COLORS.primary} style={{marginRight: 8}} />
                    <Text style={styles.verifyText}>Verify with Aadhaar / College ID</Text>
                </TouchableOpacity>
                
                <Text style={styles.trustBadgeText}>
                    Verified accounts get a <Text style={{color: COLORS.success, fontWeight: 'bold'}}>Trust Badge</Text> and higher transaction limits.
                </Text>
            </View>

            <View style={styles.badgesGrid}>
                <View style={styles.badgeItem}>
                    <View style={styles.badgeIconBg}>
                        <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} />
                    </View>
                    <Text style={styles.badgeText}>100% Verified</Text>
                </View>
                <View style={styles.badgeItem}>
                    <View style={styles.badgeIconBg}>
                        <Ionicons name="lock-closed" size={20} color={COLORS.primary} />
                    </View>
                    <Text style={styles.badgeText}>Escrow Secure</Text>
                </View>
                <View style={styles.badgeItem}>
                    <View style={styles.badgeIconBg}>
                        <Ionicons name="headset" size={20} color={COLORS.primary} />
                    </View>
                    <Text style={styles.badgeText}>24/7 Support</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.termsText}>
                    By continuing, you agree to our{'\n'}
                    <Text style={{textDecorationLine: 'underline'}}>Terms of Service</Text> & <Text style={{textDecorationLine: 'underline'}}>Privacy Policy</Text>
                </Text>
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
      height: 180,
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
      fontSize: 24,
      fontWeight: 'bold',
  },
  heroSubtitle: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: 14,
      marginTop: 4,
  },
  description: {
      textAlign: 'center',
      fontSize: 14,
      color: '#60758a',
      lineHeight: 20,
      marginBottom: 24,
      paddingHorizontal: 8,
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
      fontSize: 20,
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
      marginBottom: 24,
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
  verifyDivider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 24,
  },
  line: {
      flex: 1,
      height: 1,
      backgroundColor: '#E0E0E0',
  },
  verifyDividerText: {
      marginHorizontal: 16,
      fontSize: 12,
      fontWeight: 'bold',
      color: '#9E9E9E',
      textTransform: 'uppercase',
      letterSpacing: 1,
  },
  verifyBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(0,102,255,0.2)',
      backgroundColor: 'rgba(0,102,255,0.05)',
      marginBottom: 12,
  },
  verifyText: {
      color: COLORS.primary,
      fontWeight: '600',
      fontSize: 14,
  },
  trustBadgeText: {
      fontSize: 11,
      color: '#60758a',
      textAlign: 'center',
      paddingHorizontal: 16,
  },
  badgesGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 32,
  },
  badgeItem: {
      alignItems: 'center',
      gap: 8,
  },
  badgeIconBg: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,102,255,0.05)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  badgeText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#60758a',
      textTransform: 'uppercase',
  },
  footer: {
      alignItems: 'center',
      paddingBottom: 24,
  },
  termsText: {
      textAlign: 'center',
      fontSize: 12,
      color: '#9E9E9E',
      lineHeight: 18,
  }
});
