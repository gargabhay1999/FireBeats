import React, { useState } from "react";
import { Pressable, View, Image, ToastAndroid, Text, FlatList, TouchableOpacity, Modal, Button } from "react-native";

const ProductCard = ({item, onAddToCart, onAddWishList}) => {
    
    const [isInfoModalVisible, setInfoModalVisible] = useState(false);
    const toggleInfoModal = () => {
        setInfoModalVisible(!isInfoModalVisible);
    };
    return (
        <View style={{
            width: '90%',
            height: 450,
            borderRadius: 10,
            elevation: 5,
            backgroundColor: '#fff',
            marginLeft: 20,
            marginBottom: 10,
            marginRight: 50
        }}>
            <Image source={item.image} style={{width: '100%', height: '70%', borderTopLeftRadius: 10, borderTopRightRadius: 10}}/>
            <View
                style={{flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{marginTop: 5, fontSize: 18, paddingLeft: 10, fontWeight: '600'}}>{item.name}</Text>
                <Text style={{marginTop: 5, fontSize: 18, fontWeight: '200', textDecorationLine:'line-through'}}>
                    {"Regular Price: $" + item.price}
                </Text>
                <Text style={{marginTop: 5, fontSize: 18, fontWeight: '600'}}>
                    {"You Pay: $" + item.discountedPrice}
                </Text>
                <TouchableOpacity style={{
                    marginTop: 5,
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 5,
                    backgroundColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onPress={()=>{
                    onAddToCart(item)
                    ToastAndroid.showWithGravity(
                        'Item has been added to the cart.',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }}>
                    <Text style={{color:'white', fontSize:16}}>{"Add to Cart"}</Text>
                </TouchableOpacity>
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
                <Image source={require('./../../assets/share.png')} style={{width: 27, height: 35}}/>
            </TouchableOpacity>
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
            }} onPress={()=>{
                onAddWishList(item)
                ToastAndroid.showWithGravity(
                    'Item has been added to the wishlist.',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }}>
                <Image source={require('./../../assets/heart.png')} style={{width: 24, height: 24}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{
                width: 40,
                height: 40,
                backgroundColor: '#fff',
                borderRadius: 25,
                elevation: 5,
                position: 'absolute',
                top: 125,
                left: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }} onPress={toggleInfoModal}
            >
                <Image source={require('./../../assets/info.png')} style={{width: 24, height: 24}}/>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isInfoModalVisible}
                onRequestClose={toggleInfoModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, marginBottom: 20 }}>Product Description</Text>
                    <Text>{item.details}</Text>
                    <TouchableOpacity
                        style={{
                            marginTop: 20,
                            width: '98%',
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 5,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginBottom: 10
                        }}
                        onPress={toggleInfoModal}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>Close</Text>
                    </TouchableOpacity> 
                </View>
            </Modal>
            
        </View>
    )

}
export default ProductCard;