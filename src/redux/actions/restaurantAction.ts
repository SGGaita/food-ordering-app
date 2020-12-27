import axios from 'axios'
import {Address} from 'expo-location'
import {Dispatch} from 'react'
import {BASE_URL} from '../../utils'
import {RestaurantModel} from '../models'

//export restaurant interface
export interface RestaurantFindAction{
    readonly type : "ON_RESTAURANT_FIND";
    payload: RestaurantModel
}

export interface RestaurantErrorAction{
    readonly type : "ON_RESTAURANT_ERROR";
    payload: any
}

export type RestaurantAction = RestaurantFindAction | RestaurantErrorAction

//Trigger action from components
export const onRestaurantFind = ()=>{
    return async(dispatch : Dispatch<RestaurantAction>) =>{
        try{

            const response = await axios.get<RestaurantModel>(`${BASE_URL}/restaurants`)
            //save location in local storage
            if(!response){
                dispatch({
                    type: 'ON_RESTAURANT_ERROR',
                    payload: 'RESTAURANTS UNAVAILABLE'
                })
            } else {
                dispatch({
                    type: 'ON_RESTAURANT_FIND',
                    payload: response.data
                })
            }
           

        }catch(error){
            dispatch({
                type: 'ON_RESTAURANT_ERROR',
                payload: error
            })
        }
    }
}