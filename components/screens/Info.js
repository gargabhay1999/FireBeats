// import React from "react";
// import {View, Pressable, Text} from 'react-native';
// import { StripeProvider } from '@stripe/stripe-react-native';

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const Info = ({navigation}) => {
  const handlePayment = () => {
    const options = {
      description: 'Purchase Description',
      image: '',
      currency: 'INR',
      key: 'rzp_test_d1QZVzalhzoLIw',
      amount: 10000, // Amount in paisa (10000 paisa = 100 INR)
      name: 'Your App Name',
      prefill: {
        email: 'user@example.com',
        contact: '1234567890',
      },
      theme: { color: '#FF5733' },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // Handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // Handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Page</Text>
      <Pressable style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Make Payment</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Info;
