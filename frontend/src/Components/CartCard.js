import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { quantityChanged } from '../Actions/Cart';
import './Component.css';

export default function CartCard({ product, quantity }) {
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();

   const updateQuantity = (action) => {
      let api = action === 'add' ? 'addtocart' : 'decreasequantity';
      setLoading(false);
      fetch(`http://localhost:8080/api/${api}/rohit/${product._id}`)
         .then((data) => {
            return data.json();
         })
         .then((res) => {
            if (res.error) {
               alert(res.message);
               return;
            }
            dispatch(quantityChanged(res.data.Products));
         });
   };
   //    const removeQuantity = () => {
   //       setLoading(false);
   //       fetch(`http://localhost:8080/api/decreasequantity/rohit/${product._id}`)
   //          .then((data) => {
   //             return data.json();
   //          })
   //          .then((res) => {
   //             if (res.error) {
   //                alert(res.message);
   //                return;
   //             }
   //             dispatch(quantityChanged(res.data));
   //          });
   //    };

   return (
      <div class='card mb-3'>
         <div class=' d-flex g-0'>
            <div>
               <img
                  src={require(`../uploads/${product.Image}`).default}
                  class='img-fluid rounded-start'
                  style={{
                     height: 100,
                     width: 100,
                     objectFit: 'cover',
                  }}
                  alt='...'
               />
            </div>
            <div class=' flex-fill'>
               <div class='card-body'>
                  <div className='d-flex'>
                     <h5 class='card-title'>{product.Name}</h5>
                     <h5 class='card-title ms-auto'>₹{product.Price}</h5>
                  </div>
                  <div
                     class='card-text d-flex'
                     style={{ alignItems: 'center' }}
                  >
                     <button
                        type='button'
                        disabled={loading}
                        class='btn btn-sm btn-outline-primary quantity-btn'
                        onClick={() => updateQuantity('add')}
                     >
                        +
                     </button>
                     <div className='mx-2'>{quantity}</div>
                     <button
                        type='button'
                        disabled={loading}
                        class='btn btn-sm btn-outline-primary quantity-btn'
                        onClick={() => updateQuantity('remove')}
                     >
                        -
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
