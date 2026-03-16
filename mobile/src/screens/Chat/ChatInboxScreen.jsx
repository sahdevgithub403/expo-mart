import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const CHATS = [
  {
    id: '1',
    name: 'Alex Johnson',
    message: 'Are we still meeting at the office at...',
    time: '12:45 PM',
    unreadCount: 2,
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Alex',
    online: true,
  },
  {
    id: '2',
    name: 'David Chen',
    message: "The presentation looks solid. Let's push ...",
    time: '10:20 AM',
    unreadCount: 0,
    avatar: 'https://avatar.iran.liara.run/public/boy?username=David',
    online: false,
  },
  {
    id: '3',
    name: 'Design Team',
    message: 'Sarah: The latest mocks are ready ...',
    time: '9:12 AM',
    unreadCount: 8,
    avatar: 'https://avatar.iran.liara.run/public/boy?username=Design',
    isGroup: true,
    online: false,
  },
  {
    id: '4',
    name: 'Robert Fox',
    message: 'See you then!',
    time: 'Yesterday',
    readStatus: true, // tick indicator mock
    unreadCount: 0,
    avatar: 'https://avatar.iran.liara.run/public/boy?username=Robert',
    online: false,
  },
  {
    id: '5',
    name: 'Maria Garcia',
    message: 'Photo',
    isMedia: true,
    time: 'Yesterday',
    unreadCount: 0,
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Maria',
    online: false,
  },
  {
    id: '6',
    name: 'James Wilson',
    message: 'Thanks for the help!',
    time: 'Monday',
    unreadCount: 0,
    avatar: 'https://avatar.iran.liara.run/public/boy?username=James',
    online: false,
    offlineBadge: true, // grey circle
  },
];

export default function ChatInboxScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 10) }]}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            <Image 
                source={{ uri: 'https://avatar.iran.liara.run/public/boy?username=Me' }} 
                style={styles.profileAvatar} 
            />
            <Text style={styles.headerTitle}>Messages</Text>
        </View>
        <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="search" size={24} color="#0F172A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="ellipsis-vertical" size={24} color="#0F172A" />
            </TouchableOpacity>
        </View>
      </View>

      {/* Segmented Control */}
      <View style={styles.segmentContainer}>
          <TouchableOpacity style={[styles.segmentBtn, styles.segmentActive]}>
              <Text style={[styles.segmentText, styles.segmentTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.segmentBtn}>
              <Text style={styles.segmentText}>Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.segmentBtn}>
              <Text style={styles.segmentText}>Unread</Text>
          </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CHATS.map((chat) => (
            <TouchableOpacity key={chat.id} style={styles.chatRow}>
                {/* Avatar Section */}
                <View style={styles.avatarContainer}>
                    {chat.isGroup ? (
                        <View style={styles.groupAvatarBg}>
                            <Ionicons name="people" size={24} color="#2563EB" />
                        </View>
                    ) : (
                        <Image source={{ uri: chat.avatar }} style={styles.avatarImg} />
                    )}
                    
                    {/* Status badges */}
                    {chat.online && <View style={styles.onlineBadge} />}
                    {chat.offlineBadge && <View style={styles.offlineBadge} />}
                </View>

                {/* Content Section */}
                <View style={styles.chatContent}>
                    <View style={styles.nameTimeRow}>
                        <Text style={styles.chatName}>{chat.name}</Text>
                        <Text style={[styles.chatTime, chat.unreadCount > 0 && styles.chatTimeUnread]}>
                            {chat.time}
                        </Text>
                    </View>
                    
                    <View style={styles.messageRow}>
                        {chat.readStatus && <Ionicons name="checkmark-done" size={16} color="#94A3B8" style={{marginRight: 4}} />}
                        {chat.isMedia && <Ionicons name="image" size={14} color="#64748B" style={{marginRight: 4}} />}
                        <Text 
                            style={[
                                styles.chatMessage, 
                                chat.unreadCount > 0 && styles.chatMessageUnread
                            ]} 
                            numberOfLines={1}
                        >
                            {chat.message}
                        </Text>
                        
                        {chat.unreadCount > 0 && (
                            <View style={styles.unreadBadge}>
                                <Text style={styles.unreadBadgeText}>{chat.unreadCount}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
          <Ionicons name="pencil" size={24} color="#FFFFFF" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE4E1',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 16,
    padding: 2,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    marginHorizontal: 20,
    padding: 4,
    borderRadius: 12,
    marginBottom: 20,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  segmentTextActive: {
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // padding for tabs
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarImg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E2E8F0',
  },
  groupAvatarBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#F8FAFC', // match background
  },
  offlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#CBD5E1',
    borderWidth: 2,
    borderColor: '#F8FAFC',
  },
  chatContent: {
    flex: 1,
  },
  nameTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  chatTime: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  chatTimeUnread: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatMessage: {
    flex: 1,
    fontSize: 14,
    color: '#64748B',
  },
  chatMessageUnread: {
    color: '#0F172A',
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: '#2563EB',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20, // adjust above tab bar
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  }
});
