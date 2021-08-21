import express from 'express';
import CartController from '../Controllers/Cart';

const router = express.Router();

router.param('productId', CartController.validateProduct);
router.param('userId', CartController.validateUser);
router.get('/addtocart/:userId/:productId', CartController.addToCart); // for add to cart and to increase quantity
router.get(
   '/decreasequantity/:userId/:productId',
   CartController.decreaseQuantity
);
router.get('/cart/:userId', CartController.getCart);

export = router;
