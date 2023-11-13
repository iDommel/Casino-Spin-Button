import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Canvas, Group, RoundedRect, runTiming, Skia, useComputedValue, useValue, vec } from '@shopify/react-native-skia';
import { processTransform3d, toMatrix3 } from "react-native-redash";

const colors = [
  "#ffd700",
  "#ffffff",
  "#c0c0c0",
  "#e5e4e2",
  "#f8f8ff"
];const NUM_OF_CONFETTI = 70;
const { height, width } = Dimensions.get("window");

const relativeSin = (yPosition, offsetId) => {
  const rand = Math.sin((yPosition - 500) * (Math.PI / 540));
  const otherrand = Math.cos((yPosition - 500) * (Math.PI / 540));
  return offsetId % 2 === 0 ? rand : -otherrand;
};


const ConfettiPiece = ({
    startingXOffset,
    startingYOffset,
    offsetId,
    colorCode,
  }) => {
    const WIDTH = 10;
    const HEIGHT = 30;
    const seed = Math.random() * 4;

    const centerY = useValue(0);
    const yPosition = useValue(startingYOffset);

    const origin = useComputedValue(() => {
      centerY.current = yPosition.current + HEIGHT / 2;
      const centerX = startingXOffset + WIDTH / 2;
      return vec(centerX, centerY.current);
    }, [yPosition]);

    runTiming(yPosition, height * 3, {
      duration: 3500,
    });

    const matrix = useComputedValue(() => {
      const rotateZ =
        relativeSin(yPosition.current, Math.round(Number(offsetId))) * seed * 2.5;
      const rotateY =
        relativeSin(yPosition.current, Math.round(Number(offsetId))) * seed * 1.5;
      const rotateX =
        relativeSin(yPosition.current, Math.round(Number(offsetId))) * seed * 1.5;
      const mat3 = toMatrix3(
        processTransform3d([
          { rotateY: rotateY },
          { rotateX: rotateX },
          { rotateZ: rotateZ },
        ])
      );

      return Skia.Matrix(mat3);
    }, [yPosition]);

    return (
      <Group matrix={matrix} origin={origin}>
        <RoundedRect
          r={8}
          x={startingXOffset}
          y={yPosition}
          height={WIDTH}
          width={HEIGHT}
          color={colors[colorCode]}
        />
      </Group>
    );
  };


export const ConfettiEffect = ({ trigger }) => {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (trigger) {
      startAnimation();
    }
  }, [trigger]);

  const startAnimation = () => {
    const pieces = [];

    for (let i = 0; i < NUM_OF_CONFETTI; i++) {
      const startingXOffset = Math.random() * width;
      const startingYOffset = -Math.random() * (height * 5);
      const id = i + Math.random() + "";
      pieces.push({
        offsetId: id,
        startingXOffset,
        startingYOffset,
        colorCode: i % colors.length,
      });
    }

    setConfettiPieces(pieces);
  };

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        {confettiPieces.map((offset) => (
          <ConfettiPiece key={offset.offsetId} {...offset} />
        ))}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
