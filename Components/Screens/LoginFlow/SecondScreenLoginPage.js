import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import SecoundSlide from '../LoginFlow/ThirdScreenLoginPage';
import ThirdSlide from '../LoginFlow/FourthScreenLoginPage';
import FourthSlide from '../LoginFlow/FifthScreenLoginPage';

const { width, height } = Dimensions.get('window');
const centerX = width / 2;
const centerY = height * 0.45;

export default function Onboarding() {
  const navigation = useNavigation();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleLastSlide = (index) => {
    if (index === 3) {
      setTimeout(() => {
        navigation.replace('Login');
      }, 500);
    }
  };

  return (
    <Swiper
      loop={false}
      showsPagination={true}
      dotColor="#ccc"
      activeDotColor="#6c1d95"
      onIndexChanged={handleLastSlide}
    >
      {/* Slide 1 */}
      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: -0, y: 0.3 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradientContainer}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

          {/* Skip Button */}
          <View style={styles.skipContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login6')}>
              <Text style={styles.skipText}>Skip ⏭</Text>
            </TouchableOpacity>
          </View>

          {/* Logo and Title */}
          <View style={styles.logoRow1}>
            <View style={styles.logoRow}>
              <Image
                source={require('../../Assets/logos.png')}
                style={styles.logoImage}
              />
            </View>
            <View style={{ top: 12 }}>
              <Text style={styles.logoText}>Health</Text>
              <Text style={styles.logoText}>Umbrella</Text>
            </View>
          </View>

          {/* Headings */}
          <Text style={styles.title}>For </Text>
          <Text style={styles.title2}>All Your Health Needs</Text>
          <Text style={styles.title1}>Now you can Book services online </Text>

          {/* Description */}
          <Text style={styles.description}>
            Ambulance, Home Care Nurse, Physiotherapist, Lab Tests, 24-hour pharmacy,
            Hospital Services, Speciality Clinics and Funeral Services
          </Text>

          {/* Center Circle Image */}
          <View style={styles.spinContainer}>
            <Image source={require('../../Assets/spin.png')} style={styles.spinImage} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Slide 2 */}
      <View style={styles.page}>
        <SecoundSlide />
      </View>

      {/* Slide 3 */}
      <View style={styles.page}>
        <ThirdSlide />
      </View>

      {/* Slide 4 */}
      <View style={styles.page}>
        <FourthSlide />
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: height * 0.05,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
  },
  title2: {
    textAlign: 'center',
    fontSize: width * 0.09,
    fontWeight: 'bold',
    marginTop: height * 0.01,
    color: '#000',
  },
  title1: {
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: height * 0.01,
    color: '#000',
  },
  description: {
    textAlign: 'center',
    fontSize: width * 0.04,
    marginVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    color: '#444',
  },
  spinContainer: {
    position: 'absolute',
    top: height * 0.47,
    left: width * 0.05,
  },
  spinImage: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: 'contain',
  },
  page: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipContainer: {
    position: 'absolute',
    top: height * 0.02,
    right: width * 0.05,
    zIndex: 1,
  },
  skipText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
    justifyContent: 'center',
  },
  logoImage: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  logoText: {
    fontSize: 30,
    color: '#7518AA',
    fontWeight: '700',
  },
  logoRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
