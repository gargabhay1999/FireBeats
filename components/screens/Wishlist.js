import React from "react";
import {View, Pressable, Text, FlatList} from 'react-native';
import { addToCart, removeFromWishlist } from "../redux/actions/Actions";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";

const Wishlist = ({navigation}) => {
    const wishlistData = useSelector(state=>state.Reducers2);
    const dispatch = useDispatch();
    return (
        <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center'
        }}>
            <FlatList data={wishlistData} renderItem={({item, index})=>{
                return(
                    <CartItem 
                    isWishlist={'abc'}
                    item={item}
                    onRemoveFromWishlist={()=>{
                        dispatch(removeFromWishlist(index));
                    }}
                    onAddToCart={(item)=>{
                        dispatch(addToCart(item));
                    }}
                    />
                )
            }}/>
        </View>
    )
}
export default Wishlist;