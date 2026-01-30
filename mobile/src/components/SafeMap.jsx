import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

let MapView, Marker;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function SafeMap({ style, initialRegion, onPress, coords, scrollEnabled, zoomEnabled }) {
  if (Platform.OS === 'web') {
    return (
      <View style={[style, styles.webPlaceholder]}>
        <Text style={styles.webText}>Maps are currently available on Native Android/iOS.</Text>
        <Text style={styles.webSubText}>On Web, we recommend using Google Maps API for production.</Text>
      </View>
    );
  }

  return (
    <MapView
      style={style}
      initialRegion={initialRegion}
      onPress={onPress}
      scrollEnabled={scrollEnabled}
      zoomEnabled={zoomEnabled}
      pitchEnabled={false}
      rotateEnabled={false}
    >
      {coords && <Marker coordinate={coords} />}
    </MapView>
  );
}

const styles = StyleSheet.create({
  webPlaceholder: {
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
  },
  webText: {
    color: '#64748B',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  webSubText: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
  }
});
