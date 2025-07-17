// NAMA : AHMAD FATHIR
// NIM  : 105841102922
// KELAS: 6A
// TUGAS2 LAB AKB

import React from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Dimensions, ScrollView, Alert } from 'react-native';

const { width } = Dimensions.get('window');
const GRID_SIZE = 3;
const GRID_WIDTH = width * 0.9;
const CELL_SIZE = Math.floor(GRID_WIDTH / GRID_SIZE);

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

// Validasi: jumlah & keunikan
const isUnique = arr => new Set(arr).size === arr.length;
if (imagesMain.length !== 9 || imagesAlt.length !== 9) {
  Alert.alert("Error", "Jumlah gambar utama dan alternatif harus tepat 9.");
} else if (!isUnique(imagesMain) || !isUnique(imagesAlt)) {
  console.warn('Ada gambar yang duplikat di imagesMain atau imagesAlt');
}

type ImgState = {
  scale: number;
  isAlt: boolean;
  scaleAnim: Animated.Value;
};

export default function App() {
  const [imageStates, setImageStates] = React.useState<ImgState[]>(
    Array(9).fill(0).map(() => ({
      scale: 1,
      isAlt: false,
      scaleAnim: new Animated.Value(1),
    }))
  );

  // ✅ handleImagePress lengkap
  const handleImagePress = (index: number) => {
    setImageStates(prev =>
      prev.map((item, i) => {
        if (i !== index) return item;

        // Jika sedang alternatif dan sudah 2x, reset
        if (item.isAlt && item.scale === 2) {
          Animated.spring(item.scaleAnim, { toValue: 1, useNativeDriver: true }).start();
          return { ...item, scale: 1, isAlt: false };
        }

        // Tambah skala 0.2, maksimal 2
        let nextScale = +(item.scale + 0.2).toFixed(2);
        if (nextScale > 2) nextScale = 2;

        // Jika mencapai 2x, ganti ke alternatif
        const nextIsAlt = nextScale === 2 ? true : item.isAlt;

        Animated.spring(item.scaleAnim, { toValue: nextScale, useNativeDriver: true }).start();

        return { ...item, scale: nextScale, isAlt: nextIsAlt };
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={[styles.grid, { width: GRID_WIDTH, height: GRID_WIDTH }]}>
          {imageStates.map((state, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.cell, { width: CELL_SIZE, aspectRatio: 1 }]}
              onPress={() => handleImagePress(idx)}
              activeOpacity={0.8}
            >
              <Animated.Image
                source={state.isAlt ? imagesAlt[idx] : imagesMain[idx]}
                style={[
                  styles.image,
                  {
                    transform: [{ scale: state.scaleAnim }]
                  }
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

// ✅ Semua sel dijamin square & konsisten
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    alignContent: 'flex-start',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
