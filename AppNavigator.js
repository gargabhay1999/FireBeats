import React from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/screens/Login';
import Home from './components/screens/Home';
import Cart from './components/screens/Cart';
import Info from './components/screens/Info';
import Notification from './components/screens/Notification';
import Inbox from './components/screens/Inbox';
import Header from './components/screens/Header';
import Wishlist from './components/screens/Wishlist';
import Profile from './components/screens/Profile';
import MyAddress from './components/screens/MyAddress';
import AddAddress from './components/screens/AddAddress';
import Checkout from './components/screens/Checkout';
import Order from './components/screens/Order';
import FilterOptions from './components/screens/FilterOptions';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Inbox" component={Inbox} />
          <Stack.Screen name="Header" component={Header} />
          <Stack.Screen name="Wishlist" component={Wishlist} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="MyAddress" component={MyAddress} />
          <Stack.Screen name="AddAddress" component={AddAddress} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="FilterOptions" component={FilterOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  export default AppNavigator;