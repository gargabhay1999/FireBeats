import React, { useEffect, useState } from "react";
import { Pressable, View, Image, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, TextInput } from "react-native";

const AddAddress = ({ navigation }) => {
    const [city, setCity] = useState('');
    const [building, setBuilding] = useState('');
    const [pincode, setPincode] = useState('');
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: 70, justifyContent: "space-between", flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        marginLeft: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 20
                    }}
                    onPress={() => { navigation.goBack("MyAddress") }}>
                    <Image source={require('./../../assets/left-arrow.png')}
                        style={{ width: 24, height: 24, alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>
            <SafeAreaView>
                <TextInput
                    placeholder={'Enter City Name'}
                    style={styles.input}
                    onChangeText={text => {
                        setCity(text);
                    }}
                    value={city}
                />
                <TextInput
                    placeholder={'Enter Building Name'}
                    style={styles.input}
                    onChangeText={text => {
                        setBuilding(text);
                    }}
                    value={building}
                />
                <TextInput
                    placeholder={'Enter Pincode'}
                    style={styles.input}
                    onChangeText={text => {
                        setPincode(text);
                    }}
                    value={pincode}
                    keyboardType={'number-pad'}
                />
            </SafeAreaView>
            <Pressable 
                style={{
                    alignItems:'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    borderRadius: '4',
                    elevation: 3,
                    backgroundColor: '#000',
                    marginTop: 20,
                    width: '95%',
                    alignSelf:'center'
                }}
                onPress={() => navigation.navigate("MyAddress")}>
                    <Text style={{color:'#fff'}}>{"Save Address"}</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default AddAddress;