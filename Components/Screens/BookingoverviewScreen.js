import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookingOverviewScreen = ({ navigation }) => {
  const [assistanceRequired, setAssistanceRequired] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [info, setInfo] = useState('');

  const ambulanceCost = 1500;
  const assistanceCost = assistanceRequired ? 300 : 0;
  const totalCost = ambulanceCost + assistanceCost;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back-ios" size={20} color="#000" />
          <Text style={styles.headerTitle}>Booking Overview</Text>
        </TouchableOpacity>

        {/* Pickup & Drop */}
        <View style={styles.locationBlock}>
          <Text style={styles.label}>Pickup</Text>
          <Text style={styles.text}>West Mambalam, Chennai - 33</Text>
          <Text style={styles.label}>Drop</Text>
          <Text style={styles.text}>Vyasarpadi, Chennai - 39</Text>
        </View>

        {/* Ambulance Details */}
        <View style={styles.section}>
          <View style={styles.rowSpace}>
            <Text style={styles.sectionTitle}>Ambulance Details</Text>
            <Text style={styles.changeText}>Change</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.emoji}>🚑</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Patient Transfer</Text>
              <Text style={styles.subText}>Small (ECG, First Aid)</Text>
              <Text style={styles.subText}>Arrival Timing: 15 mins</Text>
            </View>
            <Text style={styles.price}>₹1,500</Text>
          </View>
        </View>

        {/* Includes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Includes</Text>
          <View style={styles.includesGrid}>
            {['Emergency Kit', 'Oxygen Tank', 'IV equipment', 'Cardiac Monitors', 'Ambulance Bed'].map((item, index) => (
              <View style={styles.includeItem} key={index}>
                <Icon name="check-circle" color="#7C3AED" size={20} />
                <Text style={styles.includeText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Patient Assistance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Assistance</Text>
          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setAssistanceRequired(false)}
          >
            <View style={[styles.radio, !assistanceRequired && styles.radioSelected]} />
            <Text style={styles.radioText}>Not Required Patient Assistance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setAssistanceRequired(true)}
          >
            <View style={[styles.radio, assistanceRequired && styles.radioSelected]} />
            <Text style={styles.radioText}>Required Patient Assistance</Text>
          </TouchableOpacity>
          {assistanceRequired && (
            <Text style={styles.assistCost}>The common amount ₹300</Text>
          )}
        </View>

        {/* Customer Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Customer Details</Text>
          <TextInput
            placeholder="Customer Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Customer Mobile Number"
            style={styles.input}
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />
          <TextInput
            placeholder="Write additional information here"
            style={[styles.input, { height: 80 }]}
            multiline
            value={info}
            onChangeText={setInfo}
          />
        </View>

        {/* Price Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.rowSpace}>
            <Text>Ambulance Cost</Text>
            <Text>₹{ambulanceCost}</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text>Assistance for the Patient</Text>
            <Text>₹{assistanceCost}</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalLabel}>₹{totalCost}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={() => navigation.navigate('LoadingScreen')}
      >
        <Text style={styles.payButtonText}>Pay now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BookingOverviewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, paddingBottom: 100 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  locationBlock: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333' },
  text: { fontSize: 14, marginBottom: 10, color: '#000' },
  subText: { fontSize: 12, color: '#666' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 10 },
  changeText: { fontSize: 14, color: '#7C3AED' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowSpace: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  emoji: { fontSize: 30 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  includesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  includeItem: { flexDirection: 'row', alignItems: 'center', gap: 5, width: '48%', marginBottom: 8 },
  includeText: { fontSize: 12, color: '#000' },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#7C3AED',
    marginRight: 10
  },
  radioSelected: { backgroundColor: '#7C3AED' },
  radioText: { fontSize: 14, color: '#000' },
  assistCost: { fontSize: 12, color: '#7C3AED', marginTop: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10
  },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  payButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4
  },
  payButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
