import axios from 'axios'
import {Address} from 'expo-location'
import {Dispatch} from 'react'
import {BASE_URL} from '../../utils'
import {FoodModel} from '../models'

//export restaurant interface
export interface FoodFindAction{
    readonly type : "ON_GET_ALL_FOOD";
    payload: FoodModel
}

export interface FoodByRestaurantAction{
    readonly type : "ON_RESTAURANT_FOOD";
    payload: FoodModel
}

export interface FoodErrorAction{
    readonly type : "ON_FOOD_ERROR";
    payload: any
}

export type FoodAction = FoodFindAction| FoodByRestaurantAction | FoodErrorAction

//Trigger action from components
//get all food items
export const getAllFoodItems = ()=>{
    return async(dispatch : Dispatch<FoodAction>) =>{
        try{
            
            const response = await axios.get<FoodModel>(`${BASE_URL}/products`)
                 console.log("Food response", response.data)
                if(response){
                    dispatch({
                        type: 'ON_GET_ALL_FOOD',
                        payload: response.data
                    })
                   
                } else {
                   // console.log("This ON GET RESTAURANT was sellected")
                   dispatch({
                    type: 'ON_FOOD_ERROR',
                    payload: 'FOOD UNAVAILABLE'
                })
                }

          
            //console.log("Suppliers in action is stress", response)
            //save location in local storage
           
           

        }catch(error){
            dispatch({
                type: 'ON_FOOD_ERROR',
                payload: error
            })
        }
    }
}

export const getFoodItemsByRestaurant = (restID: number)=>{
    return async(dispatch : Dispatch<FoodAction>) =>{
        try{
            
            const response = await axios.get<FoodModel>(`${BASE_URL}/products/supplier/${restID}`)
                 console.log("Food from restaurant", response.data)
                if(response){
                    dispatch({
                        type: 'ON_RESTAURANT_FOOD',
                        payload: response.data
                    })
                   
                } else {
                   // console.log("This ON GET RESTAURANT was sellected")
                   dispatch({
                    type: 'ON_FOOD_ERROR',
                    payload: 'FOOD UNAVAILABLE'
                })
                }  

        }catch(error){
            dispatch({
                type: 'ON_FOOD_ERROR',
                payload: error
            })
        }
    }
}