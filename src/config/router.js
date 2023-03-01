import React from 'react';
import { Platform, StatusBar } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Subscription from '../screens/Subscription';
import Profile from '../screens/Profile';
import Menu from '../screens/Menu';
import Cart from '../screens/Cart';
import Product from '../components/Product';
import Home from '../screens/Home';

export const SignedOut = createStackNavigator({
  SignUp: {
    screen: Signup,
    navigationOptions: {
          header: null
       }
    },
  LogIn: {
    screen: Login,
    navigationOptions: {
          header: null
       }
  }
});

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={24} color={tintColor}/>
        )
      }
    },
    Subscribe: {
      screen: Subscription,
      navigationOptions: {
        tabBarLabel: "Subscribe",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="plus" size={24} color={tintColor}/>
        )
      }
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        tabBarLabel: "Cart",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="shopping-cart" size={24} color={tintColor}/>
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={24} color={tintColor}/>
        )
      }
    },
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
      activeTintColor: '#ec407a',
      inactiveTintColor: 'gray',
      labelStyle: {
        paddingTop: 10
      }
    }
  }
);

export const OtherScreensStack = createStackNavigator({
  Menu: {
    screen: Menu,
  },
  Product: {
    screen: Product,
  }},
  {
    navigationOptions: {
        header: null,
    }
  });

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      },
      OtherScreensStack: {
        screen: OtherScreensStack
      },
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
