import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, getShadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ChatConversationScreen({ navigation, route }) {
  const product = route.params?.product || {
      title: 'Sony XM4 Headphones',
      price: '$120',
      seller: 'Arjun Sharma',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop'
  };

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'received', text: `Hi Arjun! I'm interested in the ${product.title}. Is it still available?`, time: '10:45 AM' },
    { id: 2, type: 'sent', text: `Hey! Yes it is. It's in mint condition as shown in the photos.`, time: '10:48 AM' }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: Date.now(),
      type: 'sent',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#111418" />
        </TouchableOpacity>
        
        <View style={styles.avatarContainer}>
            <Ionicons name="person" size={20} color={COLORS.primary} />
        </View>
        
        <View style={{flex: 1}}>
            <Text style={styles.headerTitle}>{product.seller}</Text>
            <View style={styles.statusRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.statusText}>Online • Active Seller</Text>
            </View>
        </View>

        <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>

      <View style={styles.productSnippet}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
              <Image source={{uri: product.image}} style={styles.snippetImage} />
              <View>
                  <Text style={styles.snippetTitle}>{product.title}</Text>
                  <Text style={styles.snippetPrice}>{product.price}</Text>
              </View>
          </View>
          <View style={styles.safePayBadge}>
              <Ionicons name="shield-checkmark" size={12} color="#15803D" />
              <Text style={styles.safePayText}>Safe Pay</Text>
          </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles.chatContainer}>
              <View style={styles.dateLabel}>
                  <Text style={styles.dateText}>Today</Text>
              </View>
              
              {messages.map((msg) => (
                  <View key={msg.id} style={[
                      styles.msgRow, 
                      msg.type === 'sent' ? styles.msgRowSent : styles.msgRowReceived
                  ]}>
                      <View style={[
                          styles.msgBubble, 
                          msg.type === 'sent' ? styles.msgBubbleSent : styles.msgBubbleReceived
                      ]}>
                          <Text style={[
                              styles.msgText,
                              msg.type === 'sent' ? styles.msgTextSent : styles.msgTextReceived
                          ]}>{msg.text}</Text>
                      </View>
                      <Text style={styles.msgTime}>
                          {msg.time} {msg.type === 'sent' && '• Read'}
                      </Text>
                  </View>
              ))}

              <View style={styles.safetyTip}>
                  <Ionicons name="shield" size={16} color={COLORS.primary} />
                  <Text style={styles.safetyText}>
                      <Text style={{fontWeight: 'bold', color: '#111418'}}>Escrow Protection: </Text>
                      Your payment stays locked until you confirm inspection. Keep chats inside TrustMart for safety.
                  </Text>
              </View>
          </ScrollView>

          <View style={styles.inputArea}>
              <TouchableOpacity style={styles.attachBtn}>
                  <Ionicons name="add" size={24} color="#9E9E9E" />
              </TouchableOpacity>
              
              <View style={styles.inputWrapper}>
                  <TextInput
                      style={styles.textInput}
                      placeholder="Write a message..."
                      value={message}
                      onChangeText={setMessage}
                  />
              </View>

              <TouchableOpacity 
                style={[styles.sendBtn, message.trim().length > 0 ? styles.sendBtnActive : {}]}
                onPress={sendMessage}
                disabled={!message.trim()}
              >
                  <Ionicons name="send" size={20} color={message.trim().length > 0 ? "#fff" : "#9E9E9E"} />
              </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
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
      padding: 16,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
      gap: 12,
  },
  backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'center',
  },
  avatarContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,102,255,0.1)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(0,102,255,0.05)',
  },
  headerTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#111418',
  },
  statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  onlineDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#22C55E',
  },
  statusText: {
      fontSize: 10,
      color: '#60758a',
      fontWeight: '500',
  },
  productSnippet: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
  },
  snippetImage: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: '#F5F5F5',
  },
  snippetTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#111418',
  },
  snippetPrice: {
      fontSize: 11,
      fontWeight: 'bold',
      color: COLORS.primary,
  },
  safePayBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: '#F0FDF4',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
  },
  safePayText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#15803D',
      textTransform: 'uppercase',
  },
  chatContainer: {
      padding: 16,
      paddingBottom: 20,
  },
  dateLabel: {
      alignSelf: 'center',
      backgroundColor: 'rgba(229,231,235,0.5)',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      marginBottom: 16,
  },
  dateText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#60758a',
      textTransform: 'uppercase',
  },
  msgRow: {
      marginBottom: 16,
      maxWidth: '85%',
  },
  msgRowSent: {
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
  },
  msgRowReceived: {
      alignSelf: 'flex-start',
      alignItems: 'flex-start',
  },
  msgBubble: {
      padding: 12,
      borderRadius: 16,
  },
  msgBubbleSent: {
      backgroundColor: COLORS.primary,
      borderTopRightRadius: 2,
  },
  msgBubbleReceived: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 2,
      borderWidth: 1,
      borderColor: '#F0F0F0',
  },
  msgText: {
      fontSize: 14,
      lineHeight: 20,
  },
  msgTextSent: {
      color: '#fff',
  },
  msgTextReceived: {
      color: '#111418',
  },
  msgTime: {
      fontSize: 9,
      color: '#9E9E9E',
      marginTop: 4,
      marginHorizontal: 4,
  },
  safetyTip: {
      flexDirection: 'row',
      gap: 12,
      backgroundColor: 'rgba(0,102,255,0.05)',
      borderWidth: 1,
      borderColor: 'rgba(0,102,255,0.1)',
      borderRadius: 12,
      padding: 16,
      marginTop: 8,
      marginBottom: 16,
  },
  safetyText: {
      flex: 1,
      fontSize: 11,
      color: '#60758a',
      lineHeight: 16,
  },
  inputArea: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
      gap: 8,
  },
  attachBtn: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: '#F9FAFB',
      alignItems: 'center',
      justifyContent: 'center',
  },
  inputWrapper: {
      flex: 1,
      height: 44,
      backgroundColor: '#F9FAFB',
      borderRadius: 12,
      justifyContent: 'center',
      paddingHorizontal: 16,
  },
  textInput: {
      fontSize: 14,
      color: '#111418',
      height: '100%',
  },
  sendBtn: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: '#F3F4F6',
      alignItems: 'center',
      justifyContent: 'center',
  },
  sendBtnActive: {
      backgroundColor: COLORS.primary,
      ...getShadow(COLORS.primary, { width: 0, height: 4 }, 0.2, 8, 4),
  }
});
