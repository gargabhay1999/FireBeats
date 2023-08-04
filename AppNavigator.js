import React from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './components/screens/Login';
import HomeScreen from './components/screens/Home';
import CartScreen from './components/screens/Cart';
import InfoScreen from './components/screens/Info';
import NotificationScreen from './components/screens/Notification';
import InboxScreen from './components/screens/Inbox';
import HeaderScreen from './components/screens/Header';
import WishlistScreen from './components/screens/Wishlist';
import ProfileScreen from './components/screens/Profile';
import MyAddressScreen from './components/screens/MyAddress';
import AddAddressScreen from './components/screens/AddAddress';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Inbox" component={InboxScreen} />
          <Stack.Screen name="Header" component={HeaderScreen} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="MyAddress" component={MyAddressScreen} />
          <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  export default AppNavigator;