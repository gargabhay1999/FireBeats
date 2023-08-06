import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import store from './components/redux/store/Store';
import MainContainer from './MainContainer';
import { LogBox } from 'react-native';
WebBrowser.maybeCompleteAuthSession();
LogBox.ignoreLogs(['Selector unknown returned the root state when called. This can lead to unnecessary renders']);
LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    <Provider store={store}>
      <MainContainer/>
    </Provider>
  );
};
export default App;