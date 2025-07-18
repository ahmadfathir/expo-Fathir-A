// NAMA : AHMAD FATHIR
// NIM  : 105841102922
// KELAS: 6A
// TUGAS2 LAB AKB

import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const GRID_COLUMNS = 3;
const GRID_PADDING = 16;
const GRID_SPACING = 4;
const CELL_SIZE =
  (width - GRID_PADDING * 2 - GRID_SPACING * (GRID_COLUMNS - 1)) /
  GRID_COLUMNS;

const MAX_SCALE = 2.0;
const SCALE_STEP = 0.2;

const images = [
  { main: require('../assets/images/1.jpeg'), alt: require('../assets/images/2.jpeg') },
  { main: require('../assets/images/3.jpeg'), alt: require('../assets/images/4.jpeg') },
  { main: require('../assets/images/5.jpeg'), alt: require('../assets/images/6.jpeg') },
  { main: require('../assets/images/7.jpeg'), alt: require('../assets/images/8.jpeg') },
  { main: require('../assets/images/9.jpeg'), alt: require('../assets/images/10.jpeg') },
  { main: require('../assets/images/11.jpeg'), alt: require('../assets/images/12.jpeg') },
  { main: require('../assets/images/13.jpeg'), alt: require('../assets/images/14.jpeg') },
  { main: require('../assets/images/15.jpeg'), alt: require('../assets/images/16.jpeg') },
  { main: require('../assets/images/17.jpeg'), alt: require('../assets/images/18.jpeg') },
];

const ImageGridCell = ({ imagePair, scaleAnim, isAlt, onPress, index }) => (
  <TouchableOpacity
    onPress={() => onPress(index)}
    activeOpacity={0.85}
    style={[styles.cell, { width: CELL_SIZE, height: CELL_SIZE }]}
  >
    <Animated.Image
      source={isAlt ? imagePair.alt : imagePair.main}
      style={[
        styles.image,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
      resizeMode="cover"
    />
  </TouchableOpacity>
);

export default function Index() {
  const [imageStates, setImageStates] = useState(
    images.map(() => ({
      scale: 1.0,
      scaleAnim: new Animated.Value(1.0),
      isAlt: false,
    }))
  );

  const onImagePress = useCallback((index) => {
    setImageStates((prevStates) => {
      const updatedStates = [...prevStates];
      const current = updatedStates[index];

      // Jika sudah mencapai 2.0, hentikan penambahan
      if (current.scale >= MAX_SCALE) {
        return prevStates; // tidak update state
      }

      let newScale = +(current.scale + SCALE_STEP).toFixed(1);
      let nextIsAlt = current.isAlt;

      // Jika akan mencapai 2.0, ubah ke gambar alternatif
      if (newScale >= MAX_SCALE) {
        newScale = MAX_SCALE;
        nextIsAlt = true;
      }

      Animated.spring(current.scaleAnim, {
        toValue: newScale,
        useNativeDriver: true,
      }).start();

      updatedStates[index] = {
        ...current,
        scale: newScale,
        isAlt: nextIsAlt,
      };

      return updatedStates;
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {images.map((img, idx) => (
          <ImageGridCell
            key={idx}
            imagePair={img}
            index={idx}
            onPress={onImagePress}
            isAlt={imageStates[idx].isAlt}
            scaleAnim={imageStates[idx].scaleAnim}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: GRID_PADDING,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: width - GRID_PADDING * 2,
  },
  cell: {
    marginBottom: GRID_SPACING,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
