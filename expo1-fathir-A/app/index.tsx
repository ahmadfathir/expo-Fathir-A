import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const imageData = [
  {
    main: "https://images.alphacoders.com/134/1341120.png",
    alternate: "https://images5.alphacoders.com/462/462370.jpg"
  },
  {
    main: "https://images5.alphacoders.com/133/1330264.png",
    alternate: "https://images4.alphacoders.com/417/41774.jpg"
  },
  {
    main: "https://images.alphacoders.com/824/824838.jpg",
    alternate: "https://images.alphacoders.com/773/773531.jpg"
  },
  {
    main: "https://images4.alphacoders.com/135/1358294.jpeg",
    alternate: "https://images3.alphacoders.com/121/121797.jpg"
  },
  {
    main: "https://images3.alphacoders.com/133/1330268.png",
    alternate: "https://images2.alphacoders.com/437/437349.jpg"
  },
  {
    main: "https://images2.alphacoders.com/634/6340.jpg",
    alternate: "https://images6.alphacoders.com/681/681657.jpg"
  },
  {
    main: "https://images.alphacoders.com/135/1357436.jpeg",
    alternate: "https://images.alphacoders.com/824/824838.jpg"
  },
  {
    main: "https://images.alphacoders.com/554/55473.jpg",
    alternate: "https://images4.alphacoders.com/242/242474.jpg"
  },
  {
    main: "https://images7.alphacoders.com/456/456120.jpg",
    alternate: "https://images6.alphacoders.com/407/407482.jpg"
  }
];

export default function Index() {
  const [clickCounts, setClickCounts] = useState(Array(9).fill(0));

  const handlePress = (index) => {
    if (clickCounts[index] < 2) {
      const newCounts = [...clickCounts];
      newCounts[index] += 1;
      setClickCounts(newCounts);
    }
  };

  const getScale = (count) => {
    if (count === 1) return 1.2;
    if (count === 2) return 2.0;
    return 1;
  };

  return (
    <View style={styles.container}>
      {/* Grid gambar 3x3 */}
      <View style={styles.gridContainer}>
        {imageData.map((imageSet, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            activeOpacity={0.8}
          >
            <Image
              source={{
                uri: clickCounts[index] % 2 === 1
                  ? imageSet.alternate
                  : imageSet.main
              }}
              style={[
                styles.image,
                {
                  transform: [{ scale: getScale(clickCounts[index]) }]
                }
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 306,  // (100 + 2) * 3
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 1,
    backgroundColor: '#ddd',
    borderRadius: 4
  }
});