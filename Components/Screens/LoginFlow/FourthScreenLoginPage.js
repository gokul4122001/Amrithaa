import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const OnboardingScreen5 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Skip Button */}
      <View style={styles.skipContainer}>
        <TouchableOpacity>
          <Text style={styles.skipText}>Skip ⏭</Text>
        </TouchableOpacity>
      </View>

      {/* Logo Row */}
      <View style={styles.logoRow}>
        <Image 
          source={require('../../Assets/logos.png')} 
          style={styles.logoImage} 
        />
        <Text style={styles.logoText}>Health Umbrella</Text>
      </View>

      {/* Heading and Subheading */}
      <Text style={styles.heading}>Book Your Physiotherapist</Text>
      <Text style={styles.subheading}>
        home visits / clinic appointments
      </Text>

      {/* Images */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../Assets/clini.png')} // 👈 Your doctor image
          style={styles.mainImage}
          resizeMode="contain"
        />
        <Image
          source={require('../../Assets/cliniakk2.png')} // 👈 Physiotherapy overlay
          style={styles.overlayImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default OnboardingScreen5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  skipContainer: {
    position: 'absolute',
    top: 10,
    right: -55,
    zIndex: 1,
  },
  skipText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 10,
    justifyContent: 'center',
  },
  logoImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    color: '#8000ff',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  subheading: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    position: 'relative',
  },
  mainImage: {
    width: width * 0.8,
    height: width * 1.0,
    position: 'absolute',
    top: 100,
    left: -90,
  },
  overlayImage: {
    width: width * 0.40,
    height: width * 0.35,
    borderRadius: 10,
    position: 'absolute',
    top: 110,
    left: '60%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
