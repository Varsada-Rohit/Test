import {
   ADD_TO_CART,
   ADD_TO_CART_FAIL,
   ADD_TO_CART_SUCCESS,
   CART_FAIL,
   CART_RESQUEST,
   CART_SUCCESS,
   QUANTITY_CHANGED,
} from '../Constants/Cart';

export const requestCart = () => {
   return {
      type: CART_RESQUEST,
   };
};

export const storeCart = (cart) => {
   return {
      type: CART_SUCCESS,
      payload: cart,
   };
};

export const fetchCartFailed = (error) => {
   return {
      type: CART_FAIL,
      payload: error,
   };
};

export const addToCart = () => {
   return {
      type: ADD_TO_CART,
   };
};

export const addToCartFail = (error) => {
   return {
      type: ADD_TO_CART_FAIL,
      payload: error,
   };
};

export const addToCartSuccess = (cart) => {
   return {
      type: ADD_TO_CART_SUCCESS,
      payload: cart,
   };
};

export const quantityChanged = (cart) => {
   return {
      type: QUANTITY_CHANGED,
      payload: cart,
   };
};
