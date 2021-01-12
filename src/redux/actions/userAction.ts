import axios from 'axios'
import {Address} from 'expo-location'
import {Dispatch} from 'react'
import {BASE_URL} from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FoodModel } from '../models'

export interface UpdateLocationAction{
    readonly type : "ON_UPDATE_LOCATION";
    payload: Address
}

export interface UserErrorAction{
    readonly type : "ON_USER_ERROR";
    payload: any
}

export interface UpdateCartAction{
    readonly type: 'ON_UPDATE_CART',
    payload: FoodModel
}

export type UserAction = UpdateLocationAction |UpdateCartAction | UserErrorAction

export const onUpdateLocation = (location: Address)=>{
    return async(dispatch : Dispatch<UserAction>) =>{
        try{

            const locationString = JSON.stringify(location)
            await AsyncStorage.setItem('user_location',locationString)
            //save location in local storage
           dispatch({
               type: 'ON_UPDATE_LOCATION',
               payload: location
           })

        }catch(error){
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}


export const onUpdateCart = (item: FoodModel)=>{
    return async(dispatch : Dispatch<UserAction>) =>{
        try{
           dispatch({
               type: 'ON_UPDATE_CART',
               payload: item
           })

        }catch(error){
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}