import { Address } from 'expo-location'
import {UserAction} from '../actions/index'
import {UserState, UserModel} from '../models'

const initialState: UserState = {
    user: {} as UserModel,
    location: {} as Address,
    error: undefined

}

const UserReducer = (state: UserState = initialState, action: UserAction ) =>{
   
switch(action.type){
    case 'ON_UPDATE_LOCATION':
        //console.log("default state of location payload reducer", action.payload) works
    return{
        ...state,
        location: action.payload
    }
    default:
        console.log("default state in location reducer", state) //works
        return state
}

}

export {UserReducer}