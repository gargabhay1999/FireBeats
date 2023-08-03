import React from "react";
import { Pressable, View, Image, Text } from "react-native";

const Header = ({navigation, route}) => {
    return (
        <View style={{
            width: '100%',
            height: 70,
            backgroundColor: '#808080',
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Text style={{
                width: '40%',
                left: '15%'
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