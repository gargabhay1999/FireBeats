import { StripeProvider, useStripe, CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { Alert, View, Pressable, Text, Button, StyleSheet, TextInput } from "react-native";

const API_URL = "https://us-central1-essential-keep-394518.cloudfunctions.net/app";

// export default function CheckoutScreen() {
const Notification = ({navigation}) => {    
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { clientSecret, error } = await response.json();
        return { clientSecret, error };
    }

    const handlePayPress = async () => {
        //1.Gather the customer's billing information (e.g., email)
        if (!cardDetails?.complete || !email) {
            Alert.alert("Please enter Complete card details and Email");
            return;
        }
        const billingDetails = {
            email: email,
        };
        //2.Fetch the intent client secret from the backend
        try {
            const { clientSecret, error } = await fetchPaymentIntentClientSecret();
            //2. confirm the payment
            if (error) {
                console.log("Unable to process payment");
            } else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    type: "Card",
                    paymentMethodType: "Card",
                    billingDetails: billingDetails,
                });
                if (error) {
                    alert(`Payment Confirmation Error ${error.message}`);
                } else if (paymentIntent) {
                    alert("Payment Successful");
                    console.log("Payment successful ", paymentIntent);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handlePaymentPress = async () =>{
        //1.Gather the customer's billing information (e.g., email)
        if (!cardDetails?.complete || !email) {
            Alert.alert("Please enter Complete card details and Email");
            return;
        }
        const billingDetails = {
            email: email,
        };
        const { clientSecret, error } = await fetchPaymentIntentClientSecret();

        alert("Your Payment has been received. Thank you!");
        console.log("Your Payment has been received. Thank you! ", clientSecret);
        navigation.navigate("Cart");
    }

    return (
        <StripeProvider
            publishableKey="pk_test_51NbgfDSBx5aTVTJH6JQzmPorn6ORf1NmHBksfLEsLsJVADIUc61rGfXDeTytZWuFU6YFumvOS0k2Wj1a3wQiovvH00TxXu1fJe"
        >
        <View style={{flex:1}}>
            <TextInput
                autoCapitalize="none"
                placeholder="E-mail"
                keyboardType="email-address"
                onChange={value => setEmail(value.nativeEvent.text)}
                style={styles.input}
            />
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: "4242 4242 4242 4242",
                }}
                cardStyle={styles.card}
                style={styles.cardContainer}
                onCardChange={cardDetails => {
                    setCardDetails(cardDetails);
                }}
            />
            {/* <Button onPress={handlePayPress} title="Pay" disabled={loading} /> */}
            <Button onPress={handlePaymentPress} title="Pay" disabled={loading} />
        </View>
        </StripeProvider>

    );
}

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        margin: 20,
      },
    input: {
        backgroundColor: "#efefefef",
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
    },
    card: {
        backgroundColor: "#efefefef",
    },
    cardContainer: {
        height: 20,
        marginVertical: 30,
    },
});