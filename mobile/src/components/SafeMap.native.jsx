import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function SafeMap({ style, initialRegion, onPress, coords, scrollEnabled, zoomEnabled }) {
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
