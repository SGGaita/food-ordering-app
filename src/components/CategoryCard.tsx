import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { CategoryModel } from "../redux";

interface CategoryCardProps {
  item: CategoryModel;
  onTap: Function;
}
const CategoryCard: React.FC<CategoryCardProps> = ({ item, onTap }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
      <Image source={{ uri: `${item.icon}` }} style={{width:100,height:100, borderRadius:20,backgroundColor:"#eaeaea"}} />
      <Text style={{fontSize:14,marginTop:15,color:'#858585'}}>CatName</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 2,
  },
});

export { CategoryCard };
