import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HealthUmbrellaScreen = () => {
    const navigation = useNavigation();
  
  return (
    <>
    <ScrollView style={styles.container}>
      {/* Skip Button */}
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login6')}>
          <Text style={styles.skipText}>Skip ⏭</Text>
        </TouchableOpacity>
      </View>

    <View style={styles.header}>
   <View style={styles.logoRow1}>
           <View style={styles.logoRow}>
             <Image
               source={require('../../Assets/logos.png')}
               style={styles.logoImage}
             />
           </View>
           <View>
             <Text style={{fontSize:30,color:'#7518AA',fontWeight:'700',fontFamily:'Satoshi'}}>Health</Text>
             <Text style={{fontSize:30,color:'#7518AA',fontWeight:'700',fontFamily:'Satoshi'}}>Umbrella</Text>
 
           </View>
           </View>

  {/* Title and Subtitle */}
 <View style={styles.centeredContent}>
  <Text style={styles.title}>A - Z Health care service</Text>
  <Text style={styles.subtitle}>
    All your health needs connect with us For all emergency and routine health care needs
  </Text>
</View>

</View>

      
    </ScrollView>
<View style={{position:'absolute',justifyContent:'center',alignItems:'center',bottom:0}}>
    <Image source={require('../../Assets/log.png')} style={{ width: 410, height: 500 }} />

</View>
     
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipContainer: {
    alignItems: 'flex-end',
    padding: 16,
  },
  skipText: {
    color: '#555',
    fontWeight: 'bold',
  },
 
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 10,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
    margin: 5,
    borderRadius: 10,
  },
  pagination: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    fontSize: 18,
    color: '#999',
  },
  logoRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  justifyContent:'center'
},
logoImage: {
  width: 70,
  height: 70,
  marginRight: 8,
},
logoText: {
  fontSize: 18,
  color: '#8000ff',
  fontWeight: 'bold',
},
centeredContent: {
  alignItems: 'center',       // Center horizontally
  justifyContent: 'center',   // Optional: Center vertically if inside a flex container
  paddingHorizontal: 20,      // Optional: Padding for better text layout
  marginTop: 20,              // Space from top
},
title: {
  fontSize: 35,
  fontWeight: 'bold',
  textAlign: 'center',        // Ensures text wraps centered
  marginBottom: 10,
},
subtitle: {
  fontSize: 20,
  color: '#666',
  textAlign: 'center',
},
 logoRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    top:10
  },

});

export default HealthUmbrellaScreen;
