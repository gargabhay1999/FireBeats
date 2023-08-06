import { StripeProvider, useStripe, CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, FlatList, SafeAreaView, ScrollView } from "react-native";
import { Alert, Image, View, Pressable, Text, Button, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, removeFromCart } from "../redux/actions/Actions";

const API_URL = "https://us-central1-essential-keep-394518.cloudfunctions.net/app";

const Checkout = ({ navigation }) => {
    const cartData = useSelector(state => state.Reducers);
    const addressList = useSelector(state => state.AddressReducer);
    const dispatch = useDispatch();

    const [selectedAddress, setSelectedAddress] = useState('');
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
            // return;
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
                    redirect: "if_required"
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

    const handlePaymentPress = async () => {
        //1.Gather the customer's billing information (e.g., email)
        if (!cardDetails?.complete) {
            Alert.alert("Please enter Complete card details and Email");
            // return;
        }
        const billingDetails = {
            email: email,
        };
        const { clientSecret, error } = await fetchPaymentIntentClientSecret();

        alert("Your Payment has been received. Thank you!");
        console.log("Your Payment has been received. Thank you! ", clientSecret);
        dispatch(addOrder({items:cartData, total:getTotalPrice(), address:selectedAddress}))
        navigation.navigate("Order", {total:'300'});
    }

    const getTotalPrice = () => {
        let tempTotalPrice = 0;
        cartData.map((item) => {
            tempTotalPrice = tempTotalPrice + parseInt(item.discountedPrice);
        })
        return tempTotalPrice;
    }

    return (
        <StripeProvider
            publishableKey="pk_test_51NbgfDSBx5aTVTJH6JQzmPorn6ORf1NmHBksfLEsLsJVADIUc61rGfXDeTytZWuFU6YFumvOS0k2Wj1a3wQiovvH00TxXu1fJe"
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View>
                        <FlatList data={cartData} renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: '100%', height: 70, flexDirection: 'row', marginTop: 5 }}>
                                    <Image source={item.image} style={{ width: 70, height: 70, marginLeft: 10 }} />
                                    <View style={{ padding: 10 }}>
                                        <Text style={{ fontSize: 18 }}>{item.name}</Text>
                                        <Text style={{ marginTop: 10 }}>{'$ ' + item.discountedPrice}</Text>
                                    </View>
                                </View>
                            )
                        }} />
                    </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20,
                        paddingRight: 20,
                        marginTop: 30,
                        borderTopWidth: .5,
                        borderTopColor: '#8e8e8e8e',
                        height: 50
                    }}>
                        <Text>{'Total : '}</Text>
                        <Text>{'$ ' + getTotalPrice()}</Text>
                    </View>
                    <FlatList
                        style={{height:180}}
                        data={addressList}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: '100%', height: 150, borderWidth: 1, borderColor: '#8e8e8e', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{marginTop:10, marginLeft:20}}>{"Name: " + item.name}</Text>
                                        <Text style={{marginLeft:20}}>{"Email: " + item.email}</Text>
                                        <Text style={{marginLeft:20}}>{"Address: " + item.address}</Text>
                                        <Text style={{marginLeft:20}}>{"City: " + item.city}</Text>
                                        <Text style={{marginLeft:20}}>{"State: " + item.state}</Text>
                                        <Text style={{marginLeft:20}}>{"ZIP: " + item.zip}</Text>
                                        <Text style={{marginLeft:20, marginBottom:10}}>{"Country: " + item.country}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            borderWidth: .2,
                                            padding: 7,
                                            borderRadius: 10,
                                            marginRight: 20
                                        }}
                                        onPress={() => {
                                            setSelectedAddress(item.address + ', ' + item.city + ', ' + item.state +', '+ item.zip + ', '+item.country)
                                        }}
                                    >
                                        <Text>SELECT</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                    <View style={{marginBottom:10}}>
                    <Text style={{fontSize:16}}>Selected Address</Text>
                    <Text style={{marginLeft:20,fontSize:16}}>{selectedAddress==''?'Please select adress from above list.':selectedAddress}</Text>
                        
                    </View>
                    </View>
                <View>
                {/* <TextInput
                    autoCapitalize="none"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    onChange={value => setEmail(value.nativeEvent.text)}
                    style={styles.input}
                /> */}
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
                {/* <Button onPress={handlePayPress} title={"Pay With Card (Total: $ "+getTotalPrice()+")"} disabled={loading} /> */}
                <Button onPress={handlePaymentPress} title={"Pay With Card (Total: $ "+getTotalPrice()+")"} disabled={loading} />
            </View>
            </SafeAreaView>
            
        </StripeProvider>

    );
}

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
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
        marginVertical: 20,
    },
});