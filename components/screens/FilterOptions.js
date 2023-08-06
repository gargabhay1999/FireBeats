import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const FilterOptions = ({ data, onSortChange, onBrandFilterChange }) => {
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedBrandFilter, setSelectedBrandFilter] = useState('');

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    onSortChange(sortOption);
  };

  const handleBrandFilterChange = (brandFilter) => {
    setSelectedBrandFilter(brandFilter);
    onBrandFilterChange(brandFilter);
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 2, marginLeft:10 }}>Sort By:</Text>
      <Picker
        selectedValue={selectedSort}
        onValueChange={handleSortChange}
        style={{ width: 200 }}
      >
        <Picker.Item label="Select Sort" value="" />
        <Picker.Item label="Price High to Low" value="priceHighToLow" />
        <Picker.Item label="Price Low to High" value="priceLowToHigh" />
        <Picker.Item label="Brand" value="brand" />
      </Picker>
      
      {selectedSort==='brand'?(
        <View>
        <Text style={{ fontSize: 18, marginVertical: 10 }}>Brand:</Text>
        <Picker
        selectedValue={selectedBrandFilter}
        onValueChange={handleBrandFilterChange}
        style={{ width: 200 }}
      >
        <Picker.Item label="All Brands" value="" />
        <Picker.Item label="Fitbit" value="fitbit" />
        <Picker.Item label="Garmin" value="garmin" />
        <Picker.Item label="Apple" value="apple" />
        <Picker.Item label="WearOS" value="wearOS" />
        <Picker.Item label="Omron" value="omron" />
        <Picker.Item label="Accuchek" value="accuchek" />
      </Picker>
      </View>
      ):(null)}
      
    </View>
  );
};

export default FilterOptions;
