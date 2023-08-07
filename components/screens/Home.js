import { Pressable, Modal, View, Image, Button, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import Header from "./Header";
import { products } from "./Products";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../redux/actions/Actions";
import FilterOptions from './FilterOptions';

const Home = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [trackerList, setTrackerList] = useState(products.data);
    const [items, setItems] = useState(products.data);
    const [selectedBrandFilter, setSelectedBrandFilter] = useState('');
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);

    const data = useSelector(state => state)

    const handleSortChange = (sortOption) => {
        switch (sortOption) {
            case 'priceHighToLow':
                setItems([...items].sort((a, b) => b.price - a.price));
                break;
            case 'priceLowToHigh':
                setItems([...items].sort((a, b) => a.price - b.price));
                break;
            case 'brand':
                setItems([...items].sort((a, b) => a.brand.localeCompare(b.brand)));
                break;
            default:
                // Reset to original order
                setItems([...items]);
        }
    };

    const handleBrandFilterChange = (brandFilter) => {
        setSelectedBrandFilter(brandFilter);
        if (brandFilter === '') {
            setItems(products.data);
        } else {
            setItems(products.data.filter(item => item.brand.toLowerCase() === brandFilter));
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Header route={route} navigation={navigation} />
            <View style={{ alignItems: 'center', marginTop: 80 }}>
                <TouchableOpacity
                    onPress={() => setFilterModalVisible(true)}
                    style={{
                        marginTop: 5,
                        width: '90%',
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Sort By</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                marginTop: 30,
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
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
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
            <Modal
                visible={isFilterModalVisible}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <Text style={{ fontSize: 18 }}>Filter Options</Text>
                    </View>
                    <FilterOptions
                        onSortChange={handleSortChange}
                        onBrandFilterChange={handleBrandFilterChange}
                    />
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            width: '98%',
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 5,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginBottom: 10
                        }}
                        onPress={() => setFilterModalVisible(false)}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>Apply Filters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            width: '98%',
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 5,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginBottom: 10
                        }}
                        onPress={() => setFilterModalVisible(false)}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default Home;