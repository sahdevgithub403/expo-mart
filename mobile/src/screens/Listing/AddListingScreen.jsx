import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddListingScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 10) }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>List New Item</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Step Indicator */}
        <View style={styles.stepHeader}>
            <View>
                <Text style={styles.stepLabel}>STEP 1 OF 3</Text>
                <Text style={styles.stepTitle}>Upload Photos</Text>
            </View>
            <Text style={styles.stepProgressText}>33% Complete</Text>
        </View>
        <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
        </View>

        {/* Upload Photos Section */}
        <View style={styles.uploadBox}>
            <View style={styles.cameraCircle}>
                <Ionicons name="camera" size={32} color="#2563EB" />
            </View>
            <Text style={styles.uploadTitle}>Add up to 10 photos</Text>
            <Text style={styles.uploadSub}>Showcase your item from different angles. Clear, well-lit photos sell faster.</Text>
            <TouchableOpacity style={styles.selectPhotosBtn}>
                <Text style={styles.selectPhotosText}>Select Photos</Text>
            </TouchableOpacity>
        </View>

        {/* Thumbnails row */}
        <View style={styles.thumbnailsRow}>
            <View style={styles.thumbPlaceholder}>
                <Ionicons name="image" size={20} color="#94A3B8" />
            </View>
            <View style={styles.thumbPlaceholder}>
                <Ionicons name="image" size={20} color="#94A3B8" />
            </View>
            <View style={styles.thumbPlaceholder}>
                <Ionicons name="image" size={20} color="#94A3B8" />
            </View>
            <View style={[styles.thumbPlaceholder, styles.thumbAdd]}>
                <Ionicons name="add" size={24} color="#94A3B8" />
            </View>
        </View>

        {/* Item Details */}
        <Text style={styles.sectionTitle}>Item Details</Text>
        
        <Text style={styles.inputLabel}>Item Title</Text>
        <TextInput
            style={styles.inputBox}
            placeholder="e.g. Vintage Leather Jacket"
            placeholderTextColor="#94A3B8"
            value={title}
            onChangeText={setTitle}
        />

        <Text style={styles.inputLabel}>Category</Text>
        <View style={styles.dropdownBox}>
            <Text style={styles.dropdownText}>Select a category</Text>
            <Ionicons name="chevron-down" size={20} color="#64748B" />
        </View>

        <Text style={styles.inputLabel}>Price</Text>
        <TextInput
            style={styles.inputBox}
            placeholder="$ 0.00"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
        />

        {/* Location Section */}
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.locationCard}>
            <View style={styles.mapMockupContainer}>
                {/* Visual map representation. Replace with actual MapView if preferred */ }
                <View style={[styles.mapMockup, {backgroundColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={{color: '#94A3B8', fontSize: 12}}>Static Map Visual</Text>
                    <View style={styles.mapPin}>
                        <View style={styles.mapPinInner} />
                    </View>
                </View>
            </View>
            <View style={styles.locationRow}>
                <Ionicons name="location" size={24} color="#2563EB" />
                <View style={styles.locationTextContainer}>
                    <Text style={styles.locationMain}>San Francisco, CA</Text>
                    <Text style={styles.locationSub}>Mission District</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
            </View>
        </View>

      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
          <TouchableOpacity style={styles.draftBtn}>
              <Text style={styles.draftBtnText}>Save Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listBtn}>
              <Text style={styles.listBtnText}>List Item</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{marginLeft: 8}} />
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  iconBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  stepHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
  },
  stepLabel: {
      fontSize: 10,
      fontWeight: '800',
      color: '#64748B',
      letterSpacing: 1,
      marginBottom: 2,
  },
  stepTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#0F172A',
  },
  stepProgressText: {
      fontSize: 12,
      fontWeight: '800',
      color: '#2563EB',
  },
  progressBarBg: {
      height: 6,
      backgroundColor: '#E2E8F0',
      borderRadius: 3,
      marginBottom: 24,
      overflow: 'hidden',
  },
  progressBarFill: {
      width: '33%',
      height: '100%',
      backgroundColor: '#2563EB',
      borderRadius: 3,
  },
  uploadBox: {
      backgroundColor: '#FFFFFF',
      borderWidth: 2,
      borderColor: '#E2E8F0',
      borderStyle: 'dashed',
      borderRadius: 24,
      padding: 30,
      alignItems: 'center',
      marginBottom: 16,
  },
  cameraCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: '#EFF6FF',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
  },
  uploadTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#0F172A',
      marginBottom: 8,
  },
  uploadSub: {
      fontSize: 13,
      color: '#64748B',
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20,
  },
  selectPhotosBtn: {
      backgroundColor: '#2563EB',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 24,
  },
  selectPhotosText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 14,
  },
  thumbnailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
  },
  thumbPlaceholder: {
      flex: 1,
      aspectRatio: 1,
      backgroundColor: '#E2E8F0',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 4,
  },
  thumbAdd: {
      backgroundColor: '#F8FAFC',
      borderWidth: 1,
      borderColor: '#E2E8F0',
      borderStyle: 'dashed',
  },
  sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#0F172A',
      marginBottom: 16,
      marginTop: 10,
  },
  inputLabel: {
      fontSize: 13,
      fontWeight: '700',
      color: '#0F172A',
      marginBottom: 8,
  },
  inputBox: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#E2E8F0',
      borderRadius: 16,
      height: 56,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#0F172A',
      marginBottom: 20,
  },
  dropdownBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#E2E8F0',
      borderRadius: 16,
      height: 56,
      paddingHorizontal: 16,
      marginBottom: 20,
  },
  dropdownText: {
      fontSize: 16,
      color: '#0F172A',
  },
  locationCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#E2E8F0',
      marginBottom: 20,
  },
  mapMockupContainer: {
      width: '100%',
      height: 140,
  },
  mapMockup: {
      width: '100%',
      height: '100%',
  },
  mapPin: {
      position: 'absolute',
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: 'rgba(37, 99, 235, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  mapPinInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#2563EB',
      borderWidth: 2,
      borderColor: '#FFFFFF',
  },
  locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
  },
  locationTextContainer: {
      flex: 1,
      marginLeft: 12,
  },
  locationMain: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#0F172A',
  },
  locationSub: {
      fontSize: 12,
      color: '#64748B',
      marginTop: 2,
  },
  changeText: {
      color: '#2563EB',
      fontWeight: '700',
      fontSize: 14,
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: '#F1F5F9',
  },
  draftBtn: {
      backgroundColor: '#F1F5F9',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 20,
      marginRight: 10,
  },
  draftBtnText: {
      color: '#0F172A',
      fontWeight: 'bold',
      fontSize: 15,
  },
  listBtn: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#2563EB',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
  },
  listBtnText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
  }
});
