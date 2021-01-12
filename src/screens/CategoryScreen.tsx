import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ButtonWithIcon, FoodCard } from "../components";
import { ApplicationState, CategoryModel, FoodModel, getAllFoodItems, onUpdateCart } from '../redux';
import {useNavigation } from "../utils";

interface CategoryProps {
    navigation: { getParam: Function; goBack: Function };
  }

export const CategoryScreen: React.FC<CategoryProps> = (props)=> {
    const { navigate } = useNavigation();
    const { getParam, goBack } = props.navigation;
  const category = getParam("categories") as CategoryModel;

  console.log('Category name', category.subcategory)

  const food: any = useSelector((state: ApplicationState) => {
    return state.foodReducer.food;
  });

  useSelector((state: ApplicationState) => {
    return state.userReducer.Cart;
  });


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFoodItems());

    ;
  },[])

  const onTapFood = (item: FoodModel) => {
    navigate("FoodDetailPage", { food: item });
  };

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
            marginLeft: 70
            
          }}
        >
          {category.subcategory}
        </Text>
      </View>
    <View style={styles.body}>
    <FlatList
        showsHorizontalScrollIndicator={false}
        data={food}
        renderItem={({item}) => <FoodCard item={item} onTap={onTapFood} onUpdateCart={()=>{dispatch(onUpdateCart(item))}}/>}
        keyExtractor={(item:any)=> `${item.id_product}`}
        />
    </View>
      </View>
     )
    
    
    }
    
    const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(242,247,242,1)',
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

