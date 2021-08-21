import { Request, Response, NextFunction, RequestParamHandler } from 'express';
import Product from '../Models/Product';
import Cart, { CartDetail } from '../Models/Cart';

class CartController {
   validateUser = (
      req: Request,
      res: Response,
      next: NextFunction,
      userId: string
   ) => {
      if (userId === 'rohit') {
         req.body.userId = userId;
         next();
      } else {
         return res.status(400).json({
            error: true,
            message: 'user not found',
         });
      }
   };

   validateProduct = (
      req: Request,
      res: Response,
      next: NextFunction,
      productId: string
   ) => {
      Product.findById(productId).exec((err, product) => {
         if (err) {
            return res.status(400).json({
               error: true,
               message: 'Product not found',
            });
         }
         req.body.product = product;
         req.body.productId = productId;
         next();
      });
   };

   addToCart = (req: Request, res: Response) => {
      Cart.findOne({ UserId: req.body.userId }).exec((err, cart) => {
         if (err || cart == null) {
            let newCart = new Cart({
               Products: [
                  {
                     ProductId: req.body.productId,
                     ItemQuantity: 1,
                  },
               ],
               UserId: req.body.userId,
            });
            newCart.save((err, resCart) => {
               if (err) {
                  return res.status(400).json({
                     error: true,
                     message: 'Error adding product to cart',
                  });
               }
               resCart
                  .populate('Products.ProductId')
                  .execPopulate()
                  .then((data) => {
                     return res.status(200).json({
                        error: false,
                        message: 'Product added to cart successfully',
                        data: data,
                     });
                  });
            });
         } else {
            cart?.addToCart(req.body.productId);
            cart.save((err, resCart) => {
               if (err) {
                  return res.status(400).json({
                     error: true,
                     message: 'Error adding product to cart',
                  });
               }
               resCart
                  .populate('Products.ProductId')
                  .execPopulate()
                  .then((data) => {
                     return res.status(200).json({
                        error: false,
                        message: 'Product added to cart successfully',
                        data: data,
                     });
                  });
            });
         }
      });
   };

   getCart = (req: Request, res: Response) => {
      Cart.findOne({ UserId: req.body.userId })
         .populate('Products.ProductId')
         .exec((err, resCart) => {
            if (err) {
               return res.status(400).json({
                  error: true,
                  message: 'Error getting cart detail',
               });
            }
            return res.status(200).json({
               error: false,
               message: resCart ? 'Got cart detail successfully' : 'Cart empty',
               data: resCart,
            });
         });
   };

   decreaseQuantity = (req: Request, res: Response) => {
      Cart.findOne({ UserId: req.body.userId }).exec((err, resCart) => {
         if (err) {
            return res.status(400).json({
               error: true,
               message: 'Something went wrong please try again',
            });
         }
         if (!resCart) {
            return res.status(400).json({
               error: true,
               message: 'No cart detail found for this user',
            });
         }
         let result = resCart.removeOneQuantity(req.body.productId);
         if (!result) {
            return res.status(400).json({
               error: true,
               message: 'Product does not exist in cart',
            });
         }
         resCart?.save((err, finalCart) => {
            if (err) {
               return res.status(400).json({
                  error: true,
                  message: 'Error updating product to cart',
               });
            }
            resCart
               .populate('Products.ProductId')
               .execPopulate()
               .then((data) => {
                  return res.status(200).json({
                     error: false,
                     message: 'cart detail updated successfully',
                     data: data,
                  });
               });
         });
      });
   };
}

export default new CartController();
