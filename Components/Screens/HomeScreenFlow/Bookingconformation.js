import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Colors from '../../Colors/Colors';

const { width, height } = Dimensions.get('window');

const CongratulationsScreen = ({ navigation }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const showConfirmTimer = setTimeout(() => {
      setShowConfirmation(true);
    }, 5000); // after 5 sec, show confirmation animation

    const navTimer = setTimeout(() => {
      navigation.navigate('UnavailabledrivingScreen');
    }, 10000); // navigate after 10 sec total

    return () => {
      clearTimeout(showConfirmTimer);
      clearTimeout(navTimer);
    };
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
      style={styles.gradientContainer}
    >
      <StatusBar backgroundColor={Colors.statusBar} barStyle="light-content" />

      <View style={styles.contentWrapper}>
        <LottieView
          source={
            showConfirmation
              ? require('../../Assets/lottie/tick.json') // ✅ booking confirmed animation
              : require('../../Assets/lottie/loading.json') // ⏳ initial loading animation
          }
          autoPlay
          loop
          style={styles.lottieStyle}
        />

        {showConfirmation && (
          <>
            <Text style={styles.congratsText}>Booking Confirmed!</Text>
            <Text style={styles.congratsText2}>Ambulance Arriving Shortly</Text>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 35,
    fontWeight: '700',
    color: '#7518AA',
    textAlign: 'center',
    marginTop: 20,
  },
  congratsText2: {
    fontSize: 20,
    fontWeight: '700',
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  lottieStyle: {
    width: width * 0.8,
    height: height * 0.6,
  },
});

export default CongratulationsScreen;
