import {combineReducers} from 'redux'
import {ShoppingReducer} from './shoppingReducer'
import {UserReducer} from './userReducer'

const rootReducer = combineReducers({

    useReducer: UserReducer,
    shoppingReducer:ShoppingReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>

export {rootReducer}