import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';

import { Audio } from 'expo-av';
import { ConfettiEffect } from './src/ConfettiEffect'; // Import the confetti effect

export default function App() {
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const fullsound_file = require('./assets/fullsound.wav');
  const image = require("./assets/background1.png");

  useEffect(() => {
    if (triggerConfetti) {
      setTriggerConfetti(false); // Reset the confetti effect
    }
  }
  , [triggerConfetti]);


  const handlePress = async () => {
    const { sound: loadedfullsound } = await Audio.Sound.createAsync(fullsound_file);

    await loadedfullsound.playAsync();
    setTriggerConfetti(true); // Trigger the confetti effect
  };

  return (

      <View style={styles.container}>
          <ImageBackground source={image} resizeMode="cover" style={styles.image} >
            <ConfettiEffect trigger={triggerConfetti} />
            <TouchableOpacity style={styles.spinButton} onPress={handlePress}>
              <Text style={styles.spinButtonText}>Spin !</Text>
            </TouchableOpacity>
          </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Center content horizontally
  },
  image: {
    flex: 1,
    width: '100%', // Ensure it covers the full width
    height: '100%', // Ensure it covers the full height
    justifyContent: "center", // Center content vertically within the image
    alignItems: "center", // Center content horizontally within the image
  },
  spinButton: {
    backgroundColor: '#FF0000', // Red background
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // Half of width and height to make it circle
    // Adding a white border
    borderWidth: 2, // Width of the border
    borderColor: '#FFFFFF', // White border

    // Adding a shadow
    shadowColor: '#000', // Shadow is black
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius

    // For Android, elevation helps to create a shadow effect
    elevation: 5,
  },
  spinButtonText: {
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
});

