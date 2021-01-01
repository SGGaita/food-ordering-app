import axios from 'axios'
import {Address} from 'expo-location'
import {Dispatch} from 'react'
import {BASE_URL} from '../../utils'
import {RestaurantModel} from '../models'

//export restaurant interface
export interface RestaurantFindAction{
    readonly type : "ON_GET_RESTAURANTS";
    payload: RestaurantModel
}

export interface RestaurantErrorAction{
    readonly type : "ON_RESTAURANT_ERROR";
    payload: any
}

export type RestaurantAction = RestaurantFindAction | RestaurantErrorAction

//Trigger action from components
export const getRestaurants = ()=>{
    return async(dispatch : Dispatch<RestaurantAction>) =>{
        try{
            
            const response = await axios.get<RestaurantModel>(`${BASE_URL}/suppliers`)
                 //console.log("respond now", response.data)
                if(response){
                    dispatch({
                        type: 'ON_GET_RESTAURANTS',
                        payload: response.data
                    })
                   
                } else {
                   // console.log("This ON GET RESTAURANT was sellected")
                   dispatch({
                    type: 'ON_RESTAURANT_ERROR',
                    payload: 'RESTAURANTS UNAVAILABLE'
                })
                }

          
            //console.log("Suppliers in action is stress", response)
            //save location in local storage
           
           

        }catch(error){
            dispatch({
                type: 'ON_RESTAURANT_ERROR',
                payload: error
            })
        }
    }
}