// NAMA : AHMAD FATHIR
// NIM  : 105841102922
// KELAS: 6A
// TUGAS2 LAB AKB

import React from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');
const GRID_SIZE = 3;
const GRID_WIDTH = width * 0.9;
const CELL_SIZE = GRID_WIDTH / GRID_SIZE;

const imagesMain = [
  require('../assets/images/1.jpeg'),
  require('../assets/images/2.jpeg'),
  require('../assets/images/3.jpeg'),
  require('../assets/images/4.jpeg'),
  require('../assets/images/5.jpeg'),
  require('../assets/images/6.jpeg'),
  require('../assets/images/7.jpeg'),
  require('../assets/images/8.jpeg'),
  require('../assets/images/9.jpeg'),
];

const imagesAlt = [
  require('../assets/images/10.jpeg'),
  require('../assets/images/11.jpeg'),
  require('../assets/images/12.jpeg'),
  require('../assets/images/13.jpeg'),
  require('../assets/images/14.jpeg'),
  require('../assets/images/15.jpeg'),
  require('../assets/images/16.jpeg'),
  require('../assets/images/17.jpeg'),
  require('../assets/images/18.jpeg'),
];

type ImgState = {
  scale: number,
  isAlt: boolean,
  scaleAnim: Animated.Value,
};

export default function App() {
  // Setiap gambar memiliki state: scale, isAlt, dan scaleAnim (Animated.Value)
  const [imageStates, setImageStates] = React.useState<ImgState[]>(
    Array(9).fill(0).map(() => ({
      scale: 1,
      isAlt: false,
      scaleAnim: new Animated.Value(1),
    }))
  );

  // Handler individu
  const handleImagePress = (idx: number) => {
    setImageStates(prev =>
      prev.map((item, i) => {
        if (i !== idx) return item;

        // Jika gambar sedang alternatif dan scale 2, klik: reset ke 1 dan kembali ke utama
        if (item.isAlt && item.scale === 2) {
          Animated.spring(item.scaleAnim, { toValue: 1, useNativeDriver: true }).start();
          return { ...item, scale: 1, isAlt: false };
        }

        // Jika scale < 2, naikkan +0.2 (maksimal 2)
        let nextScale = +(item.scale + 0.2).toFixed(2);
        if (nextScale > 2) nextScale = 2;

        // Begitu tepat 2, ganti ke alternatif
        const toAlt = nextScale === 2 ? true : item.isAlt;

        Animated.spring(item.scaleAnim, { toValue: nextScale, useNativeDriver: true }).start();

        return { ...item, scale: nextScale, isAlt: toAlt };
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={[styles.grid, { width: GRID_WIDTH }]}>
          {imageStates.map((state, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.cell, { width: CELL_SIZE, height: CELL_SIZE }]}
              activeOpacity={0.7}
              onPress={() => handleImagePress(idx)}
            >
              <Animated.Image
                source={state.isAlt ? imagesAlt[idx] : imagesMain[idx]}
                style={[
                  styles.image,
                  { transform: [{ scale: state.scaleAnim }] }
                ]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  }
});
