import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { FoodModel } from "../redux";

const screenwidth = Dimensions.get('screen').width

interface FastFoodCardProps {
  item: any;
  onTap: Function;
}
const FastFoodCard: React.FC<FastFoodCardProps> = ({ item, onTap }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=> onTap(item)}>
      <Image  source={{ uri: `${item.image}` }} style={{width: screenwidth - 20, height: 200, borderRadius:20, backgroundColor:'#eaeaea'}} />
      <Text style={{fontSize:16,marginTop:20,color:'#858585'}}>{item.product_name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { width:screenwidth - 20, height: 210, justifyContent: 'space-around', alignItems:'center', margin:10 },
  
});

export {FastFoodCard};
