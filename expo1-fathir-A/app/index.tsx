// NAMA : AHMAD FATHIR
// NIM  : 105841102922
// KELAS: 6A
// TUGAS2 LAB AKB

import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';

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

// Validasi array gambar
const isValidImageArray = (arr: any[]) =>
  Array.isArray(arr) && arr.length === 9 && new Set(arr).size === 9;

type ImgCellState = {
  scale: number;
  isAlt: boolean;
  scaleAnim: Animated.Value;
};

export default function App() {
  // Inisialisasi state individual untuk setiap sel gambar
  const [imageStates, setImageStates] = React.useState<ImgCellState[]>(
    Array(9)
      .fill(null)
      .map(() => ({
        scale: 1,
        isAlt: false,
        scaleAnim: new Animated.Value(1),
      }))
  );

  // Fungsi untuk menangani klik gambar
  const handleImagePress = (index: number) => {
    if (!isValidImageArray(imagesMain) || !isValidImageArray(imagesAlt)) return;

    setImageStates(prev =>
      prev.map((state, i) => {
        if (i !== index) return state;

        // Jika sudah alternatif dan skala maksimum, reset
        if (state.isAlt && state.scale === 2) {
          Animated.spring(state.scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
          return { ...state, scale: 1, isAlt: false };
        }

        // Tingkatkan skala bertahap (+0.2), maksimal 2.0
        const nextScale = Math.min(+(state.scale + 0.2).toFixed(1), 2);
        const nextIsAlt = nextScale === 2 ? true : state.isAlt;

        Animated.spring(state.scaleAnim, {
          toValue: nextScale,
          useNativeDriver: true,
        }).start();

        return {
          ...state,
          scale: nextScale,
          isAlt: nextIsAlt,
        };
      })
    );
  };

  const isReady = isValidImageArray(imagesMain) && isValidImageArray(imagesAlt);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {isReady ? (
          <View style={[styles.grid, { width: GRID_WIDTH, height: GRID_WIDTH }]}>
            {imageStates.map((state, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index)}
                activeOpacity={0.85}
                style={[styles.cell, { width: CELL_SIZE, aspectRatio: 1 }]}
              >
                <Animated.Image
                  source={state.isAlt ? imagesAlt[index] : imagesMain[index]}
                  style={[
                    styles.image,
                    { transform: [{ scale: state.scaleAnim }] },
                  ]}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.errorText}>
            Gambar tidak valid. Pastikan 9 gambar utama dan 9 gambar alternatif unik tersedia.
          </Text>
        )}
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
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  errorText: {
    padding: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
