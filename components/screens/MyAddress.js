import React, { useEffect } from "react";
import { Pressable, View, Image, Text, FlatList, TouchableOpacity } from "react-native";

const MyAddress = ({navigation}) => {
    return (
        <View style={{flex: 1}}>
            <View style={{width: '100%', height: 70, justifyContent: "space-between", flexDirection:'row', alignItems:'center'}}>
                <Text style={{fontWeight: 600, fontSize:18, marginLeft: 20}}>My Address</Text>
                <TouchableOpacity 
                    style={{
                        marginRight:20, 
                        justifyContent:'center', 
                        alignItems:'center',
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 20
                    }}
                    onPress={()=>{navigation.navigate("AddAddress")}}>
                    <Text>Add Address</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default MyAddress;