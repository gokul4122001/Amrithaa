import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const CongratulationsScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to next screen after 3 seconds
 navigation.navigate('MainApp');
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f8f5ff" barStyle="dark-content" />
      <View style={styles.centerContent}>
        <Text style={styles.congratsText}> Congratulations </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5ff',
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
    fontFamily: 'roboto', 
  },
});

export default CongratulationsScreen;
