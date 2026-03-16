import React from 'react';
import { View, Text } from 'react-native';

export const MapView = ({ children, style }) => (
  <View style={[style, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#E2E8F0' }]}>
    <Text>Map is running on web. (Use maps on actual device/emulator)</Text>
  </View>
);

export const Marker = ({ children }) => <View>{children}</View>;

export const PROVIDER_GOOGLE = "google";
