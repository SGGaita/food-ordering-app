import {RestaurantAction} from '../actions/index'
import {RestaurantState, RestaurantModel} from '../models'



const initialState: RestaurantState = {
    restaurants_avail: {} as RestaurantModel,
    

}

const RestaurantReducer = (state: RestaurantState = initialState, action: RestaurantAction) =>{
    
    switch(action.type){
        case 'ON_GET_RESTAURANTS':
            console.log("Selected State Inside reducer", action.payload)
        return{
            ...state,
            restaurants_avail: action.payload
            
        }
        default:
            //console.log("default state in restaurant reducer", state)
            return state
    }

}

export {RestaurantReducer}