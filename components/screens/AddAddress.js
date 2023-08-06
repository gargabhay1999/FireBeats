import React, { useEffect, useState } from "react";
import { Pressable, View, Image, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/actions/Actions";

const AddAddress = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const dispatch = useDispatch();
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
                    placeholder={'Enter Your Name'}
                    style={styles.input}
                    onChangeText={text => {
                        setName(text);
                    }}
                    value={name}
                />
                <TextInput
                    placeholder={'Enter Your Email'}
                    style={styles.input}
                    onChangeText={text => {
                        setEmail(text);
                    }}
                    value={email}
                />
                <TextInput
                    placeholder={'Enter Your Address'}
                    style={styles.input}
                    onChangeText={text => {
                        setAddress(text);
                    }}
                    value={address}
                />
                <TextInput
                    placeholder={'Enter City Name'}
                    style={styles.input}
                    onChangeText={text => {
                        setCity(text);
                    }}
                    value={city}
                />
                <TextInput
                    placeholder={'Enter State Code'}
                    style={styles.input}
                    onChangeText={text => {
                        setState(text);
                    }}
                    value={state}
                />
                <TextInput
                    placeholder={'Enter ZIP'}
                    style={styles.input}
                    onChangeText={text => {
                        setZip(text);
                    }}
                    value={zip}
                    keyboardType={'number-pad'}
                />
                <TextInput
                    placeholder={'Enter Country Name'}
                    style={styles.input}
                    onChangeText={text => {
                        setCountry(text);
                    }}
                    value={country}
                />
            </SafeAreaView>
            <Pressable 
                style={{
                    alignItems:'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    borderRadius: 4,
                    elevation: 3,
                    backgroundColor: '#000',
                    marginTop: 20,
                    width: '95%',
                    alignSelf:'center'
                }}
                onPress={() => {
                    if(name!=='' && email!=='' && address!='' && city!=='' && state!=='' && zip!=='') {
                        dispatch(addAddress({name:name, email:email, address:address, city:city, state:state, zip:zip, country:country}));
                        navigation.goBack("MyAddress")
                    }
                    
                }}>
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