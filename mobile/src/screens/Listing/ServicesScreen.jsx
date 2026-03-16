import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const PLACES_DATA = [
  {
    id: "1",
    title: "Oxford Premium PG",
    rating: "4.8",
    reviews: "(124 reviews)",
    distance: "0.5 km away",
    featureIcon: "wifi",
    featureText: "Free WiFi",
    price: "$450",
    unit: "per month",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    favorite: false,
  },
  {
    id: "2",
    title: "Starlight Girls Hostel",
    rating: "4.5",
    reviews: "(89 reviews)",
    distance: "1.2 km away",
    featureIcon: "restaurant",
    featureText: "Meals Incl.",
    price: "$380",
    unit: "per month",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    favorite: false,
  },
  {
    id: "3",
    title: "The Heights Residency",
    rating: "4.9",
    reviews: "(210 reviews)",
    distance: "0.2 km away",
    featureIcon: "barbell",
    featureText: "Gym Access",
    price: "$520",
    unit: "per month",
    image: "https://images.unsplash.com/photo-1502672260266-1c1de2c453b0?w=800&q=80",
    favorite: false,
  },
];

const FILTERS = ["Price", "Rating", "Distance", "Sort"];

export default function ServicesScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const pageTitle = route.params?.category || "PG / Hostels";

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 10) }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111418" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{pageTitle}</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search" size={24} color="#111418" />
        </TouchableOpacity>
      </View>

      {/* Filter Row */}
      <View style={styles.filterRowContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {FILTERS.map((f, i) => (
            <TouchableOpacity key={i} style={styles.filterChip}>
              <Text style={styles.filterChipText}>{f}</Text>
              <Ionicons name="chevron-down" size={14} color="#2563EB" style={styles.chipIcon} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List Content */}
      <View style={styles.listContainer}>
        <FlashList
          data={PLACES_DATA}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          estimatedItemSize={400}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Image Section */}
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <TouchableOpacity style={styles.favBtn}>
                  <Ionicons name={item.favorite ? "heart" : "heart"} size={22} color={item.favorite ? "#EF4444" : "#FFFFFF"} />
                </TouchableOpacity>
              </View>

              {/* Details Section */}
              <View style={styles.cardDetails}>
                <View style={styles.titlePriceRow}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>{item.price}</Text>
                    <Text style={styles.unitText}>{item.unit}</Text>
                  </View>
                </View>

                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#2563EB" />
                  <Text style={styles.ratingText}>{item.rating} <Text style={styles.reviewText}>{item.reviews}</Text></Text>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoPill}>
                    <Ionicons name="location" size={14} color="#475569" />
                    <Text style={styles.infoText}>{item.distance}</Text>
                  </View>
                  <View style={styles.infoPill}>
                    <Ionicons name={item.featureIcon} size={14} color="#475569" />
                    <Text style={styles.infoText}>{item.featureText}</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.viewDetailsBtn}
                  onPress={() => navigation.navigate("Details")}
                >
                  <Text style={styles.viewDetailsBtnText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    paddingVertical: 12,
    backgroundColor: "#F8FAFC",
  },
  headerBtn: {
    padding: 4,
  },
  searchBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
  },
  filterRowContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 15,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF0FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },
  chipIcon: {
    marginLeft: 6,
  },
  listContainer: {
    flex: 1,
  },
  listPadding: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  favBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardDetails: {
    padding: 20,
  },
  titlePriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginRight: 10,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
  },
  unitText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563EB",
    marginLeft: 6,
  },
  reviewText: {
    color: "#2563EB",
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 16,
  },
  infoPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "500",
  },
  viewDetailsBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  viewDetailsBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
