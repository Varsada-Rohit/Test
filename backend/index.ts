import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import Product from './Routes/Product';
import CartRoutes from './Routes/Cart';

const app = express();

const PORT = process.env.PORT || 8080;

const DATABASE_URL =
   process.env.DATABASE_URL || 'mongodb://localhost/kabraTest';

mongoose
   .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log('DB connected !');
   })
   .catch((error) => {
      console.log('Error connecting DB !' + error);
   });

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api', Product);
app.use('/api', CartRoutes);

app.get('/', (req, res) => res.send('Express + Typescript'));

app.listen(PORT, () => {
   console.log(`server running at port ${PORT}`);
});
