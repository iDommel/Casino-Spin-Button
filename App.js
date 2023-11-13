import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const fullsound_file = require('./assets/fullsound.wav');

  const handlePress = async () => {
    // Load sounds
    const { sound: loadedfullsound } = await Audio.Sound.createAsync(fullsound_file);

    // Play the start sound and wait for it to finish
    await loadedfullsound.playAsync();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.spinButton}
        onPress={handlePress}
      >
        <Text style={styles.spinButtonText}>Spin !</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e', // Dark background
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinButton: {
    backgroundColor: '#FF0000', // Red background
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // Half of width and height to make it circle
  },
  spinButtonText: {
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
});

