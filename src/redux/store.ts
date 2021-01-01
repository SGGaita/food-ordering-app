import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {rootReducer} from './reducers'



const store = createStore(rootReducer,composeWithDevTools(
     applyMiddleware(thunk))
     )

     console.log("Value of store state", store.getState())

export {store};