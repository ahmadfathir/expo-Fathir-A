import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.triangle} />

      <View style={styles.rectangle}>
        <Text style={styles.text}>AHMAD FATHIR</Text>
      </View>

      <View style={styles.capsule}>
        <Text style={styles.text}>NIM: 105841102922</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 50,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#007AFF',
  },
  rectangle: {
    width: 200,
    height: 80,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  capsule: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#FF5722',
    borderRadius: 50,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
