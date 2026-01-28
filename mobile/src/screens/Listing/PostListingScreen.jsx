import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity,  SafeAreaView, Alert, Modal, ActivityIndicator, Platform } from 'react-native';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function PostListingScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const categories = ['Books', 'Cycles', 'Notes', 'Gadgets', 'Dorm', 'Others'];

  const detectLocation = () => {
      setIsDetecting(true);
      setTimeout(() => {
          setLocation("Stanford Campus, Building 4");
          setIsDetecting(false);
      }, 1500);
  };

  const handleSubmit = () => {
    if (!title || !price || !category || !location) {
      Alert.alert("Missing Fields", "Please fill out all fields including location.");
      return;
    }
    Alert.alert("Success", "Your listing has been posted successfully under escrow protection!", [
        { text: "OK", onPress: () => navigation.goBack() }
    ]);
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

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <Text style={styles.sectionSubtitle}>Add up to 5 photos</Text>
          </View>

          <View style={styles.photoGrid}>
             <TouchableOpacity style={styles.addPhotoBtn}>
                 <Ionicons name="camera" size={32} color={COLORS.primary} />
                 <Text style={styles.addPhotoText}>Add</Text>
             </TouchableOpacity>
             <View style={styles.photoPlaceholder}>
                <Ionicons name="image" size={24} color="#E0E0E0" />
             </View>
             <View style={styles.photoPlaceholder}>
                <Ionicons name="image" size={24} color="#E0E0E0" />
             </View>
          </View>

          <View style={styles.form}>
               <View style={styles.inputGroup}>
                   <Text style={styles.label}>Title</Text>
                   <TextInput 
                       style={styles.input}
                       placeholder="What are you selling?"
                       value={title}
                       onChangeText={setTitle}
                   />
               </View>

               <View style={styles.inputGroup}>
                   <Text style={styles.label}>Category</Text>
                   <TouchableOpacity 
                       style={[styles.input, styles.dropdown]}
                       onPress={() => setModalVisible(true)}
                   >
                       <Text style={{color: category ? '#111418' : '#BDBDBD'}}>{category || "Select Category"}</Text>
                       <Ionicons name="chevron-down" size={20} color="#757575" />
                   </TouchableOpacity>
               </View>

               <View style={styles.inputGroup}>
                   <Text style={styles.label}>Price</Text>
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

               <View style={styles.inputGroup}>
                   <View style={styles.locationLabelRow}>
                       <Text style={styles.label}>Location</Text>
                       <TouchableOpacity onPress={detectLocation} style={styles.detectBtn}>
                           {isDetecting ? <ActivityIndicator size="small" color={COLORS.primary} /> : <Ionicons name="locate" size={14} color={COLORS.primary} />}
                           <Text style={styles.detectText}>{isDetecting ? 'Detecting...' : 'Detect Location'}</Text>
                       </TouchableOpacity>
                   </View>
                   <TextInput 
                       style={styles.input}
                       placeholder="e.g. Stanford Campus"
                       value={location}
                       onChangeText={setLocation}
                   />
               </View>
          </View>

          <View style={styles.trustBanner}>
              <Ionicons name="shield-checkmark" size={24} color={COLORS.primary} />
              <View style={{flex: 1}}>
                  <Text style={styles.trustTitle}>TrustMart Escrow Active</Text>
                  <Text style={styles.trustDesc}>Your funds are protected. We handle the pickup verification and secure your payment.</Text>
              </View>
          </View>
      </ScrollView>

      <View style={styles.footer}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Post Listing</Text>
              <Ionicons name="checkmark" size={20} color="#fff" />
          </TouchableOpacity>
      </View>

      {/* Category Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Select Category</Text>
                  {categories.map(cat => (
                      <TouchableOpacity 
                        key={cat} 
                        style={styles.modalItem}
                        onPress={() => {
                            setCategory(cat);
                            setModalVisible(false);
                        }}
                      >
                          <Text style={styles.modalItemText}>{cat}</Text>
                          {category === cat && <Ionicons name="checkmark" size={20} color={COLORS.primary} />}
                      </TouchableOpacity>
                  ))}
                  <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModalVisible(false)}>
                      <Text style={styles.closeModalText}>Cancel</Text>
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
      backgroundColor: 'rgba(255,255,255,0.9)',
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
      flexDirection: 'row',
      paddingHorizontal: 16,
      gap: 12,
      marginBottom: 24,
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
      height: 48,
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E0E0E0',
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
      height: 48,
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E0E0E0',
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
  trustBanner: {
      marginHorizontal: 16,
      marginTop: 24,
      padding: 16,
      backgroundColor: 'rgba(0,102,255,0.05)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(0,102,255,0.1)',
      flexDirection: 'row',
      gap: 12,
  },
  trustTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.primary,
  },
  trustDesc: {
      fontSize: 11,
      color: '#60758a',
      lineHeight: 16,
      marginTop: 2,
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255,255,255,0.95)',
      padding: 16,
      paddingBottom: 32,
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
      gap: 8,
      ...getShadow(COLORS.primary, { width: 0, height: 4 }, 0.2, 8, 4),
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
  modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
  },
  modalItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F5F5F5',
  },
  modalItemText: {
      fontSize: 16,
      color: '#111418',
  },
  closeModalBtn: {
      marginTop: 20,
      padding: 16,
      alignItems: 'center',
  },
  closeModalText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#60758a',
  }

});
