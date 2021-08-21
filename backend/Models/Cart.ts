import mongoose from 'mongoose';

interface CartProduct {
   ProductId: mongoose.Types.ObjectId;
   ItemQuantity: number;
}

export interface CartDetail extends mongoose.Document {
   Products: [CartProduct];
   UserId: String;
   addToCart: Function;
   removeOneQuantity: Function;
}

const CartSchema = new mongoose.Schema<CartDetail>(
   {
      Products: [
         {
            ProductId: {
               type: mongoose.Types.ObjectId,
               ref: 'Product',
               required: true,
            },
            ItemQuantity: {
               type: Number,
               required: true,
            },
         },
      ],
      UserId: String,
   },
   { timestamps: true }
);

CartSchema.methods = {
   addToCart: function (productId: mongoose.Types.ObjectId) {
      let index = this.Products.findIndex(
         (i: CartProduct) => i.ProductId == productId
      );
      if (index >= 0) {
         this.Products[index].ItemQuantity =
            this.Products[index].ItemQuantity + 1;
      } else {
         this.Products.push({ ProductId: productId, ItemQuantity: 1 });
      }
   },
   removeOneQuantity: function (productId: mongoose.Types.ObjectId) {
      let index = this.Products.findIndex(
         (i: CartProduct) => i.ProductId == productId
      );
      if (index >= 0) {
         if (this.Products[index].ItemQuantity == 1) {
            this.Products.splice(index, 1);
            return true;
         }
         this.Products[index].ItemQuantity =
            this.Products[index].ItemQuantity - 1;
         return true;
      } else {
         return false;
      }
   },
};

export default mongoose.model<CartDetail>('Cart', CartSchema);
