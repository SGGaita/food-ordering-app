import {combineReducers} from 'redux'
//import {ShoppingReducer} from './shoppingReducer'
import {RestaurantReducer,CategoryReducer,FoodReducer} from './restaurantReducer'
import {UserReducer} from './userReducer'


const rootReducer = combineReducers({

    userReducer: UserReducer,
    restaurantReducer: RestaurantReducer,
    categoryReducer: CategoryReducer,
    foodReducer: FoodReducer
    //shoppingReducer:ShoppingReducer,

})

export type ApplicationState = ReturnType<typeof rootReducer>

export {rootReducer}