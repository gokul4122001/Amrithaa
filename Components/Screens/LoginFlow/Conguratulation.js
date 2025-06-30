import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';
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
      <StatusBar backgroundColor={Colors.statusBar} barStyle="light-content" />
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
     fontFamily:Fonts.family.regular
  },
});

export default CongratulationsScreen;
