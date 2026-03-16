import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';

export default function ResetPasswordScreen({ route, navigation }) {
    const { email } = route.params || {};
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill both password fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await AuthService.resetPassword(email, newPassword);
            Alert.alert(
                'Success',
                'Password reset successful. Please login with your new password.',
                [{ text: 'Login', onPress: () => navigation.navigate('Login') }]
            );
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to reset password. Please try again.');
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
                <Text style={styles.headerTitle}>Reset Password</Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ padding: SPACING.lg }}>
                    <View style={styles.iconContainer}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="lock-closed-outline" size={40} color={COLORS.primary} />
                        </View>
                    </View>

                    <Text style={styles.title}>New Password</Text>
                    <Text style={styles.subtitle}>Set a strong password for your account</Text>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>New Password</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} style={{ marginRight: SPACING.sm }} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Enter new password"
                                    placeholderTextColor={COLORS.textTertiary}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.textSecondary} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} style={{ marginRight: SPACING.sm }} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Confirm new password"
                                    placeholderTextColor={COLORS.textTertiary}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showPassword}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading} activeOpacity={0.85}>
                            {loading ? <ActivityIndicator color="#fff" /> : (
                                <Text style={styles.buttonText}>Reset Password</Text>
                            )}
                        </TouchableOpacity>
                    </View>
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
    },
    form: {
        gap: SPACING.lg,
    },
    inputGroup: {
        gap: SPACING.sm,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textPrimary,
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
    inputText: {
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
        marginTop: SPACING.sm,
        ...SHADOWS.button,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
});
