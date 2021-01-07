import React from 'react';
import { StyleSheet, Text, View, Dimensions,Image } from 'react-native';
import { FoodModel } from '../redux';

interface FoodDetailsProps {
    item: FoodModel;
    onTap: Function;
  }

export const FoodDetailScreen: React.FC<FoodDetailsProps> = ({ item, onTap })=> {

    return (
        <View style={styles.container}>
        <View style={styles.navigation}><Text style={{fontSize:16}}>Food Details page</Text></View>
    <View style={styles.body}><Text>Food details screen</Text></View>
      </View>
     )
    
    
    }
    
    const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(242,247,242,1)',
    },
    navigation: {flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:'#ffffff'},
    body: {flex:8, justifyContent: 'center', alignItems: 'center'},



});

