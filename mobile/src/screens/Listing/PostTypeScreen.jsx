import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, getShadow } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthService } from '../../services/authService';

const { width } = Dimensions.get('window');

export default function PostTypeScreen({ navigation }) {
    React.useEffect(() => {
        const checkAuth = async () => {
            const token = await AuthService.getToken();
            if (!token) {
                navigation.replace('Login');
            }
        };
        checkAuth();
    }, []);

    const postTypes = [
        {
            id: 'product',
            title: 'Sell a Product',
            desc: 'Electronics, Vehicles, Furniture, etc.',
            icon: 'cart-outline',
            color: '#3B82F6',
            bgColor: '#EFF6FF',
        },
        {
            id: 'service',
            title: 'Offer a Service',
            desc: 'Professional skills, repairs, tutoring',
            icon: 'construct-outline',
            color: '#10B981',
            bgColor: '#ECFDF5',
        },
        {
            id: 'farmer',
            title: "Farmer's Corner",
            desc: 'Crops, tools, cattle, seeds',
            icon: 'leaf-outline',
            color: '#F59E0B',
            bgColor: '#FFFBEB',
        },
        {
            id: 'student',
            title: 'Student Hub',
            desc: 'Books, tutoring, campus deals',
            icon: 'school-outline',
            color: '#8B5CF6',
            bgColor: '#F5F3FF',
        }
    ];

    const handleSelect = (type) => {
        navigation.navigate('PostListing', { postType: type });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="close" size={24} color="#111418" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>What are you offering?</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.subtitle}>Choose a category to reach the right audience across our community.</Text>

                <View style={styles.grid}>
                    {postTypes.map((item) => (
                        <TouchableOpacity 
                            key={item.id} 
                            style={styles.card}
                            onPress={() => handleSelect(item.id)}
                        >
                            <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
                                <Ionicons name={item.icon} size={32} color={item.color} />
                            </View>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardDesc}>{item.desc}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={[styles.infoBox]}>
                   <LinearGradient
                     colors={['#4F46E5', '#3B82F6']}
                     style={styles.infoGradient}
                     start={{x: 0, y: 0}}
                     end={{x: 1, y: 0}}
                   >
                       <Ionicons name="shield-checkmark" size={24} color="#fff" />
                       <View style={{flex: 1}}>
                           <Text style={styles.infoTitle}>Verified & Secure</Text>
                           <Text style={styles.infoText}>All posts go through our TrustMart safety check before going live.</Text>
                       </View>
                   </LinearGradient>
                </View>
            </ScrollView>
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
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backBtn: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
        color: '#1E293B',
    },
    content: {
        padding: 24,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
        marginBottom: 32,
    },
    grid: {
        gap: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...getShadow('#000', { width: 0, height: 4 }, 0.05, 8, 2),
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardInfo: {
        flex: 1,
        marginLeft: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 12,
        color: '#94A3B8',
    },
    infoBox: {
        marginTop: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    infoGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 16,
    },
    infoTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    infoText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 2,
    }
});
