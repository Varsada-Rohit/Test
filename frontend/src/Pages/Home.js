import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Components/Navbar';
import ProductCard from '../Components/ProductCard';

export default function Home() {
   const { loading, products } = useSelector((state) => state.Product);

   return (
      <div>
         <Navbar />
         <div className='container my-5'>
            <h1 className='text-center my-3'>Products</h1>
            <div className='row my-5'>
               {products.map((product) => {
                  return (
                     <div className='col-lg-4 col-md-6 col-sm-12 d-flex my-3'>
                        <ProductCard product={product} />
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}
