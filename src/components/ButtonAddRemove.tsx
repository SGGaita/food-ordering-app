import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

interface ButtonProps {
  onAdd: Function;
  onRemove: Function;
  unit: number;
  //isAdded:Boolean// for later use
}
const ButtonAddRemove: React.FC<ButtonProps> = ({ onAdd, onRemove, unit }) => {

  if (unit>0){
    return (
      <View style={styles.optionView}>
        <TouchableOpacity style={styles.btnPlusMinus} onPress={()=> onAdd()}>
          <Text style={{ fontSize: 20, color:'#f14b5d'}}>-</Text>
        </TouchableOpacity>
        <View style={{display:'flex', justifyContent:'center', alignItems:'center', width:20 }}>
        <Text style={{fontSize:17, fontWeight:'600', textAlign:'center'}}>{unit}</Text>
        </View>
        
        <TouchableOpacity style={styles.btnPlusMinus} onPress={()=> onRemove()}>
          <Text style={{ fontSize: 20, color:'#f14b5d', }}>+</Text>
        </TouchableOpacity>
      </View>
    );
  } else
  {
    return (
      <TouchableOpacity style={styles.btn} onPress={()=> onAdd()}>
          <Text style={{ fontSize: 20, color:'#fff'}}>Add</Text>
        </TouchableOpacity>
    )
  }
 
};

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 30,
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#f15b5b",
  },
  optionView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  btnPlusMinus:{ display:'flex',
   justifyContent: 'center',
   alignItems:'center', 
  backgroundColor:'white',
  borderRadius:10,
  borderWidth:0.5,
  height:38,
  width:38
}
});

export { ButtonAddRemove };
