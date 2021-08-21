import {
   ADD_TO_CART,
   ADD_TO_CART_FAIL,
   ADD_TO_CART_SUCCESS,
   CART_FAIL,
   CART_RESQUEST,
   CART_SUCCESS,
   QUANTITY_CHANGED,
} from '../Constants/Cart';

export const cartReducer = (state = { loading: true, cart: [] }, action) => {
   switch (action.type) {
      case CART_RESQUEST:
         return { loading: true, cart: [] };

      case CART_SUCCESS:
         return { loading: false, cart: action.payload };

      case CART_FAIL:
         return { loading: false, error: action.payload, cart: [] };

      case ADD_TO_CART:
         return { loading: true, cart: [...state.cart] };

      case ADD_TO_CART_SUCCESS:
         return {
            loading: false,
            cart: action.payload,
         };

      case ADD_TO_CART_FAIL:
         return {
            loading: false,
            error: action.payload,
            cart: [...state.cart],
         };

      case QUANTITY_CHANGED:
         return {
            loading: false,
            cart: action.payload,
         };

      default:
         return state;
   }
};
