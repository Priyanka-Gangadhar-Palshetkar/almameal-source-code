import React  from 'react';
import { StyleSheet,View, StatusBar} from 'react-native';
import { createRootNavigator } from './src/config/router';
import { isSignedIn } from './src/config/auth';
import { Provider, connect } from 'react-redux';
import configureStore from './src/store/configureStore';
import SplashScreen from 'react-native-smart-splash-screen'

const store = configureStore();

export default class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        signedIn: false,
      };
  }

  componentDidMount() {
    SplashScreen.close({
        animationType: SplashScreen.animationType.fade,
        duration: 850,
        delay: 500,
     });
      isSignedIn()
        .then(res => this.setState({signedIn: res}))
        .catch(err => alert("An error occurred"));
  }

  render() {
    const { signedIn } = this.state;
    const Layout = createRootNavigator(signedIn);
    return(
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar
            translucent
            backgroundColor="#b4004e"
            animated
          />
          <Layout />
        </View>
      </Provider>
    )
  }
}
