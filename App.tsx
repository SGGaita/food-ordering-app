import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { HomeScreen } from "./src/screens/Homescreen";
import { SplashScreen } from "./src/screens/Splash";
import { Account } from "./src/screens/Account";
import { store } from "./src/redux/index";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider } from "react-redux";

const switchNavigator = createSwitchNavigator({
  landingStack: {
    screen: createStackNavigator(
      {
        Landing: SplashScreen,
        // search address screen
      },
      {
        defaultNavigationOptions: {
          headerShown: false,
        },
      }
    ),
  },

  homeStack: createBottomTabNavigator({
    // Home tab Icon
    Home: {
      screen: createStackNavigator({
        Home: HomeScreen,
      },
      {
        defaultNavigationOptions: {
          headerShown: false,
        },
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon =
            focused == true
              ? require("./src/images/home_icon.png")
              : require("./src/images/home_n_icon.png");
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },

    // Home tab Icon
    Offer: {
      screen: createStackNavigator({
        Offers: HomeScreen, //
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon =
            focused == true
              ? require("./src/images/offer_icon.png")
              : require("./src/images/offer_n_icon.png");
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },

    // Home tab Icon
    Cart: {
      screen: createStackNavigator({
        Cart: HomeScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon =
            focused == true
              ? require("./src/images/cart_icon.png")
              : require("./src/images/cart_n_icon.png");
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },
    // Home tab Icon
    Account: {
      screen: createStackNavigator({
        Account: Account,
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon =
            focused == true
              ? require("./src/images/account_icon.png")
              : require("./src/images/account_n_icon.png");
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },
  }),
});

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30,
  },
});
