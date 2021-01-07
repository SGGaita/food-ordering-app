import React, {useState, useEffect} from 'react'
import {StyleSheet,View,Text,TouchableOpacity, TextInput, Image, Dimensions} from 'react-native'
import { FoodModel } from '../redux'
import { ButtonAddRemove } from './ButtonAddRemove'

interface FoodCardProps {
  item: any;
  onTap: Function
}
const FoodCard: React.FC<FoodCardProps> = ({item,onTap})=> {

return (<View style={styles.container}>
<Image source={{uri: `${item.image}`}} style={{width:98, height:98, borderRadius:20, backgroundColor:"#eaeaea", justifyContent:'center', alignItems:'center'}} />
<TouchableOpacity onPress={()=> onTap(item)} style={{display:'flex', flex:1, flexDirection:'row'}}>
<View style={{display:'flex', flex:8, padding:10}}>
<Text style={{fontWeight:'700', fontSize:15}}>{item.product_name}</Text>
<Text>{item.subcategory}</Text>
</View>
<View style={{display:'flex', flex:4, padding: 10, justifyContent:'space-around', alignItems:'center'}}>
<Text style={{fontSize:14, fontWeight: '600', color: '#7c7c7c'}}>CDF. 1200</Text>
<ButtonAddRemove onTap={()=>{}}/>
</View>
</TouchableOpacity>
</View>)}


const styles = StyleSheet.create({
container: {flex: 1,
    width: Dimensions.get('screen').width-20,
    margin: 10,
    borderRadius:20,
    height:100,
    justifyContent:'flex-start',
    borderWidth:1,
     backgroundColor: 'white',
    flexDirection:'row'},

navigation: {flex: 2, backgroundColor: 'grey'},
body: {flex:10, justifyContent: 'center', alignItems: 'center'},
footer:{flex: 1, backgroundColor: 'cyan'}
})

export {FoodCard}