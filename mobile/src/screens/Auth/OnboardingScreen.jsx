import React, { useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Dimensions, 
  FlatList, Animated, Image 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Discover best\nplaces',
    description: 'Find curated top-rated spots in any city you visit.',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600&q=80',
  },
  {
    id: '2',
    title: 'Save your\nfavorites',
    description: 'Bookmark the places you love and revisit them anytime.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
  },
  {
    id: '3',
    title: 'Premium\nexperiences',
    description: 'Unlock exclusive access to luxury stays and dining.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
  },
];

export default function OnboardingScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      navigation.replace('Login');
    }
  };

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      {/* Image in a frame */}
      <View style={styles.imageFrame}>
        <Image
          source={{ uri: item.image }}
          style={styles.slideImage}
          resizeMode="cover"
        />
      </View>

      {/* Text content */}
      <View style={styles.textContent}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      {/* Skip button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, SPACING.lg) }]}>
        {/* Pagination dots */}
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => {
            const dotWidth = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            const dotOpacity = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity: dotOpacity,
                    backgroundColor: COLORS.primary,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Next button */}
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.nextBtnText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    alignItems: 'flex-end',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
  },
  slide: {
    width: width,
    paddingHorizontal: SPACING.xl,
    justifyContent: 'center',
  },
  imageFrame: {
    width: width - SPACING.xl * 2,
    height: height * 0.4,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: '#FFF0F3',
    marginBottom: SPACING.xl,
    ...SHADOWS.md,
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  textContent: {
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: SPACING.md,
  },
  slideDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextBtn: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: RADIUS.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  nextBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
});
