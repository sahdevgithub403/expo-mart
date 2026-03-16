import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const CATEGORIES = [
  { id: "all", label: "All", icon: "grid", active: true },
  { id: "electronics", label: "Electronics", icon: "phone-portrait-outline", active: false },
  { id: "vehicles", label: "Vehicles", icon: "car-sport-outline", active: false },
];

const RECOMMENDATIONS = [
  {
    id: "1",
    title: "iPhone 13 Pro - 128GB Silver,...",
    price: "$699",
    location: "DOWNTOWN, NY",
    time: "Today",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=80",
    favorite: false,
  },
  {
    id: "2",
    title: "Specialized Mountain Bike 2023 - Carbon...",
    price: "$1,250",
    location: "BROOKLYN, NY",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&q=80",
    favorite: false,
  },
  {
    id: "3",
    title: "Handcrafted Oak Dining Table + 4...",
    price: "$450",
    location: "QUEENS, NY",
    time: "Yesterday",
    image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=500&q=80",
    favorite: false,
  },
  {
    id: "4",
    title: "Sony WH-1000XM4 Noise Canceling...",
    price: "$180",
    location: "JERSEY CITY, NJ",
    time: "Oct 24",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    favorite: false,
  },
  {
    id: "5",
    title: "2019 Royal Enfield Interceptor 650 - L...",
    price: "$5,400",
    location: "HOBOKEN, NJ",
    time: "Oct 22",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&q=80",
    favorite: false,
  },
  {
    id: "6",
    title: "MacBook Air M2 - Space Gray, 16GB...",
    price: "$850",
    location: "STATEN ISLAND, NY",
    time: "Oct 21",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    favorite: false,
  },
];

export default function MarketplaceScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 10) }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="storefront" size={24} color="#2563EB" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>Marketplace</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color="#0F172A" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, styles.addBtn]} onPress={() => navigation.navigate("AddListingFlow")}>
            <Ionicons name="add" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search cars, phones and more..."
          placeholderTextColor="#94A3B8"
        />
        <TouchableOpacity>
          <Ionicons name="options-outline" size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Categories Row */}
      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryPill,
                cat.active ? styles.categoryPillActive : null,
              ]}
            >
              <Ionicons
                name={cat.icon}
                size={16}
                color={cat.active ? "#FFFFFF" : "#2563EB"}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.categoryPillText,
                  cat.active ? styles.categoryPillTextActive : null,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        <MasonryFlashList
          data={RECOMMENDATIONS}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
          estimatedItemSize={250}
          ListHeaderComponent={
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Fresh recommendations</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
          }
          ListFooterComponent={
            <View style={styles.spinnerContainer}>
              <View style={styles.spinner} />
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardImageContainer}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <TouchableOpacity style={styles.favBtn}>
                  <Ionicons name="heart" size={20} color="#475569" />
                </TouchableOpacity>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.priceText}>{item.price}</Text>
                <Text style={styles.titleText} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.metaRow}>
                  <Ionicons name="location" size={10} color="#64748B" />
                  <Text style={styles.metaText}>{item.location}</Text>
                </View>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF6FF", // Light blue tint
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#2563EB",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
  },
  categoriesWrapper: {
    marginBottom: 20,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  categoryPillActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  categoryPillTextActive: {
    color: "#FFFFFF",
  },
  listPadding: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },
  card: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardImageContainer: {
    width: "100%",
    height: 140,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  favBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    padding: 14,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#2563EB",
    marginBottom: 6,
  },
  titleText: {
    fontSize: 13,
    color: "#0F172A",
    fontWeight: "500",
    lineHeight: 18,
    marginBottom: 10,
    height: 36, // Force exactly two lines max height visually
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  metaText: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "700",
    marginLeft: 4,
    textTransform: "uppercase",
  },
  timeText: {
    fontSize: 11,
    color: "#94A3B8",
  },
  spinnerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
  },
  spinner: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 3,
      borderColor: '#2563EB',
      borderTopColor: 'transparent',
  }
});
