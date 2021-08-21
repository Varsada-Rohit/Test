import { combineReducers } from 'redux';
import { cartReducer } from './Cart';
import { productReducer } from './Product';

export const allReducers = combineReducers({
   Product: productReducer,
   Cart: cartReducer,
});
