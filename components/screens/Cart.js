import React, { useState } from "react";
import {View, Pressable, Text, FlatList} from 'react-native';
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromCart } from "../redux/actions/Actions";

const Cart = ({navigation}) => {
    const [cartList, setCartList] = useState([]);
    const cartData = useSelector(state=>state.Reducers);
    const dispatch = useDispatch();
    return (
        <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center'
        }}>
            <FlatList data={cartData} renderItem={({item, index})=>{
                return(
                    <CartItem item={item}
                    onAddWishList={(item)=>{
                        dispatch(addToWishlist(item))
                    }}
                    onRemoveItem={()=>{
                        dispatch(removeFromCart(index))
                    }}
                    />
                )
            }}/>
        </View>
    )
}
export default Cart;