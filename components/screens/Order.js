import React, { useEffect } from "react";
import { Pressable, View, Image, Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

const Order = ({navigation}) =>{
    const orders = useSelector(state => state.OrderReducer);
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <FlatList
                    data={orders}
                    renderItem={({item, index})=>{
                        return (
                            <View style={{width:'100%', borderWidth:0.5, justifyContent:'center', borderColor:'#8e8e8e'}}>
                                {item.items.map(x=>{
                                    return(
                                        <View
                                            style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                                            <Image
                                                source={x.image}
                                                style={{width:50, height:50, marginTop:10, marginLeft:20, marginBottom:10}}
                                            />
                                            <Text style={{marginLeft:20, fontSize:18}}>
                                                {x.name}
                                            </Text>
                                            <Text style={{marginLeft:20}}>
                                                {'Total: $ '+ x.discountedPrice}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    )
}
export default Order;