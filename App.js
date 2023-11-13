import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { Audio } from 'expo-av';
import Countdown from 'react-native-countdown-component';

export default function App() {
  const [timer, setTimer] = useState(null);
  const [sound, setSound] = useState();

  const testSound1 = require('./assets/testsound.wav');
  const testSound2 = require('./assets/testsound2.mp3');

async function playSound(soundModule) {
  const { sound } = await Audio.Sound.createAsync(soundModule);
  setSound(sound);
  await sound.playAsync();
}
  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  }

  const handlePress = () => {
    playSound(testSound1);
    setTimer(
      <Countdown
        until={Math.random() * (6 - 3) + 3}
        size={20}
        onFinish={() => {
          stopSound();
          playSound(testSound2);
        }}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeToShow={['S']}
        timeLabels={{s: null}}
      />
    );
  };

  return (
    <View style={styles.container}>
      {timer}
      <Button title="Spin" onPress={handlePress} color="#841584" />
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
});

