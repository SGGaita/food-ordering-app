import axios from 'axios'
import {Address} from 'expo-location'
import {Dispatch} from 'react'
import {BASE_URL} from '../../utils'
import {CategoryModel} from '../models'

//export restaurant interface
export interface CategoryFindAction{
    readonly type : "ON_GET_CATEGORIES";
    payload: CategoryModel
}

export interface CategoryErrorAction{
    readonly type : "ON_CATEGORY_ERROR";
    payload: any
}

export type CategoryAction = CategoryFindAction | CategoryErrorAction

//Trigger action from components
export const getCategories = ()=>{
    return async(dispatch : Dispatch<CategoryAction>) =>{
        try{
            
            const response = await axios.get<CategoryModel>(`${BASE_URL}/suppliers`)
                 //console.log("respond now", response.data)
                if(response){
                    dispatch({
                        type: 'ON_GET_CATEGORIES',
                        payload: response.data
                    })
                   
                } else {
                   // console.log("This ON GET RESTAURANT was sellected")
                   dispatch({
                    type: 'ON_CATEGORY_ERROR',
                    payload: 'CATEGORIES UNAVAILABLE'
                })
                }

          
            //console.log("Suppliers in action is stress", response)
            //save location in local storage
           
           

        }catch(error){
            dispatch({
                type: 'ON_CATEGORY_ERROR',
                payload: error
            })
        }
    }
}