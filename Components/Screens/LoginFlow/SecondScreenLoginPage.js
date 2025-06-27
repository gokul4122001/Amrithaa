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
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

// Import your other onboarding slides here
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
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6c1d95" />

        <View style={styles.topBar}>
          <Text style={styles.logoText}>Health Umbrella</Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.skip}>Skip ▶</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>For All Your Health Needs</Text>
        <Text style={styles.description}>
          Now you can Book services online – Ambulance, Home Care Nurse, Physiotherapist, Lab Tests,
          24-hour pharmacy, Hospital Services, Speciality Clinics and Funeral Services
        </Text>

        {/* Spinning Wheel (optional effect) */}
   
       
          {/* Center Circle */}
          <View style={{position:'absolute',top:"40%",left:10}} >
            <Image source={require('../../Assets/spin.png')} style={{ width: 400, height: 400 }} />
          
          </View>
        </View>
      

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

// Renders circular layout of icons
const renderIcons = () => {
  const items = [
    'Ambulance',
    'Homecare Nursing',
    'Physio-Therapy',
    'Lab Tests',
    'Hospital',
    'Funeral & Mortuary Service',
    'Speciality Clinics',
  ];

  return items.map((item, index) => {
    const angle = (index / items.length) * 2 * Math.PI;
    const x = centerX + Math.cos(angle) * 140 - 40;
    const y = centerY + Math.sin(angle) * 140 - 40;

    return (
      <View key={index} style={[styles.iconContainer, { top: y, left: x }]}>
        <Image source={require('../../Assets/logos.png')} style={styles.icon} />
        <Text style={styles.iconLabel}>{item}</Text>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6c1d95',
  },
  skip: {
    color: '#6c1d95',
    fontSize: 14,
    paddingTop: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  description: {
    textAlign: 'center',
    fontSize: 13,
    marginVertical: 10,
    paddingHorizontal: 15,
    color: '#444',
  },
  circleWrapper: {
    width: width,
    height: height * 0.6,
    position: 'relative',
  },
  iconGroup: {
    position: 'absolute',
    width: width,
    height: height * 0.6,
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: 80,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  iconLabel: {
    fontSize: 10,
    textAlign: 'center',
  },
 
  centerText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  centerSub: {
    fontSize: 10,
  },
  page: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
