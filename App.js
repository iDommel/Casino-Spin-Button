import React, { useEffect, useState } from 'react';
import { View, TouchableHighlight, ImageBackground, Text, StyleSheet } from 'react-native';

import { Audio } from 'expo-av';
import { ConfettiEffect } from './src/ConfettiEffect'; // Import the confetti effect

export default function App() {
  const fullsound_file = require('./assets/fullsound.wav');
  const image = require("./assets/background1.png");
  const [isPressed, setIsPressed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePressIn = async () => {
    setIsPressed(true);
    if (!isPlaying) {
      setIsPlaying(true);
      const { sound: loadedfullsound } = await Audio.Sound.createAsync(fullsound_file);

      await loadedfullsound.playAsync();
      loadedfullsound.setOnPlaybackStatusUpdate(playbackStatus => {
        if (!playbackStatus.isPlaying) {
          setIsPlaying(false); // Re-enable the button when audio finishes
        }
      });
    }
  };

  const handlePressOut = async () => {
    setIsPressed(false);
  };


  return (
      <View style={styles.container}>
          <ImageBackground source={image} resizeMode="cover" style={styles.image} >
            <ConfettiEffect trigger={isPlaying} />
              <TouchableHighlight
                disabled={isPlaying} // Disable the button while playing
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                underlayColor={''} // Optional: color for the underlay
                style={[styles.spinButton, (isPressed && styles.pressedButton) || (isPlaying && styles.disabledButton)]}
              >
                <Text disabled={isPlaying} style={styles.spinButtonText}>SPIN</Text>
              </TouchableHighlight>
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
    backgroundColor: '#F2064C', // Red background
    width: 300, // Adjust size as needed
    height: 300, // Adjust size as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150, // Half of width and height to make it circle
    // Adding a white border
    borderWidth: 4, // Width of the border
    borderColor: '#FFFFFF', // White border

    // Adding a shadow
    shadowColor: '#000', // Shadow is black
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius

    // For Android, elevation helps to create a shadow effect
    elevation: 10,
  },
  disabledButton: {
    backgroundColor: '#999999', // Greyed out
    elevation: 0, // No shadow for disabled state
  },

  pressedButton: {
    elevation: 2, // Reduced elevation when pressed
    shadowOffset: { width: 0, height: 5 }, // Adjusted shadow position
    backgroundColor: '#b00135', // Optional: different background color when pressed
  },
  spinButtonText: {
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
    fontSize: 40,
  },
});

