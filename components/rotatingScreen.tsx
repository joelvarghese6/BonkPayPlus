import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

export const RotatingScreen = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Spinning animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );

    // Pulsing animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    spinAnimation.start();
    pulseAnimation.start();

    return () => {
      spinAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <View style={styles.spinnerContainer}>
          {/* Outer spinning circle */}
          <Animated.View 
            style={[
              styles.outerCircle,
              { transform: [{ rotate: spin }] }
            ]} 
          />
          
          {/* Inner pulsing circle */}
          <Animated.View 
            style={[
              styles.innerCircle,
              { opacity: pulseValue }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  spinnerContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: 64,
    height: 64,
    borderWidth: 4,
    borderColor: '#E5E7EB',
    borderTopColor: '#3B82F6',
    borderRadius: 32,
  },
  innerCircle: {
    position: 'absolute',
    width: 48,
    height: 48,
    backgroundColor: '#3B82F6',
    borderRadius: 24,
  },
});

