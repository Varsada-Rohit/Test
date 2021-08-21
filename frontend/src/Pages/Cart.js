import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartCard from '../Components/CartCard';
import Navbar from '../Components/Navbar';

export default function Cart() {
   const { cart, loading } = useSelector((state) => state.Cart);

   const total = (cartP) => {
      let sum = 0;
      cartP.map((product) => {
         sum = sum + product.ItemQuantity * product.ProductId.Price;
      });
      return sum;
   };

   return (
      <div>
         <Navbar />
         <h1 className='text-center my-5'>Cart</h1>
         {!loading && cart.length === 0 ? (
            <div className='text-center my-5'>
               <h4 className='text-muted'>Cart Empty</h4>
               <Link to='/'>Shop Now</Link>
            </div>
         ) : (
            <div className='container'>
               <div className='row cart'>
                  <div className='col-md-8'>
                     {cart.map((product) => {
                        return (
                           <CartCard
                              product={product.ProductId}
                              quantity={product.ItemQuantity}
                           />
                        );
                     })}
                  </div>
                  <div className='col-md-4 mb-3'>
                     <div className='card'>
                        <div className='card-body'>
                           <div className='d-flex h4'>
                              Total :
                              <span className='ms-auto'>₹ {total(cart)}</span>
                           </div>
                           <button className='btn btn-primary w-100 my-4'>
                              Checkout
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
