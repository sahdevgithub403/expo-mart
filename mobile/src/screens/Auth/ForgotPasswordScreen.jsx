import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

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
                    <Ionicons name="chevron-back" size={24} color="#111418" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Forgot Password</Text>
                <View style={{width: 24}} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
                <ScrollView contentContainerStyle={{padding: 24}}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="lock-open-outline" size={80} color={COLORS.primary} />
                    </View>

                    <Text style={styles.title}>Recovery Email</Text>
                    <Text style={styles.subtitle}>Enter your registered email address to reset your password</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#60758a" style={{marginRight: 12}} />
                            <TextInput
                                style={styles.input}
                                placeholder="your.email@example.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleForgot} disabled={loading}>
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
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111418',
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111418',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#60758a',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    inputGroup: {
        marginBottom: 32,
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
        height: 56,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111418',
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
});
