import {
   ADD_PRODUCT_FAIL,
   ADD_PRODUCT_REQUEST,
   ADD_PRODUCT_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
} from '../Constants/Product';

export const productReducer = (
   state = { loading: true, products: [] },
   action
) => {
   switch (action.type) {
      case PRODUCT_LIST_REQUEST:
         return { loading: true, products: [] };

      case PRODUCT_LIST_SUCCESS:
         return { loading: false, products: action.payload };

      case PRODUCT_LIST_FAIL:
         return { loading: false, error: action.payload, products: [] };

      case ADD_PRODUCT_REQUEST:
         return { loading: true, products: [...state.products] };

      case ADD_PRODUCT_SUCCESS:
         return {
            loading: false,
            products: [...state.products, action.payload],
         };

      case ADD_PRODUCT_FAIL:
         return {
            loading: false,
            error: action.payload,
            products: state.products,
         };

      default:
         return state;
   }
};
