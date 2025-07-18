import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CELL_SIZE = width * 0.25; // 25% dari lebar layar
const GRID_SPACING = 6;

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

const ImageGridCell = ({ imagePair, scaleAnim, isAlt, onPress, index, disabled }) => (
  <TouchableOpacity
    onPress={() => !disabled && onPress(index)}
    activeOpacity={disabled ? 1 : 0.85}
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
      clickCount: 0,
      locked: false,
    }))
  );

  const onImagePress = useCallback((index) => {
    setImageStates((prevStates) => {
      const newStates = [...prevStates];
      const current = newStates[index];

      if (current.locked) return prevStates;

      let nextClickCount = current.clickCount + 1;
      let nextScale = current.scale;
      let nextIsAlt = current.isAlt;
      let nextLocked = false;

      if (nextClickCount === 1) {
        nextScale = 1.2;
      } else if (nextClickCount === 2) {
        nextScale = 1.2;
        nextIsAlt = true;
        nextLocked = true;
      }

      Animated.spring(current.scaleAnim, {
        toValue: nextScale,
        useNativeDriver: true,
      }).start();

      newStates[index] = {
        ...current,
        scale: nextScale,
        isAlt: nextIsAlt,
        clickCount: nextClickCount,
        locked: nextLocked,
      };

      return newStates;
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
            disabled={imageStates[idx].locked}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: GRID_SPACING,
    rowGap: GRID_SPACING,
    paddingHorizontal: 10,
  },
  cell: {
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
