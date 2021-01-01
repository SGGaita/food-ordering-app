import React, { useState, useReducer, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image, FlatList,TouchableOpacity, } from "react-native";
import * as Location from "expo-location";

import { connect, useSelector } from "react-redux";
import {
  getRestaurants,
  UserState,
  ApplicationState,
  RestaurantState,
  RestaurantModel,
} from "../redux";
import { MenuButton, SearchBar } from "../components";
import { BASE_URL, useNavigation } from "../utils";
import axios from "axios";

interface HomeProps {
  userReducer: UserState;
  restaurantReducer: RestaurantState;
  getRestaurants: Function;
}

const _HomeScreen: React.FC<HomeProps> = (props) => {
  const { navigate } = useNavigation();

  const { location } = props.userReducer;
  //const { restaurants_avail } = props.restaurantReducer;


  const restaurant = useSelector((state: ApplicationState) => {return state.restaurantReducer.restaurants_avail});
  const _resta = Object.assign({}, restaurant);
  console.log("Restaurant States array",restaurant )
 

  //console.log("suppliers", restaurants_avail)



  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState("");

  const [displayAddress, setDisplayAddress] = useState("");

  //console.log("restaurants array check 2",restaurants_avail)

  useEffect(() => {

     
    (async () => {
     let res = props.getRestaurants();

     


   console.log("get restaurant", res)
      let address: any = location;
      const { coords } = address;

      //console.log("Address", address)
      if (coords) {
        const { latitude, longitude } = coords;
        let addressResponse: any = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        for (let item of addressResponse) {
          setAddress(item);
          //onUpdateLocation(address)
          let currentAddress = `${item.name},${item.district}, ${item.city}, ${item.country}`;
          //console.log("This Address ", currentAddress)
          setDisplayAddress(currentAddress);
          return;
        }
      } else {
        //error message
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View
          style={{
            backgroundColor: "red",
            marginTop: 20,
            flex: 4,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text style={styles.address}>{displayAddress}</Text>
          <Text> Edit</Text>
        </View>
        <View
          style={{
            display: "flex",
            height: 40,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 4,
          }}
        >
          <SearchBar
            didTouch={() => {
              navigate("SearchPage");
            }}
            onTextChange={() => {}}
          />

          <MenuButton
            onTap={() => {}}
            icon={require("../images/hambar.png")}
            width={50}
            height={40}
          />
        </View>
      </View>
      <View style={styles.body}>
      {Object.keys(_resta).length !== 0 ? (
        <Text>Contains List items</Text>
      ) : (
        <Text style={{ fontSize: 30 }}>You list is empty :'(</Text>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(242,247,242,1)",
  },

  navigation: {
    flex: 2,
  },

  address: {
    fontSize: 15,
  },

  body: {
    flex: 14,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  restaurantReducer: state.restaurantReducer,
});

const HomeScreen = connect(mapToStateProps, { getRestaurants })(_HomeScreen);

export { HomeScreen };
