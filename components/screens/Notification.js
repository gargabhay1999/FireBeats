import { StripeProvider, useStripe, CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, Text, Button, Modal, Touchable, TouchableOpacity } from "react-native";
import FilterOptions from './FilterOptions';

const Notification = () => {
    const allItems = [
        { id: 1, name: 'Item 1', price: 100, brand: 'Brand A' },
        { id: 2, name: 'Item 2', price: 200, brand: 'Brand B' },
        { id: 3, name: 'Item 3', price: 50, brand: 'Fitbit' },
        // Add more items
      ];
    
      const [items, setItems] = useState(allItems);
      const [selectedBrandFilter, setSelectedBrandFilter] = useState('');
      const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    
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
          setItems(allItems);
        } else {
          setItems(allItems.filter(item => item.brand.toLowerCase() === brandFilter));
        }
      };

      const renderItem = ({ item }) => (
        <View style={{ borderBottomWidth: 1, padding: 10 }}>
          <Text>Name: {item.name}</Text>
          <Text>Price: ${item.discountedPrice}</Text>
          <Text>Brand: {item.brand}</Text>
        </View>
      );
    return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 24 }}>Product List</Text>
        <Button title="Open Filter" onPress={() => setFilterModalVisible(true)} />
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Text style={{ fontSize: 18 }}>Sort By</Text>
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
                alignSelf:'center',
                marginBottom:10
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
                alignSelf:'center',
                marginBottom:10
            }}
            onPress={() => setFilterModalVisible(false)}
            >
            <Text style={{ color: 'white', fontSize: 16 }}>Close</Text>
        </TouchableOpacity>
        </View>
      </Modal>
      </View>
    );
}

export default Notification;