import { Request, Response } from 'express';
import { AnyKeys, AnyObject } from 'mongoose';
import Product, { ProductDetail } from '../Models/Product';
import formidable, { Fields, File } from 'formidable';
import path from 'path';
import fs from 'fs';

class ProductsController {
   getAllProducts = (req: Request, res: Response) => {
      Product.find().exec((err, products) => {
         if (err) {
            return res.status(400).json({
               error: true,
               message: 'Error getting products',
            });
         }
         res.status(200).json({
            error: false,
            products: products,
            message: 'Successfully got all products',
         });
      });
   };

   addProduct = (req: Request, res: Response) => {
      let form = new formidable.IncomingForm();
      // form.keepExtensions = true;
      var filename = '';
      var oldPath = '';
      form.on('file', (field, file) => {
         filename = `${Date.now()}${file.name}`;
         oldPath = file.path;
      });
      form.parse(req, (err, fields, file) => {
         if (err) {
            return res.status(400).json({
               error: true,
               message: 'Problem With The Image',
            });
         }
         const { Price, Name, Description, Quantity } = fields;
         if (!Name || !Description || !Price || !Quantity) {
            return res.status(400).json({
               error: true,
               message: ' Please fill all Fields',
            });
         }
         if (!file.Photo) {
            return res.status(400).json({
               error: true,
               message: 'Please select product image',
            });
         }
         let product = new Product({ ...fields, Image: '' });
         //  var filename = `${file['photo'].name}${Date.now()}`;
         //  var oldPath = file.photo.path;

         var newPath = path.join(
            __dirname,
            '../',
            '../',
            'frontend',
            'src',
            'uploads',
            '/',
            filename
         );
         var rawData = fs.readFileSync(oldPath);

         fs.writeFile(newPath, rawData, function (err: any) {
            if (err) {
               console.log(err);
               return;
            }
            console.log('Successfully uploaded');
         });

         product.Image = filename;
         product.save((err, product) => {
            if (err) {
               return res.status(400).json({
                  error: true,
                  message: 'Saving Tshirt In Db Failed! please try again',
               });
            }

            res.status(200).json({
               error: false,
               message: 'Product added successfully',
               data: product,
            });
         });
      });
   };
}

export default new ProductsController();
