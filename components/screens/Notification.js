import { StripeProvider, useStripe, CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { Alert, View, Pressable, Text, Button, StyleSheet, TextInput } from "react-native";

const Notification = ({navigation}) => {    
    return (
        <View style={{flex:1}}>
            <Text>Notification Screen</Text>
        </View>
    );
}

export default Notification;