import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { ApplicationState, FoodModel, getAllFoodItems, getFoodItemsByRestaurant, RestaurantModel } from "../redux";
import { ButtonWithIcon } from "../components";
import { FlatList } from "react-native-gesture-handler";
import { FoodCard } from "../components";
import { useNavigation } from "../utils/userNavigation";
import { useDispatch, useSelector } from "react-redux";

interface RestaurantProps {
  //navigation:{}
  navigation: { getParam: Function; goBack: Function };
  //item: RestaurantModel;
  //onTap: Function;
}

export const RestaurantScreen: React.FC<RestaurantProps> = (props) => {
  const { getParam, goBack } = props.navigation;
  const restaurant = getParam("restaurant") as RestaurantModel;

  console.log('restaurant id', restaurant.supplier_image)

  const food: any = useSelector((state:ApplicationState)=>{
    return state.foodReducer.food;
  })

  console.log("Food array", food)

  const dispatch = useDispatch()

  const {navigate} = useNavigation()

  const onTapFood = (item:FoodModel) =>{
    navigate('FoodDetailPage', {food: item})

  }

  useEffect(() => {
    dispatch(getFoodItemsByRestaurant(+restaurant.id_supplier))
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <ButtonWithIcon
          icon={require("../images/back_arrow.png")}
          onTap={() => goBack()}
          width={20}
          height={20}
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            marginLeft: 10
            
          }}
        >
          {restaurant.supplier_name}
        </Text>
      </View>
      <View style={styles.body}>
        <ImageBackground
          source={{ uri: `${restaurant.supplier_image}` }}
          style={{
            width: Dimensions.get("screen").width,
            height: 200,
            justifyContent: "flex-end",
            backgroundColor: "grey",
          }}
        >
          <View style={{
              height: 70,
              backgroundColor: "rgba(5,0,0,0.5)",
              padding: 10,
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 30 }}>
              {restaurant.supplier_name}
            </Text>
            <Text style={{ color: "#FFF", fontSize: 15 }}>Location address</Text>
          </View>
          
        </ImageBackground>
        <FlatList
        showsHorizontalScrollIndicator={false}
        data={food}
        renderItem={({item}) => <FoodCard item={item} onTap={onTapFood} onUpdateCart={()=>{}}/>}
        keyExtractor={(item:any)=> `${item.id_product}`}
        />
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
    flex: 1,
    marginTop: 35,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  body: { flex: 10, justifyContent: "flex-start", alignItems: "center" },
});
