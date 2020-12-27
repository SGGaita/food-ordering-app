import React, {useState, useReducer, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions,Image } from 'react-native';
import * as Location from 'expo-location';


import {connect} from 'react-redux'
import {onRestaurantFind, UserState, ApplicationState, RestaurantState} from '../redux'



interface HomeProps{
  userReducer: UserState,
  restaurantReducer: RestaurantState,
  onRestaurantFind: Function
}


const _HomeScreen: React.FC<HomeProps> =  (props) => {

  const {location} = props.userReducer
  const {restaurant} = props.restaurantReducer

  const [errorMsg, setErrorMsg] = useState("")
const [address, setAddress] = useState("")

const [displayAddress, setDisplayAddress] = useState("")
  
  console.log("location",location)

  useEffect(() => {
    (async () =>{
      let address:any = location
      const {coords} = address
   
     console.log("Address", address)
     if(coords){
      const {latitude, longitude} = coords
      let addressResponse:any = await Location.reverseGeocodeAsync({latitude,longitude})
  
      for(let item of addressResponse){
        setAddress(item)
        //onUpdateLocation(address)
        let currentAddress = `${item.name},${item.district}, ${item.city}, ${item.country}`
        console.log("This Address ", currentAddress)
        setDisplayAddress(currentAddress)
       return;
     
    }
    }else{
      //error message
  
    }
  })();
}, []);

  

  

 
return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View style={{backgroundColor: '#cf0810', marginTop:20, flex:8, paddingLeft:20, paddingRight:20, alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
          <Text>{displayAddress}</Text>
          <Text> Edit</Text>
        </View>
        <View style={{flex:8}}>
          <Text>Search</Text>
        </View>
        </View>
      <View style={styles.body}><Text>Homescreen</Text></View>
    
  </View>
 )


}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'rgba(242,247,242,1)',
},

navigation:{
  flex:2,

},

body:{
  flex:9
}



});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  restaurantReducer: state.restaurantReducer
})

const HomeScreen = connect(mapToStateProps, {onRestaurantFind})(_HomeScreen)

export {HomeScreen}