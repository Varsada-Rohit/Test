import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, addToCartFail, addToCartSuccess } from '../Actions/Cart';

export default function ProductCard({ product }) {
   const { error, cart } = useSelector((state) => state.Cart);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState();
   const dispatch = useDispatch();

   const onAddToCart = async (id) => {
      setLoading(true);
      dispatch(addToCart());
      await fetch(`http://localhost:8080/api/addtocart/rohit/${id}`)
         .then((data) => {
            return data.json();
         })
         .then((res) => {
            if (res.error) {
               setLoading(false);
               dispatch(addToCartFail(res.message));
               alert(error);
               return;
            }
            dispatch(addToCartSuccess(res.data.Products));
            setLoading(false);
            setSuccess(true);
         });
   };

   return (
      <div class='card flex-fill'>
         <img
            src={require(`../uploads/${product.Image}`).default}
            class='card-img-top'
            alt='...'
            style={{
               height: 250,
               objectFit: 'cover',
            }}
         />
         <div class='card-body d-flex  flex-column'>
            <div className='d-flex'>
               <h5 class='card-title'>{product.Name} </h5>
               <h5 className='ms-auto card-title'>₹{product.Price}</h5>
            </div>
            <p class='card-text'>{product.Description}</p>
            <div className='text-end mt-auto'>
               {cart.find((p) => p.ProductId._id === product._id) ? (
                  <Link to='/cart'>Already in cart</Link>
               ) : (
                  <button
                     disabled={loading}
                     href='#'
                     class='btn btn-primary'
                     onClick={() => onAddToCart(product._id)}
                  >
                     {success ? 'Added' : 'Add to cart'}
                  </button>
               )}
            </div>
         </div>
      </div>
   );
}
