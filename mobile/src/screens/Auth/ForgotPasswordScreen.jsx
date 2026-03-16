import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgot = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            await AuthService.forgotPassword(email);
            Alert.alert(
                'Success',
                'Reset instructions has been sent to your email address.',
                [{ text: 'OK', onPress: () => navigation.navigate('ResetPassword', { email }) }]
            );
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to send reset instructions. User may not exist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Forgot Password</Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ padding: SPACING.lg }}>
                    <View style={styles.iconContainer}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="lock-open-outline" size={40} color={COLORS.primary} />
                        </View>
                    </View>

                    <Text style={styles.title}>Recovery Email</Text>
                    <Text style={styles.subtitle}>Enter your registered email address to reset your password</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} style={{ marginRight: SPACING.sm }} />
                            <TextInput
                                style={styles.input}
                                placeholder="your.email@example.com"
                                placeholderTextColor={COLORS.textTertiary}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleForgot} disabled={loading} activeOpacity={0.85}>
                        {loading ? <ActivityIndicator color="#fff" /> : (
                            <Text style={styles.buttonText}>Send Instructions</Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: SPACING.xl,
        marginBottom: SPACING.lg,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primarySoft,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: 15,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: SPACING.xl,
        lineHeight: 22,
    },
    inputGroup: {
        marginBottom: SPACING.xl,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        paddingHorizontal: SPACING.md,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: COLORS.textPrimary,
    },
    button: {
        backgroundColor: COLORS.primary,
        height: 54,
        borderRadius: RADIUS.xl,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.button,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
});
