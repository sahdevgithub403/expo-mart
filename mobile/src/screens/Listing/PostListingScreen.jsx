import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Alert, Modal, ActivityIndicator, Platform, Image, Dimensions } from 'react-native';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import SafeMap from '../../components/SafeMap';
import { ProductService } from '../../services/productService';

const { width } = Dimensions.get('window');

export default function PostListingScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('Used');
  const [locationName, setLocationName] = useState('');
  const [coords, setCoords] = useState(null);
  const [images, setImages] = useState([]);
  
  const [isDetecting, setIsDetecting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [mapModalVisible, setMapModalVisible] = useState(false);

  const categories = ['Electronics', 'Vehicles', 'Bikes', 'Books', 'Furniture', 'Fashion', 'Others'];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const detectLocation = async () => {
    setIsDetecting(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        setIsDetecting(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const currentCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCoords(currentCoords);

      let reverseGeocode = await Location.reverseGeocodeAsync(currentCoords);
      if (reverseGeocode.length > 0) {
        const item = reverseGeocode[0];
        const address = `${item.name || ''}, ${item.city || item.region || ''}`;
        setLocationName(address);
      }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Could not detect location automatically.');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !price || !category || !locationName) {
      Alert.alert("Missing Fields", "Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const productData = {
        title,
        description,
        price: parseFloat(price),
        category,
        condition,
        location: locationName,
        latitude: coords?.latitude,
        longitude: coords?.longitude,
        imageUrl: images.length > 0 ? images[0] : 'https://via.placeholder.com/400', // In production, upload to S3/Firebase Storage
        status: 'AVAILABLE'
      };

      await ProductService.createProduct(productData);

      Alert.alert("Success", "Your listing has been posted successfully!", [
        { text: "OK", onPress: () => navigation.replace('MainTabs') }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to post listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#111418" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post a Listing</Text>
        <View style={{width: 48}} />
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 120}}>
          {/* Photos Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <Text style={styles.sectionSubtitle}>{images.length}/5 photos</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoGrid}>
             <TouchableOpacity style={styles.addPhotoBtn} onPress={pickImage} disabled={images.length >= 5}>
                 <Ionicons name="camera" size={32} color={COLORS.primary} />
                 <Text style={styles.addPhotoText}>Add</Text>
             </TouchableOpacity>
             {images.map((uri, index) => (
               <View key={index} style={styles.photoWrapper}>
                 <Image source={{ uri }} style={styles.photoItem} />
                 <TouchableOpacity 
                   style={styles.removePhotoBtn} 
                   onPress={() => setImages(images.filter((_, i) => i !== index))}
                 >
                   <Ionicons name="close-circle" size={20} color="#EF4444" />
                 </TouchableOpacity>
               </View>
             ))}
             {[...Array(Math.max(0, 2 - images.length))].map((_, i) => (
               <View key={`placeholder-${i}`} style={styles.photoPlaceholder}>
                  <Ionicons name="image-outline" size={24} color="#E0E0E0" />
               </View>
             ))}
          </ScrollView>

          <View style={styles.form}>
               {/* Title */}
               <View style={styles.inputGroup}>
                   <Text style={styles.label}>Title*</Text>
                   <TextInput 
                       style={styles.input}
                       placeholder="What are you selling?"
                       value={title}
                       onChangeText={setTitle}
                       maxLength={50}
                   />
               </View>

               {/* Category */}
               <View style={styles.inputGroup}>
                   <Text style={styles.label}>Category*</Text>
                   <TouchableOpacity 
                       style={[styles.input, styles.dropdown]}
                       onPress={() => setCategoryModalVisible(true)}
                   >
                       <Text style={{color: category ? '#111418' : '#BDBDBD'}}>{category || "Select Category"}</Text>
                       <Ionicons name="chevron-down" size={20} color="#757575" />
                   </TouchableOpacity>
               </View>

               {/* Price */}
               <View style={styles.inputGroup}>
                   <Text style={styles.label}>Price*</Text>
                   <View style={styles.priceInputWrapper}>
                       <Text style={styles.currencySymbol}>$</Text>
                       <TextInput 
                           style={styles.priceInput}
                           placeholder="0.00"
                           value={price}
                           onChangeText={setPrice}
                           keyboardType="numeric"
                       />
                   </View>
               </View>

                {/* Condition */}
                <View style={styles.inputGroup}>
                   <Text style={styles.label}>Condition</Text>
                   <View style={styles.conditionToggle}>
                       {['New', 'Used', 'Refurbished'].map((item) => (
                           <TouchableOpacity 
                               key={item} 
                               style={[styles.conditionBtn, condition === item && styles.activeConditionBtn]}
                               onPress={() => setCondition(item)}
                           >
                               <Text style={[styles.conditionText, condition === item && styles.activeConditionText]}>{item}</Text>
                           </TouchableOpacity>
                       ))}
                   </View>
               </View>

               {/* Description */}
               <View style={styles.inputGroup}>
                   <Text style={styles.label}>Description</Text>
                   <TextInput 
                       style={[styles.input, styles.textArea]}
                       placeholder="Describe what you're selling (quality, reason for sale, etc.)"
                       value={description}
                       onChangeText={setDescription}
                       multiline
                       numberOfLines={4}
                       textAlignVertical="top"
                   />
               </View>

               {/* Location */}
               <View style={styles.inputGroup}>
                    <View style={styles.locationLabelRow}>
                        <Text style={styles.label}>Location*</Text>
                        <TouchableOpacity onPress={detectLocation} style={styles.detectBtn} disabled={isDetecting}>
                            {isDetecting ? <ActivityIndicator size="small" color={COLORS.primary} /> : <Ionicons name="locate" size={14} color={COLORS.primary} />}
                            <Text style={styles.detectText}>{isDetecting ? 'Detecting...' : 'Use My Current Location'}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.input, styles.locationInput]} onPress={() => setMapModalVisible(true)}>
                        <Ionicons name="map-outline" size={20} color="#757575" style={{marginRight: 8}} />
                        <Text style={{flex: 1, color: locationName ? '#111418' : '#BDBDBD'}} numberOfLines={1}>
                            {locationName || "Pick on Map"}
                        </Text>
                        <Ionicons name="chevron-forward" size={18} color="#757575" />
                    </TouchableOpacity>
               </View>
          </View>

          <View style={styles.trustBanner}>
              <Ionicons name="shield-checkmark" size={24} color={COLORS.primary} />
              <View style={{flex: 1}}>
                  <Text style={styles.trustTitle}>TrustMart Protection Active</Text>
                  <Text style={styles.trustDesc}>Your listing is covered by our secure escrow system. Payment is only released after buyer verifies the item.</Text>
              </View>
          </View>
      </ScrollView>

      <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.submitBtn, isSubmitting && { opacity: 0.7 }]} 
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
              {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
              ) : (
                  <>
                    <Text style={styles.submitText}>Post Listing</Text>
                    <Ionicons name="checkmark-circle" size={22} color="#fff" />
                  </>
              )}
          </TouchableOpacity>
      </View>

      {/* Category Modal */}
      <Modal visible={categoryModalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Select Category</Text>
                    <TouchableOpacity onPress={() => setCategoryModalVisible(false)}>
                        <Ionicons name="close" size={24} color="#111418" />
                    </TouchableOpacity>
                  </View>
                  {categories.map(cat => (
                      <TouchableOpacity 
                        key={cat} 
                        style={styles.modalItem}
                        onPress={() => {
                            setCategory(cat);
                            setCategoryModalVisible(false);
                        }}
                      >
                          <Text style={styles.modalItemText}>{cat}</Text>
                          {category === cat && <Ionicons name="checkmark" size={20} color={COLORS.primary} />}
                      </TouchableOpacity>
                  ))}
                  <View style={{height: 20}} />
              </View>
          </View>
      </Modal>

      {/* Map Modal */}
      <Modal visible={mapModalVisible} animationType="slide" transparent>
          <View style={styles.fullModalContainer}>
              <View style={styles.mapHeader}>
                  <TouchableOpacity onPress={() => setMapModalVisible(false)} style={styles.mapCloseBtn}>
                      <Ionicons name="arrow-back" size={24} color="#111418" />
                  </TouchableOpacity>
                  <Text style={styles.mapHeaderTitle}>Set Location</Text>
                  <TouchableOpacity onPress={() => setMapModalVisible(false)} style={styles.mapDoneBtn}>
                      <Text style={styles.mapDoneText}>Done</Text>
                  </TouchableOpacity>
              </View>
              
              <View style={styles.mapSearchBox}>
                  <Ionicons name="search" size={20} color="#9E9E9E" />
                  <TextInput 
                    style={styles.mapSearchInput}
                    placeholder="Search for area or street..."
                    value={locationName}
                    onChangeText={setLocationName}
                  />
              </View>

              <SafeMap
                style={styles.map}
                initialRegion={{
                  latitude: coords?.latitude || 37.4275,
                  longitude: coords?.longitude || -122.1697,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                coords={coords}
                onPress={(e) => {
                    const c = e.nativeEvent.coordinate;
                    setCoords(c);
                    Location.reverseGeocodeAsync(c).then(res => {
                        if (res.length > 0) {
                            const item = res[0];
                            setLocationName(`${item.name || ''}, ${item.city || item.region || ''}`);
                        }
                    });
                }}
              />

              <View style={styles.mapFooter}>
                  <View style={styles.selectedLocRow}>
                      <Ionicons name="location" size={20} color={COLORS.primary} />
                      <Text style={styles.selectedLocText} numberOfLines={2}>
                          {locationName || "Tap on map to select location"}
                      </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.confirmLocBtn} 
                    onPress={() => setMapModalVisible(false)}
                  >
                      <Text style={styles.confirmLocBtnText}>Confirm Location</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
  },
  closeBtn: {
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
  },
  headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111418',
  },
  sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginTop: 24,
      marginBottom: 12,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111418',
  },
  sectionSubtitle: {
      fontSize: 12,
      color: '#9E9E9E',
  },
  photoGrid: {
      paddingHorizontal: 16,
      gap: 12,
      marginBottom: 24,
      flexDirection: 'row',
  },
  addPhotoBtn: {
      width: 100,
      height: 100,
      borderRadius: 12,
      backgroundColor: 'rgba(0,102,255,0.05)',
      borderWidth: 2,
      borderColor: 'rgba(0,102,255,0.2)',
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
  },
  addPhotoText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLORS.primary,
  },
  photoWrapper: {
      width: 100,
      height: 100,
      position: 'relative',
  },
  photoItem: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
  },
  removePhotoBtn: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: '#fff',
      borderRadius: 10,
  },
  photoPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 12,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'center',
  },
  form: {
      paddingHorizontal: 16,
      gap: 20,
  },
  inputGroup: {
      gap: 6,
  },
  label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#111418',
      marginLeft: 4,
  },
  input: {
      height: 52,
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#111418',
  },
  dropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  priceInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 52,
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      paddingHorizontal: 16,
  },
  currencySymbol: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#757575',
      marginRight: 8,
  },
  priceInput: {
      flex: 1,
      fontSize: 16,
      color: '#111418',
  },
  conditionToggle: {
      flexDirection: 'row',
      backgroundColor: '#F1F5F9',
      padding: 4,
      borderRadius: 12,
      gap: 4,
  },
  conditionBtn: {
      flex: 1,
      height: 40,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
  },
  activeConditionBtn: {
      backgroundColor: '#fff',
      ...getShadow('#000', { width: 0, height: 2 }, 0.1, 4, 2),
  },
  conditionText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#64748B',
  },
  activeConditionText: {
      color: COLORS.primary,
  },
  textArea: {
      height: 100,
      paddingTop: 12,
  },
  locationLabelRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  detectBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  detectText: {
      fontSize: 11,
      fontWeight: 'bold',
      color: COLORS.primary,
  },
  locationInput: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  trustBanner: {
      marginHorizontal: 16,
      marginTop: 24,
      padding: 16,
      backgroundColor: '#F0F9FF',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#BAE6FD',
      flexDirection: 'row',
      gap: 12,
  },
  trustTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#0369A1',
  },
  trustDesc: {
      fontSize: 11,
      color: '#0C4A6E',
      lineHeight: 16,
      marginTop: 2,
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      padding: 16,
      paddingBottom: Platform.OS === 'ios' ? 32 : 16,
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
  },
  submitBtn: {
      backgroundColor: COLORS.primary,
      height: 56,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      ...getShadow(COLORS.primary, { width: 0, height: 8 }, 0.25, 12, 4),
  },
  submitText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
  },
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
  },
  modalContent: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
  },
  modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
  },
  modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
  },
  modalItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F1F5F9',
  },
  modalItemText: {
      fontSize: 16,
      color: '#1E293B',
      fontWeight: '500',
  },
  fullModalContainer: {
      flex: 1,
      backgroundColor: '#fff',
  },
  mapHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: Platform.OS === 'ios' ? 50 : 20,
      paddingHorizontal: 16,
      paddingBottom: 16,
      backgroundColor: '#fff',
  },
  mapHeaderTitle: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  mapDoneText: {
      color: COLORS.primary,
      fontWeight: 'bold',
      fontSize: 16,
  },
  mapSearchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 16,
      paddingHorizontal: 16,
      height: 50,
      backgroundColor: '#F1F5F9',
      borderRadius: 12,
  },
  mapSearchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 15,
  },
  map: {
      flex: 1,
  },
  mapFooter: {
      padding: 16,
      paddingBottom: Platform.OS === 'ios' ? 32 : 16,
      backgroundColor: '#fff',
      ...getShadow('#000', { width: 0, height: -4 }, 0.05, 10, 5),
  },
  selectedLocRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
      paddingHorizontal: 4,
  },
  selectedLocText: {
      fontSize: 14,
      color: '#1E293B',
      fontWeight: '500',
      flex: 1,
  },
  confirmLocBtn: {
      backgroundColor: COLORS.primary,
      height: 52,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
  },
  confirmLocBtnText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  }
});
