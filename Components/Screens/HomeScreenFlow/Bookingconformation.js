import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

const Bookingconformation = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {!showText ? (
        <ActivityIndicator size="large" color="#6f42c1" style={styles.loader} />
      ) : (
        <Text style={styles.text}>Booking Confirmation</Text>
      )}
    </View>
  );
};

export default Bookingconformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6f42c1',
  },
  loader: {
    height: 100,
    width: 100,
  },
});
