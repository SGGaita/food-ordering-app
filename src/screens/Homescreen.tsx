import React, { useState, useReducer, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";

import { connect, useDispatch, useSelector } from "react-redux";
import {
  getRestaurants,
  getAllFoodItems,
  getCategories,
  UserState,
  ApplicationState,
  RestaurantState,
  RestaurantModel,
  FoodModel,
  CategoryModel,
} from "../redux";
import {
  ButtonWithIcon,
  SearchBar,
  RestaurantCard,
  CategoryCard,
  FastFoodCard,
} from "../components";
import {useNavigation } from "../utils";


interface HomeProps {
  userReducer: UserState;
  restaurantReducer: RestaurantState;
  categoryReducer: RestaurantState;
  foodReducer: RestaurantState;
  getRestaurants: Function;
}

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const _HomeScreen: React.FC<HomeProps> = (props) => {
  const { navigate } = useNavigation();

  const { location } = props.userReducer;
  //const { restaurants_avail } = props.restaurantReducer;

  const restaurant: any = useSelector((state: ApplicationState) => {
    return state.restaurantReducer.restaurants_avail;
  });
  const _resta = Object.assign({}, restaurant);
  //console.log("Restaurant States array", restaurant);

  const food: any = useSelector((state: ApplicationState) => {
    return state.foodReducer.food;
  });

  const categories: any = useSelector((state: ApplicationState) => {
    return state.categoryReducer.categories;
  });

  console.log("Categories array", categories);

  //console.log("Food array", food)

  const dispatch = useDispatch();

  //console.log("suppliers", restaurants_avail)

  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState("");

  const [displayAddress, setDisplayAddress] = useState("");

  //console.log("restaurants array check 2",restaurants_avail)

  useEffect(() => {
    (async () => {
      dispatch(getRestaurants());
      dispatch(getAllFoodItems());
      dispatch(getCategories());
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

  const onTapCategory = (item: CategoryModel) => {
    navigate("CategoryPage", { categories: item });
  };

  const onTapRestaurant = (item: RestaurantModel) => {
    navigate("RestaurantPage", { restaurant: item });
  };

  const onTapFood = (item: FoodModel) => {
    navigate("FoodDetailPage", { food: item });
  };

  return (
   
    <View style={styles.container}>
      
      <View style={styles.navigation}>
        <View
          style={{
            marginTop: 20,
            flex: 5,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text style={styles.address}>{displayAddress}</Text>
          <Text> Edit</Text>
        </View>

        <View style={{flex:2}}>
        
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

          <ButtonWithIcon
            onTap={() => {}}
            icon={require("../images/hambar.png")}
            width={50}
            height={40}
          />
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView>
          {Object.keys(categories).length !== 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={({ item }) => (
                <CategoryCard
                  item={item}
                  onTap={ onTapCategory }
                />
              )}
              keyExtractor={(item: any) => `${item.id_product_sub_cat}`}
            />
          ) : (
            <Text style={{ fontSize: 20, alignItems:'center' }}>Your list is empty :'(</Text>
          )}

          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "700",
                color: "#f15b5d",
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              Top Restaurants
            </Text>
          </View>

          {Object.keys(_resta).length !== 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={restaurant}
              renderItem={({ item }) => (
                <RestaurantCard item={item} onTap={onTapRestaurant} />
              )}
              keyExtractor={(item: any) => `${item.id_supplier}`}
            />
          ) : (
            <Text style={{ fontSize: 30 }}>Your list is empty :'(</Text>
          )}
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "700",
                color: "#f15b5d",
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              30 Minutes Dishes
            </Text>
          </View>

          {Object.keys(_resta).length !== 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={food}
              renderItem={({ item }) => (
                <FastFoodCard item={item} onTap={onTapFood} />
              )}
              keyExtractor={(item: any) => `${item.id_supplier}`}
            />
          ) : (
            <Text style={{ fontSize: 30 }}>Your list is empty :'(</Text>
          )}
        </ScrollView>
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
    fontWeight: "700",
    backgroundColor: "white",
  },

  address: {
    fontSize: 15,
  },

  body: {
    flex: 13,
    marginTop: 10,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  //restaurantReducer: state.restaurantReducer,
});

const HomeScreen = connect(mapToStateProps, { getRestaurants })(_HomeScreen);

export { HomeScreen };
