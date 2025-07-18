// NAMA : AHMAD FATHIR
// NIM  : 105841102922
// KELAS: 6A
// TUGAS2 LAB AKB

import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const images = [
  { main: require('../assets/images/1.jpg'), alt: require('../assets/images/2.jpg') },
  { main: require('../assets/images/3.jpg'), alt: require('../assets/images/4.jpg') },
  { main: require('../assets/images/5.jpg'), alt: require('../assets/images/6.jpg') },
  { main: require('../assets/images/7.jpg'), alt: require('../assets/images/8.jpg') },
  { main: require('../assets/images/9.jpg'), alt: require('../assets/images/10.jpg') },
  { main: require('../assets/images/11.jpg'), alt: require('../assets/images/12.jpg') },
  { main: require('../assets/images/13.jpg'), alt: require('../assets/images/14.jpg') },
  { main: require('../assets/images/15.jpg'), alt: require('../assets/images/16.jpg') },
  { main: require('../assets/images/17.jpg'), alt: require('../assets/images/18.jpg') },
];

const ImageGridCell = ({ imagePair, index, count, onPress }) => {
  const scale = count === 1 ? 1.2 : count === 2 ? 2.0 : 1;
  const displayedImage = count % 2 === 1 ? imagePair.alt : imagePair.main;

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={() => onPress(index)}>
      <Image
        source={displayedImage}
        style={StyleSheet.flatten([
          styles.image,
          { transform: [{ scale }] },
        ])}
      />
    </TouchableOpacity>
  );
};

export default function Index() {
  const [clicks, setClicks] = useState(Array(images.length).fill(0));

  const onImagePress = useCallback((index) => {
    setClicks((prev) => {
      const updated = [...prev];
      updated[index] = Math.min(updated[index] + 1, 3);
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

const IMAGE_SIZE = 100;
const IMAGE_MARGIN = 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: (IMAGE_SIZE + IMAGE_MARGIN * 2) * 3,
    justifyContent: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    margin: IMAGE_MARGIN,
    backgroundColor: '#ccc',
    borderRadius: 6,
  },
});
