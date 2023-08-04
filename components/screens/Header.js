import React from "react";
import { Pressable, View, Image, Text } from "react-native";
import { useSelector } from "react-redux";

const Header = ({navigation, route}) => {
    const data = useSelector(state=>state)
    return (
        <View style={{
            width: '100%',
            height: 70,
            backgroundColor: '#808080',
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Pressable style={{
                width: '15%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }} onPress={() => navigation.navigate("Profile", {name:route.params.name})}>
                <Image
                    source={require('./../../assets/profile.png')}
                    style={{ width: 28, height: 28 }}
                />
            </Pressable>
            <Text style={{
                width: '40%',
            }}>{"Hello!\n" + route.params.name}</Text>
            <Pressable style={{
                width: '15%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }} onPress={() => navigation.navigate("Cart")}>
                <Image
                    source={require('./../../assets/cart.png')}
                    style={{ width: 24, height: 24 }}
                />
                <View 
                    style={{
                        width: 14,
                        height: 14,
                        backgroundColor:'red',
                        borderRadius: 7,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 20,
                        right: 12,
                    }}>
                    <Text>{data.Reducers.length}</Text>
                </View>
            </Pressable>
            <Pressable style={{
                width: '15%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }} onPress={() => navigation.navigate("Info")}>
                <Image
                    source={require('./../../assets/info.png')}
                    style={{ width: 24, height: 24 }}
                />
            </Pressable>
            <Pressable style={{
                width: '15%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }} onPress={() => navigation.navigate("Notification")}>
                <Image
                    source={require('./../../assets/bell.jpg')}
                    style={{ width: 24, height: 24 }}
                />
            </Pressable>
            <Pressable style={{
                width: '15%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }} onPress={() => navigation.navigate("Inbox")}>
                <Image
                    source={require('./../../assets/email.jpg')}
                    style={{ width: 24, height: 24 }}
                />
            </Pressable>
        </View>
    )
}
export default Header;