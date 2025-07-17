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

export default function App() {
  const [imageStates, setImageStates] = React.useState(
    Array(9).fill(null).map(() => ({
      isAlt: false,
      scale: 1,
      scaleAnim: new Animated.Value(1),
    }))
  );

  const handleImagePress = (index: number) => {
    setImageStates(prevStates => {
      const newStates = prevStates.map((item, i) => {
        if (i === index) {
          // Jika masih gambar utama dan scale < 2
          if (!item.isAlt && item.scale < 2) {
            let newScale = +(item.scale + 0.2).toFixed(2);
            if (newScale >= 2) {
              // Jika sudah mencapai/melampaui 2, set ke 2 dan ganti ke alternatif
              Animated.spring(item.scaleAnim, {
                toValue: 2,
                useNativeDriver: true,
              }).start();
              return { ...item, isAlt: true, scale: 2 };
            } else {
              // Jika belum, lanjut naikkan skala
              Animated.spring(item.scaleAnim, {
                toValue: newScale,
                useNativeDriver: true,
              }).start();
              return { ...item, scale: newScale };
            }
          }
          // Jika sudah alternatif dan scale == 2, reset ke utama dan skala 1
          else if (item.isAlt && item.scale === 2) {
            Animated.spring(item.scaleAnim, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
            return { ...item, isAlt: false, scale: 1 };
          }
          // Jika ada edge case lain, default tidak berubah
        }
        return item;
      });
      return newStates;
    });
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={[styles.grid, { width: GRID_WIDTH }]}>
          {imageStates.map((state, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cell,
                { width: CELL_SIZE, height: CELL_SIZE }
              ]}
              activeOpacity={0.7}
              onPress={() => handleImagePress(index)}
            >
              <Animated.Image
                source={state.isAlt ? imagesAlt[index] : imagesMain[index]}
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
