import React, {useState, useReducer, useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions,Image } from 'react-native';
import * as Location from 'expo-location';

import { useNavigation } from '../utils'

import {connect} from 'react-redux'
import {onUpdateLocation, UserState, ApplicationState} from '../redux'
 

const screenWidth = Dimensions.get('screen').width

interface SplashProps{
  userReducer: UserState,
  onUpdateLocation: Function
}

const _SplashScreen: React.FC<SplashProps> = (props) => {

  const {userReducer, onUpdateLocation} = props
const { navigate } = useNavigation()
const [errorMsg, setErrorMsg] = useState("")
const [address, setAddress] = useState<Location.Address>()

const [displayAddress, setDisplayAddress] = useState("Waiting for your current location")

useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let address:any = await Location.getCurrentPositionAsync({});
      //let exactAddress: any = Location.reverseGeocodeAsync(address)
      const {coords} = address
    
    
      if(coords){
        const {latitude, longitude} = coords
        let addressResponse:any = await Location.reverseGeocodeAsync({latitude,longitude})

        for(let item of addressResponse){
          setAddress(item)
          onUpdateLocation(address)
          let currentAddress = `${item.name},${item.district}, ${item.city}, ${item.country}`
          setDisplayAddress(currentAddress)

          if(currentAddress.length > 0){
              setTimeout(() =>{
                  navigate('homeStack')
              }, 10000)
          }
         return;
       
      }
      }else{
        //error message

      }
      
          

          

      
     
    })();
  }, []);

  
  


     return (
        <View style={styles.container}>
        
        <View style={styles.body}>
            <Image source={require('../images/logo-bw.png')} style={styles.logo}/>
            <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Welcome to food ordering app</Text></View>
            <Text style={styles.location}>{displayAddress}</Text>
            </View>
      </View>
     )


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cf0810',
    },
  
    navigation:{
      flex:2,
    },

    body:{
        flex:9,
        alignItems: 'center',
      justifyContent: 'center',
      },

    logo:{
        width: 200,
    height:50
    },
welcomeContainer:{
    width: screenWidth -100,
    borderBottomColor: 'yellow',
    borderBottomWidth: 0.5,
    padding: 5,
    alignItems: 'center'
},

    welcome:{
        color:'white',
        padding:5,
        fontSize:15,
        fontWeight:'700'
        
    },

   location:{
       color:'#C0C0C0',
       padding: 5
   }
    
  });

  const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
  })

  const SplashScreen = connect(mapToStateProps, {onUpdateLocation})(_SplashScreen)

  export {SplashScreen}