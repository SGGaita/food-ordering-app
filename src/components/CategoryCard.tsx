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
      <Image source={{ uri: `${item.icon}` }} style={{width:120,height:120, borderRadius:20,backgroundColor:"#eaeaea"}} />
      <Text style={{fontSize:14, marginTop:10, color: '#858585'}}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 5,
  },
});

export { CategoryCard };
