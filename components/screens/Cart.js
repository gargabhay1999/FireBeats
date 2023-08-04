import React, { useState } from "react";
import { View, Pressable, Text, FlatList } from 'react-native';
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromCart } from "../redux/actions/Actions";

const Cart = ({ navigation }) => {
    const [cartList, setCartList] = useState([]);
    const cartData = useSelector(state => state.Reducers);
    const dispatch = useDispatch();
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

                    }}>
                    <Text style={{ color: '#fff' }}>{"Checkout"}</Text>
                </Pressable>
            ) : (null)}
        </View>
    )
}
export default Cart;