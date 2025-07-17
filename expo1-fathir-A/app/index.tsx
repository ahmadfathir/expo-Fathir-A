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

// Validasi jumlah gambar di awal, agar tidak crash
if (imagesMain.length !== 9 || imagesAlt.length !== 9) {
  Alert.alert(
    "Error",
    "Jumlah gambar utama dan alternatif harus tepat 9.",
    [{ text: "OK" }]
  );
}

type ImgCellState = {
  scale: number;
  isAlt: boolean;
  scaleAnim: Animated.Value;
};

export default function App() {
  // Setiap cell punya: scale, scaleAnim, isAlt
  const [imageStates, setImageStates] = React.useState<ImgCellState[]>(
    Array(9).fill(0).map(() => ({
      scale: 1,
      isAlt: false,
      scaleAnim: new Animated.Value(1),
    }))
  );

  // Fungsi handle klik per cell
  const handleImagePress = (idx: number) => {
    setImageStates(prev =>
      prev.map((item, i) => {
        if (i !== idx) return item;
        // Jika sudah alternatif & scale 2, klik = reset ke utama & scale 1
        if (item.isAlt && item.scale === 2) {
          Animated.spring(item.scaleAnim, { toValue: 1, useNativeDriver: true }).start();
          return { ...item, scale: 1, isAlt: false };
        }
        // Kalau belum 2x, naikkan 0.2 step, maksimal 2
        let nextScale = +(item.scale + 0.2).toFixed(2);
        if (nextScale > 2) nextScale = 2;
        // Jika mencapai 2x, otomatis ganti gambar alternatif
        let nextIsAlt = item.isAlt;
        if (!item.isAlt && nextScale === 2) nextIsAlt = true;
        Animated.spring(item.scaleAnim, { toValue: nextScale, useNativeDriver: true }).start();
        return { ...item, scale: nextScale, isAlt: nextIsAlt };
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={[styles.grid, { width: GRID_WIDTH, height: GRID_WIDTH }]}>
          {imageStates.map((state, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.cell,
                {
                  width: CELL_SIZE,
                  aspectRatio: 1, // square, fix ratio
                },
              ]}
              activeOpacity={0.85}
              onPress={() => handleImagePress(idx)}
            >
              <Animated.Image
                source={
                  imagesMain.length === 9 && imagesAlt.length === 9
                    ? (state.isAlt ? imagesAlt[idx] : imagesMain[idx])
                    : require('../assets/images/placeholder.png') // fallback
                }
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
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    alignContent: 'flex-start',
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
