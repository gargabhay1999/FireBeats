import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { View, Pressable, Text, Button } from 'react-native';

export default function CheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const API_URL = 'http://localhost:80'

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`https://us-central1-essential-keep-394518.cloudfunctions.net/app/payment-sheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        console.log("response: " + response)
        const { paymentIntent, ephemeralKey, customer } = await response.json();
        console.log('paymentIntent: ' + paymentIntent);
        console.log('ephemeralKey: ' + ephemeralKey);
        console.log('customer: ' + customer);

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };


    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <StripeProvider
            publishableKey="pk_test_51NbgfDSBx5aTVTJH6JQzmPorn6ORf1NmHBksfLEsLsJVADIUc61rGfXDeTytZWuFU6YFumvOS0k2Wj1a3wQiovvH00TxXu1fJe"
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        >
            {/* <Button
                    variant="primary"
                    disabled={!loading}
                    title="Checkout"
                    onPress={openPaymentSheet}
                /> */}

            <Pressable
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    borderRadius: 4,
                    elevation: 3,
                    backgroundColor: '#000',
                    marginTop: 20,
                    width: '95%',
                    alignSelf: 'center'
                }}
                variant="primary"
                disabled={!loading}
                onPress={() => {
                    openPaymentSheet();
                }}>
                <Text style={{ color: 'white' }}>Stripe Pay</Text>
            </Pressable>
            {/* </Screen> */}
        </StripeProvider>

    );
}