import {
   ADD_PRODUCT_FAIL,
   ADD_PRODUCT_REQUEST,
   ADD_PRODUCT_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
} from '../Constants/Product';

export const requestProducts = () => {
   return {
      type: PRODUCT_LIST_REQUEST,
   };
};

export const storeProduct = (products) => {
   return {
      type: PRODUCT_LIST_SUCCESS,
      payload: products,
   };
};

export const fetchProductFailed = (error) => {
   return {
      type: PRODUCT_LIST_FAIL,
      payload: error,
   };
};

export const addProduct = () => {
   return {
      type: ADD_PRODUCT_REQUEST,
   };
};

export const addProductFail = (error) => {
   return {
      type: ADD_PRODUCT_FAIL,
      payload: error,
   };
};

export const addProductSuccess = (product) => {
   return {
      type: ADD_PRODUCT_SUCCESS,
      payload: product,
   };
};
