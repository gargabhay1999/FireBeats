import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Pressable, View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress } from "../redux/actions/Actions";
import { SafeAreaView } from "react-native";

let addressList = [];
const MyAddress = ({ navigation }) => {
    const isFocused = useIsFocused();
    const addressList = useSelector(state => state.AddressReducer);
    const dispatch = useDispatch();
    console.log("Address List: "+addressList);
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: 70, justifyContent: "space-between", flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 600, fontSize: 18, marginLeft: 20 }}>My Address</Text>
                <TouchableOpacity
                    style={{
                        marginRight: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 20
                    }}
                    onPress={() => { navigation.navigate("AddAddress") }}>
                    <Text>Add Address</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={addressList}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{width:'100%', height:150, borderWidth:2, borderColor:'#8e8e8e', alignSelf:'center', justifyContent:'space-between', flexDirection:'row', alignItems:'center', marginBottom:20}}>
                            <View>
                                <Text style={{marginTop:10, marginLeft:20}}>{"Name: " + item.name}</Text>
                                <Text style={{marginLeft:20}}>{"Email: " + item.email}</Text>
                                <Text style={{marginLeft:20}}>{"Address: " + item.address}</Text>
                                <Text style={{marginLeft:20}}>{"City: " + item.city}</Text>
                                <Text style={{marginLeft:20}}>{"State: " + item.state}</Text>
                                <Text style={{marginLeft:20}}>{"ZIP: " + item.zip}</Text>
                                <Text style={{marginLeft:20, marginBottom:10}}>{"Country: " + item.country}</Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    marginRight:20
                                }}
                                onPress={()=>{
                                    dispatch(deleteAddress(index));
                                }}
                            >
                                <Image 
                                    source={require('./../../assets/delete.png')}
                                    style={{ width: 24, height: 24, alignSelf: 'center' }}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
        </SafeAreaView>
    )
}
export default MyAddress;