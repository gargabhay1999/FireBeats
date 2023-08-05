import React, { useState } from "react";
import { View, Pressable, Text, FlatList } from 'react-native';
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromCart } from "../redux/actions/Actions";
import RazorpayCheckout from 'react-native-razorpay';
// import { StripeProvider } from '@stripe/stripe-react-native';


const Cart = ({ navigation }) => {
    const [cartList, setCartList] = useState([]);
    const cartData = useSelector(state => state.Reducers);
    const dispatch = useDispatch();

    // Initialize Razorpay
    // RazorpayCheckout.init({
    //     key: 'zMKY2KAz8irZ1SwqodfaIQjw',
    // });

    //   const options = {
    //     description: 'Purchase Description',
    //     image: 'https://your-image-url.png',
    //     currency: 'INR',
    //     key: 'your-razorpay-key',
    //     amount: '100',
    //     name: 'Your App Name',
    //     prefill: {
    //       email: 'user@example.com',
    //       contact: '1234567890',
    //     },
    //     theme: { color: '#FF5733' },
    //   };

    //   RazorpayCheckout.open(options)
    //   .then((data) => {
    //     // Payment successful
    //     console.log('Payment successful:', data);
    //   })
    //   .catch((error) => {
    //     // Payment failed or user cancelled
    //     console.log('Payment error:', error);
    //   });

    return (
        <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center'
        }}>
            {cartData.length > 0 ? (
                <FlatList data={cartData} renderItem={({ item, index }) => {
                    return (
                        <CartItem item={item}
                            onAddWishList={(item) => {
                                dispatch(addToWishlist(item))
                            }}
                            onRemoveItem={() => {
                                dispatch(removeFromCart(index))
                            }}
                        />
                    )
                }} />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{'No Items Added in Cart.'}</Text>
                </View>
            )}

            {cartData.length > 0 ? (
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
                    onPress={() => {
                        // var options = {
                        //     description: 'Credits towards consultation',
                        //     image: 'https://i.imgur.com/3g7nmJC.png',
                        //     currency: 'INR',
                        //     key: 'zMKY2KAz8irZ1SwqodfaIQjw', // Your api key
                        //     amount: '5000',
                        //     name: 'foo',
                        //     prefill: {
                        //         email: 'void@razorpay.com',
                        //         contact: '9191919191',
                        //         name: 'Razorpay Software'
                        //     },
                        //     theme: { color: '#F37254' }
                        // }
                        const options = {
                            description: 'Purchase Description',
                            image: 'https://your-image-url.png',
                            currency: 'INR',
                            key: 'rzp_test_d1QZVzalhzoLIw',
                            amount: '100',
                            name: 'Your App Name',
                            prefill: {
                                email: 'user@example.com',
                                contact: '1234567890',
                            },
                            theme: { color: '#FF5733' },
                        };
                        RazorpayCheckout.open(options).then((data) => {
                            // handle success
                            alert(`Success: ${data.razorpay_payment_id}`);
                        }).catch((error) => {
                            // handle failure
                            alert(`Error: ${error.code} | ${error.description}`);
                        });
                    }}>
                    <Text style={{ color: '#fff' }}>{"Checkout"}</Text>
                </Pressable>
            ) : (null)}
        </View>
    )
}
export default Cart;