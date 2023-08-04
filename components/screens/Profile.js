import React, { useEffect } from "react";
import { Pressable, View, Image, Text, FlatList, TouchableOpacity } from "react-native";

const Profile = ({navigation, route}) => {
    return (
        <View style={{flex: 1}}>
            <View style={{width: '100%', height: 70, justifyContent: "space-between", flexDirection:'row', alignItems:'center'}}>
                <Text style={{fontWeight: 600, marginLeft: 20}}>Profile</Text>
                <TouchableOpacity style={{width:30, height: 30, marginRight:20, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('./../../assets/settings.png')}
                        style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
            </View>
            <Image source={require('./../../assets/profile.png')}
                style={{ width: 100, height: 100, alignSelf:'center', marginTop: 20 }} />
            <Text style={{alignSelf:'center', marginTop: 20}}>{route.params.name}</Text>
            <TouchableOpacity 
                style={{width:'90%', alignSelf:'center',height:50, borderBottomWidth:3, borderBottomColor:'#8e8e8e',justifyContent:'center'}}
                onPress={()=>{
                    navigation.navigate("MyAddress")
                }}   
            >
                <Text>My Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'90%', alignSelf:'center',height:50, borderBottomWidth:3, borderBottomColor:'#8e8e8e',justifyContent:'center'}}>
                <Text>My Orders</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Profile;