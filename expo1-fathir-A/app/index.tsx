// NAMA : AHMAD FATHIR
// NIM  : 105841102922
// KELAS: 6A
// TUGAS2 LAB AKB

import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const GRID_COLUMNS = 3;
const GRID_PADDING = 16;
const GRID_SPACING = 4;
const CELL_SIZE = (width - GRID_PADDING * 2 - GRID_SPACING * (GRID_COLUMNS - 1)) / GRID_COLUMNS;

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

const ImageGridCell = ({ imagePair, index, count, onPress }) => {
  const scale = count === 1 ? 1.2 : count === 2 ? 2.0 : 1;
  const displayedImage = count % 2 === 1 ? imagePair.alt : imagePair.main;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(index)}
      style={[styles.cell, { width: CELL_SIZE, height: CELL_SIZE }]}
    >
      <Image
        source={displayedImage}
        style={[styles.image, { transform: [{ scale }] }]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default function Index() {
  const [clicks, setClicks] = useState(Array(images.length).fill(0));

  const onImagePress = useCallback((index) => {
    setClicks((prev) => {
      const updated = [...prev];
      updated[index] = updated[index] >= 2 ? 0 : updated[index] + 1;
      return updated;
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
            count={clicks[idx]}
            onPress={onImagePress}
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
