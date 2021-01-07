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
import { RestaurantModel } from "../redux";

const screenwidth = Dimensions.get('screen').width

interface RestaurantCardProps {
  item: any;
  onTap: Function;
}
const RestaurantCard: React.FC<RestaurantCardProps> = ({ item, onTap }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=> onTap(item)}>
      <Image  source={{ uri: `${item.supplier_image}` }} style={{width: screenwidth - 20, height: 200, borderRadius:20, backgroundColor:'#eaeaea'}} />
      <Text style={{fontSize:16,marginTop:20,color:'#858585'}}>{item.supplier_name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { width:screenwidth - 20, height: 210, justifyContent: 'space-around', alignItems:'center', margin:10 },
  
});

export {RestaurantCard};
