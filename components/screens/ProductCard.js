import React from "react";
import { Pressable, View, Image, Text, FlatList, TouchableOpacity } from "react-native";

const ProductCard = ({item}) => {
    return (
        <View style={{
            width: '100%',
            height: 450,
            borderRadius: '10',
            elevation: '5',
            backgroundColor: '#fff',
            marginLeft: 20,
            marginBottom: 10
        }}>
            <Image source={item.image} style={{width: '100%', height: '70%', borderTopLeftReadius: 10, borderTopRightReadius: 10}}/>
            <View
                style={{flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{marginTop: 5, fontSize: 18, paddingLeft: 10, fontWeight: '600'}}>{item.name}</Text>
                <Text style={{marginTop: 5, fontSize: 18, fontWeight: '200', textDecoration:'line-through'}}>
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
                    backgroundColor: 'green',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text>{"Add to Cart"}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{
                width: 50,
                height: 50,
                backgroundColor: 'fff',
                borderRadius: 25,
                elevation: 5,
                position: 'absolute',
                top: 20,
                left: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image source={require('./../../assets/share.png')} style={{width: 27, height: 35}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{
                width: 50,
                height: 50,
                backgroundColor: 'fff',
                borderRadius: 25,
                elevation: 5,
                position: 'absolute',
                top: 60,
                left: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image source={require('./../../assets/heart.jpeg')} style={{width: 24, height: 24}}/>
            </TouchableOpacity>
            
        </View>
    )

}
export default ProductCard;