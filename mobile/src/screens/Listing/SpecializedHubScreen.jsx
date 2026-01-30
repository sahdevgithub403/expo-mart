import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, FlatList, Platform } from 'react-native';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { ProductService } from '../../services/productService';
import { ProductCard } from '../../components/ProductCard';

export default function SpecializedHubScreen({ navigation, route }) {
    const { type = 'service' } = route.params || {};

    const configs = {
        service: {
            title: 'Professional Services',
            subtitle: 'Find experts and skilled workers',
            placeholder: 'Search for plumbers, tutors...',
            icon: 'construct',
            color: '#10B981',
            categories: [
                { label: 'All', icon: 'apps' },
                { label: 'Plumbing', icon: 'water' },
                { label: 'Electrical', icon: 'flash' },
                { label: 'Cleaning', icon: 'brush' },
                { label: 'Tutoring', icon: 'school' },
                { label: 'Coding', icon: 'code' },
                { label: 'Design', icon: 'color-palette' }
            ]
        },
        farmer: {
            title: "Farmer's Market",
            subtitle: 'Direct from field to community',
            placeholder: 'Search for crops, tools...',
            icon: 'leaf',
            color: '#10B981',
            categories: [
                { label: 'All', icon: 'apps' },
                { label: 'Crops', icon: 'leaf' },
                { label: 'Livestock', icon: 'paw' },
                { label: 'Agri-Tools', icon: 'construct' },
                { label: 'Seeds', icon: 'sunny' },
                { label: 'Dairy', icon: 'water' }
            ]
        },
        student: {
            title: 'Student Hub',
            subtitle: 'By students, for students',
            placeholder: 'Search for books, notes...',
            icon: 'school',
            color: '#3B82F6',
            categories: [
                { label: 'All', icon: 'apps' },
                { label: 'Textbooks', icon: 'book' },
                { label: 'Tutoring', icon: 'person' },
                { label: 'Gadgets', icon: 'laptop' },
                { label: 'Notes', icon: 'document-text' },
                { label: 'Hostel', icon: 'bed' }
            ]
        }
    };

    const config = configs[type] || configs.service;
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await ProductService.getAllProducts();
            // Filter by the main hub type (postType)
            const hubData = (Array.isArray(data) ? data : []).filter(item => item.postType === type);
            setProducts(hubData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type]);

    const filtered = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchesCat = activeCategory === 'All' || p.category === activeCategory;
        return matchesSearch && matchesCat;
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.header, { backgroundColor: config.color }]}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Ionicons name={config.icon} size={28} color="#fff" />
                    <View style={{width: 40}} />
                </View>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>{config.title}</Text>
                    <Text style={styles.headerSubtitle}>{config.subtitle}</Text>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#94A3B8" />
                    <TextInput 
                        style={styles.searchInput}
                        placeholder={config.placeholder}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            <View style={{height: 60, marginVertical: 10}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catList}>
                    {config.categories.map(cat => (
                        <TouchableOpacity 
                            key={cat.label} 
                            onPress={() => setActiveCategory(cat.label)}
                            style={[styles.catChip, activeCategory === cat.label && { backgroundColor: config.color, borderColor: config.color }]}
                        >
                            <Ionicons name={cat.icon} size={14} color={activeCategory === cat.label ? '#fff' : '#64748B'} />
                            <Text style={[styles.catText, activeCategory === cat.label && { color: '#fff' }]}>{cat.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={config.color} />
                </View>
            ) : (
                <FlatList 
                    data={filtered}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.grid}
                    renderItem={({item}) => (
                        <ProductCard 
                            product={{...item, image: item.imageUrl}}
                            onPress={() => navigation.navigate('Details', { product: item })}
                        />
                    )}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Ionicons name="apps-outline" size={60} color="#E2E8F0" />
                            <Text style={styles.emptyText}>No listings in this hub yet.</Text>
                            <TouchableOpacity 
                                style={[styles.postBtn, { backgroundColor: config.color }]}
                                onPress={() => navigation.navigate('PostListing', { postType: type })}
                            >
                                <Text style={styles.postBtnText}>Post First Listing</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContent: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 4,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginTop: -25,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 50,
        ...getShadow('#000', { width: 0, height: 4 }, 0.1, 10, 5),
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
    },
    catList: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 10,
    },
    catChip: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        backgroundColor: '#fff',
    },
    catText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#64748B',
    },
    grid: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 40,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#94A3B8',
        marginTop: 15,
    },
    postBtn: {
        marginTop: 20,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    postBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});
