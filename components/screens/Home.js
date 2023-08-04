import { Pressable, View, Image, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import Header from "./Header";
import { products } from "./Products";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../redux/actions/Actions";

const Home = ({ navigation, route }) => {
    const dispatch = useDispatch();
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

    const data = useSelector(state=>state)
    return (
        <View style={{ flex: 1 }}>
            <Header route={route} navigation={navigation} />
            <View style={{ marginTop: 80 }}>
                <FlatList
                    data={categoryList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{ padding: 10, borderWidth: 1, marginLeft: 20, borderRadius: 20 }}>
                                <Text>{item.category}</Text>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
            <View style={{
                marginTop: 20,
                marginLeft: '40%',
                flexDirection: 'row'
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
                <Pressable style={{ marginLeft: '40%' }}
                    onPress={() => navigation.navigate("Wishlist")}>
                    <Image source={require('./../../assets/wishList.jpeg')}
                        style={{ width: 24, height: 24 }} />
                    <View
                        style={{
                            width: 15,
                            height: 15,
                            backgroundColor: 'red',
                            borderRadius: 7,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: -5,
                            right: -5,
                        }}>
                        <Text>{data.Reducers2.length}</Text>
                    </View>
                </Pressable>

            </View>

            <View style={{ marginTop: 20 }}>
                <FlatList
                    data={tshirtList}
                    vertical
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <ProductCard
                                item={item}
                                onAddWishList={(x) => {
                                    dispatch(addToWishlist(x))
                                }}
                                onAddToCart={(x) => {
                                    dispatch(addToCart(x))
                                }}
                            />
                        )
                    }} />
            </View>
        </View>
    );
};

export default Home;