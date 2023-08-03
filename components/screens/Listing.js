import React, { useEffect, useState } from "react";
import {View, Pressable, Text, Image} from 'react-native';
import { products } from "./Products";

const Listing = ({navigation}) => {
    const [categoryList, setCategoryList]=useState([]);
    const [trackerList, setTrackerList] = useState([]);
    const [tshirtList, setTshirtList] = useState([]);
    const [jeansList, setJeansList] = useState([]);
    const [kurtaList, setKurtaList] = useState([]);
    const [shirtList, setShirtList] = useState([]);
    const [socksList, setSocksList] = useState([]);
    const [shoesList, setShoesList] = useState([]);

    useEffect(()=>{
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
    },[])
    return (
        <View style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#ffff',
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 70
        }}>
            <Image
                source={require('./../../assets/listing/watch1.jpeg')}
                style={{ width: '100%', height: 300 }}
            />
            <Image
                source={require('./../../assets/listing/watch1.jpeg')}
                style={{ width: '100%', height: 300 }}
            />
        </View>
    )
}
export default Listing;