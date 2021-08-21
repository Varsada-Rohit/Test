import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AddProduct from './Pages/AddProduct';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import { useDispatch } from 'react-redux';
import {
   fetchProductFailed,
   requestProducts,
   storeProduct,
} from './Actions/Product';
import { useEffect } from 'react';
import { fetchCartFailed, requestCart, storeCart } from './Actions/Cart';

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      getAllProducts();
      getCart();
   }, []);

   const getAllProducts = async () => {
      dispatch(requestProducts());
      await fetch(`http://localhost:8080/api/products`)
         .then((data) => {
            return data.json();
         })
         .then((res) => {
            if (res.error) {
               dispatch(fetchProductFailed(res.message));
               return;
            }
            console.log(res.products);
            dispatch(storeProduct(res.products));
         });
   };

   const getCart = async () => {
      dispatch(requestCart());
      await fetch(`http://localhost:8080/api/cart/rohit`)
         .then((data) => {
            return data.json();
         })
         .then((res) => {
            if (res.error) {
               console.log('Error-cart', res.message);
               dispatch(fetchCartFailed(res.message));
               return;
            }
            console.log('cart', res.message, res.data);
            dispatch(storeCart(res.data ? res.data.Products : []));
         });
   };

   return (
      <Router>
         <Switch>
            <Route path='/' exact>
               <Home />
            </Route>
            <Route path='/cart' exact>
               <Cart />
            </Route>
            <Route path='/addproduct' exact>
               <AddProduct />
            </Route>
         </Switch>
      </Router>
   );
}

export default App;
