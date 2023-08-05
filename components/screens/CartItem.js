import React from "react";
import { Pressable, View, Image, Text, FlatList, TouchableOpacity } from "react-native";

const CartItem = ({ item, onRemoveItem, onAddWishList, onRemoveFromWishlist, isWishlist, onAddToCart }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                width: 350,
                height: 450,
                borderRadius: 10,
                elevation: 5,
                backgroundColor: '#fff',
                marginTop: 20,
                marginLeft: 15,
                marginBottom: 10,
                marginRight: 15
            }}>
                <Image source={item.image} style={{ width: '100%', height: '70%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={{ marginTop: 5, fontSize: 18, paddingLeft: 10, fontWeight: '600' }}>{item.name}</Text>
                    <Text style={{ marginTop: 5, fontSize: 18, fontWeight: '200', textDecorationLine: 'line-through' }}>
                        {"Regular Price: $" + item.price}
                    </Text>
                    <Text style={{ marginTop: 5, fontSize: 18, fontWeight: '600' }}>
                        {"You Pay: $" + item.discountedPrice}
                    </Text>
                    {isWishlist ? (<TouchableOpacity style={{
                        marginTop: 5,
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onPress={() => {
                        onAddToCart(item)
                    }}>
                        <Text style={{color:'white', fontSize:16}}>{"Add to Cart"}</Text>
                    </TouchableOpacity>) : (
                        <TouchableOpacity style={{
                            marginTop: 5,
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 5,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} onPress={() => {
                            onRemoveItem(item)
                        }}>
                            <Text style={{color:'white', fontSize:16}}>{"Remove"}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#fff',
                    borderRadius: 25,
                    elevation: 5,
                    position: 'absolute',
                    top: 20,
                    left: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={require('./../../assets/share.png')} style={{ width: 27, height: 35 }} />
                </TouchableOpacity>
                {isWishlist ? (
                    <TouchableOpacity style={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#fff',
                        borderRadius: 25,
                        elevation: 5,
                        position: 'absolute',
                        top: 75,
                        left: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onPress={() => {
                        onRemoveFromWishlist()
                    }}>
                        <Image source={require('./../../assets/heartfill.png')} style={{ width: 24, height: 24, tintColor: 'red' }} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#fff',
                        borderRadius: 25,
                        elevation: 5,
                        position: 'absolute',
                        top: 75,
                        left: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onPress={() => {
                        onAddWishList(item)
                    }}>
                        <Image source={require('./../../assets/heart.jpeg')} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                )}

            </View>
        </View>
    )

}
export default CartItem;