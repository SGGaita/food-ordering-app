import {RestaurantAction} from '../actions/index'
import {RestaurantState, RestaurantModel} from '../models'

const initialState: RestaurantState = {
    restaurant: {} as RestaurantModel

}

const RestaurantReducer = (state: RestaurantState = initialState, action: RestaurantAction) =>{
    switch(action.type){
        case 'ON_RESTAURANT_FIND':
        return{
            ...state,
            restaurant: action.payload
        }
        default:
            return state
    }

}

export {RestaurantReducer}