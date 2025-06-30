import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CongratulationsScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('MainApp');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
      style={styles.gradientContainer}
    >
      <StatusBar backgroundColor="#7518AA" barStyle="dark-content" />
      <View style={styles.centerContent}>
        <Text style={styles.congratsText}>Congratulations</Text>
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
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratsText: {
    fontSize: 35,
    fontWeight: '700',
    color: '#188B0E',
    textAlign: 'center',
    fontFamily: 'Roboto', // Ensure 'Roboto' is available or use default
  },
});

export default CongratulationsScreen;
