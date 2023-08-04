// web 930703131960-efo9amqv0qf88526p51m8ft34nebedha.apps.googleusercontent.com
// android 930703131960-fq2da70dmg96cnsrrn3hnp9qiutdu099.apps.googleusercontent.com

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import store from './components/redux/store/Store';
import MainContainer from './MainContainer';
WebBrowser.maybeCompleteAuthSession();

const App = () => {
  return (
    <Provider store={store}>
      <MainContainer/>
    </Provider>
  );
};
export default App;