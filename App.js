// web 930703131960-efo9amqv0qf88526p51m8ft34nebedha.apps.googleusercontent.com
// android 930703131960-fq2da70dmg96cnsrrn3hnp9qiutdu099.apps.googleusercontent.com

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './components/screens/Login';
import HomeScreen from './components/screens/Home';
import CartScreen from './components/screens/Cart';
import InfoScreen from './components/screens/Info';
import NotificationScreen from './components/screens/Notification';
import InboxScreen from './components/screens/Inbox';


const Stack = createStackNavigator();
WebBrowser.maybeCompleteAuthSession();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Inbox" component={InboxScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;