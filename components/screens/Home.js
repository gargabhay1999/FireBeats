import { Pressable, View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from 'react';
import Listing from "./Listing";
import Header from "./Header";
import { products } from "./Products";
import ProductCard from "./ProductCard";

const Home = ({ navigation, route }) => {
    const [categoryList, setCategoryList] = useState([]);
    const [trackerList, setTrackerList] = useState([]);
    const [tshirtList, setTshirtList] = useState([]);
    const [jeansList, setJeansList] = useState([]);
    const [kurtaList, setKurtaList] = useState([]);
    const [shirtList, setShirtList] = useState([]);
    const [socksList, setSocksList] = useState([]);
    const [shoesList, setShoesList] = useState([]);

    useEffect(() => {
        console.log(products);
        let tempCategory = [];
        products.category.map(item => {
            tempCategory.push(item);
        })
        setCategoryList(tempCategory);
        setTshirtList(products.category[0].data);
        setJeansList(products.category[1].data);
        setKurtaList(products.category[2].data);
        setShirtList(products.category[3].data);
        setSocksList(products.category[4].data);
        setShoesList(products.category[5].data);
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Header route={route} navigation={navigation} />
            <View style={{marginTop: 80}}>
                <FlatList 
                    data={categoryList}
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity style={{padding: 10, borderWidth: 1, marginLeft: 20, borderRadius: 20}}>
                            <Text>{item.category}</Text>
                        </TouchableOpacity>
                    )
                }}/>
            </View>
            <View style={{
                marginTop: 20,
                alignItems: 'center',
            }}>
                <Text
                    style={{
                        color: '#000',
                        fontSize: 16,
                        fontWeight: '600',
                    }}
                >
                    {"Today's Deals"}
                </Text>
            </View>
            
            <View style={{marginTop: 20}}>
                <FlatList 
                    data={tshirtList}
                    vertical 
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                    return (
                        <ProductCard item={item}/>
                    )
                }}/>
            </View>
            {/* <Listing/> */}
        </View>
    );
};

export default Home;