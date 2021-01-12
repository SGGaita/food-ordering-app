import React from 'react';
import { StyleSheet, Text, View, Dimensions,Image, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonWithIcon, FoodCard } from '../components';
import { ApplicationState, FoodModel, onUpdateCart, UserState } from '../redux';

interface FoodDetailsProps {
  navigation: { getParam: Function; goBack: Function };
  userReducer: UserState
    //item: FoodModel;
    //onTap: Function;
  }
  
  
export const FoodDetailScreen: React.FC<FoodDetailsProps> = (props) => {
  const { getParam, goBack } = props.navigation;
  const food = getParam("food") as FoodModel;

  console.log('food name', food.product_name)

  useSelector((state: ApplicationState) => {
    return state.userReducer.Cart;
  });

  const dispatch = useDispatch();
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
          {food.product_name}
        </Text>
      </View>
    <View style={styles.body}>
    <ImageBackground
          source={{ uri: `${food.image}` }}
          style={{
            width: Dimensions.get("screen").width,
            height: 200,
            justifyContent: "flex-end",
            backgroundColor: "grey",
          }}
        >
          
        </ImageBackground>
        <View style={{ display:'flex',height:200, alignItems:'flex-start', paddingLeft: 10,paddingRight: 10, marginTop:15}}>
          <Text style={{fontSize: 20, fontWeight:'700', color:'#f15b5d'}}>{food.product_name}</Text>
          <Text style={{marginTop:10, fontSize:15}}>{food.product_description}</Text>
        </View>
       
        <View style={{height:120, marginBottom:20}}>
           <FoodCard item={food} onTap={()=>{}} onUpdateCart={()=>{dispatch(onUpdateCart(food))}}></FoodCard>
        </View>
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

