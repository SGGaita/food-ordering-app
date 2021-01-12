import { CategoryAction } from '../actions/categoryAction'
import { FoodAction } from '../actions/foodAction'
import {RestaurantAction} from '../actions/index'
import {RestaurantState, RestaurantModel, CategoryModel, FoodModel} from '../models'



const initialState: RestaurantState = {
    restaurants_avail: {} as RestaurantModel,
    categories: {} as CategoryModel,
    food: {} as FoodModel
    

}

const RestaurantReducer = (state: RestaurantState = initialState, action: RestaurantAction) =>{
    
    switch(action.type){
        case 'ON_GET_RESTAURANTS':
            //console.log("Selected State Inside reducer", action.payload)
        return{
            ...state,
            restaurants_avail: action.payload
            
        }
        default:
            //console.log("default state in restaurant reducer", state)
            return state
    }

}

const CategoryReducer = (state: RestaurantState = initialState, action: CategoryAction) =>{
    
    switch(action.type){
        case 'ON_GET_CATEGORIES':
            //console.log("Selected State Inside reducer", action.payload)
        return{
            ...state,
            categories: action.payload
            
        }
        default:
            //console.log("default state in restaurant reducer", state)
            return state
    }

}

const FoodReducer = (state: RestaurantState = initialState, action: FoodAction) =>{
    
    switch(action.type){
        case 'ON_GET_ALL_FOOD':
            //console.log("Selected State Inside reducer", action.payload)
        return{
            ...state,
            food: action.payload
            
        }
        case 'ON_RESTAURANT_FOOD':
            return{
                ...state,
                food:action.payload
            }
        default:
            //console.log("default state in restaurant reducer", state)
            return state
    }

}

export {RestaurantReducer, CategoryReducer,FoodReducer}