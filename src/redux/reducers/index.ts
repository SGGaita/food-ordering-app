import {combineReducers} from 'redux'
//import {ShoppingReducer} from './shoppingReducer'
import {RestaurantReducer} from './restaurantReducer'
import {UserReducer} from './userReducer'


const rootReducer = combineReducers({

    userReducer: UserReducer,
    restaurantReducer: RestaurantReducer
    //shoppingReducer:ShoppingReducer,

})

export type ApplicationState = ReturnType<typeof rootReducer>

export {rootReducer}