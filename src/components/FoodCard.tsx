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
import { ButtonAddRemove } from "./ButtonAddRemove";

interface FoodCardProps {
  item: any;
  onTap: Function;
  onUpdateCart: Function
}
const FoodCard: React.FC<FoodCardProps> = ({ item, onTap, onUpdateCart }) => {

const didUpdateCart = (unit:number)=>{
  item.unit = unit
  //call some action to update cart
  onUpdateCart(item)
}

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${item.image}` }}
        style={{
          width: 88,
          height: 88,
          borderRadius: 20,
          backgroundColor: "#eaeaea",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <TouchableOpacity
        onPress={() => onTap(item)}
        style={{ display: "flex", flex: 1, flexDirection: "row" }}
      >
        <View style={{ display: "flex", flex: 8, padding: 10 }}>
          <Text style={{ fontWeight: "700", fontSize: 15 }}>
            {item.product_name}
          </Text>
          <Text>{item.subcategory}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flex: 4,
            padding: 10,
            marginRight:15,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#7c7c7c" }}>
            CDF.{item.product_price}
          </Text>
          <ButtonAddRemove onAdd={() => {

            let unit = isNaN(item.unit) ? 0 : item.unit;
            didUpdateCart(unit + 1)

          }} onRemove={()=>{
            let unit = isNaN(item.unit) ? 0 : item.unit;
            didUpdateCart(unit > 0 ? unit - 1 : unit)
          }} unit={item.unit}/>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width - 20,
    margin: 10,
    borderRadius: 20,
    height: 90,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor:"rgba(5,0,0,0.2)",
    backgroundColor: "white",
    flexDirection: "row",
  },

  navigation: { flex: 2, backgroundColor: "grey" },
  body: { flex: 10, justifyContent: "center", alignItems: "center" },
  footer: { flex: 1, backgroundColor: "cyan" },
});

export { FoodCard };
