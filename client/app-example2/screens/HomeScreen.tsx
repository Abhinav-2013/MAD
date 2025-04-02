import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

const { width, height } = Dimensions.get('window');

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

// Define your image array with relative paths to your assets
const images = [
  require('../../assets/images/sport1.jpg'),
  require('../../assets/images/sport2.jpg'),
  require('../../assets/images/sport3.jpg'),
  require('../../assets/images/sport4.jpg'),
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out the image
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        // Change image index and fade in the next image
        setBackgroundIndex((prevIndex) => (prevIndex + 1) % images.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    }, 4000); // 4 seconds for each slide

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [fadeAnim]);

  return (
    <View /*style={styles.container}*/>
      <Animated.View /*style={[styles.backgroundWrapper, { opacity: fadeAnim }]}*/>
        <ImageBackground
          source={images[backgroundIndex]}
          /*style={styles.background}*/
          resizeMode="cover"
        />
      </Animated.View>

      <View /*style={styles.overlay}*/>
        <Text /*style={styles.title}*/>Welcome to Sports Booking</Text>
        <TouchableOpacity
          /*style={styles.button}*/
          onPress={() => navigation.navigate('SelectSport')}
        >
          <Text /*style={styles.buttonText}*/>Book a Field</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;