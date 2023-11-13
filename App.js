import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { ConfettiEffect } from './src/ConfettiEffect'; // Import the confetti effect

export default function App() {
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const fullsound_file = require('./assets/fullsound.wav');

  const handlePress = async () => {
    const { sound: loadedfullsound } = await Audio.Sound.createAsync(fullsound_file);

    await loadedfullsound.playAsync();
    setTriggerConfetti(true); // Trigger the confetti effect
  };

  return (
    <View style={styles.container}>
      <ConfettiEffect trigger={triggerConfetti} />
      <TouchableOpacity style={styles.spinButton} onPress={handlePress}>
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

