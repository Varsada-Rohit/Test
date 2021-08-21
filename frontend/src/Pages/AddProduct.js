import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import * as yup from 'yup';
import './Pages.css';
import { useDispatch, useSelector } from 'react-redux';
import {
   addProduct,
   addProductFail,
   addProductSuccess,
} from '../Actions/Product';

const Schema = yup.object().shape({
   Title: yup.string().min(3).required(true),
   Description: yup.string().min(3).required(true),
   Price: yup.number().min(1).required(),
   Quantity: yup.number().min(0).required(),
   //    Image: yup.string().required(),
});

export default function AddProduct() {
   const dispatch = useDispatch();
   const { error, loading } = useSelector((state) => state.Product);
   const [Photo, setPhoto] = useState('');
   const [success, setSuccess] = useState('');

   const onSubmit = (values, { resetForm }) => {
      dispatch(addProduct());
      const formData = new FormData();
      formData.append('Name', values.Title);
      formData.append('Description', values.Description);
      formData.append('Price', values.Price);
      formData.append('Quantity', values.Quantity);
      formData.append('Photo', Photo);

      fetch('http://localhost:8080/api/addproduct', {
         headers: {
            Accept: 'application/json',
         },
         body: formData,
         method: 'POST',
      })
         .then((data) => {
            return data.json();
         })
         .then((res) => {
            if (res.error) {
               console.log('add product', res.message);
               dispatch(addProductFail(res.message));
               return;
            }
            dispatch(addProductSuccess(res.data));
            resetForm();
            console.log('add product', res.data);
            setSuccess(res.message);
            setTimeout(() => {
               setSuccess('');
            }, 3000);
         });
   };

   return (
      <div>
         <Navbar />

         <div className='container form-container'>
            <Formik
               initialValues={{
                  Title: '',
                  Description: '',
                  Price: '',
                  Quantity: '',
                  Image: '',
               }}
               onSubmit={onSubmit}
               validationSchema={Schema}
            >
               {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
               }) => (
                  <form onSubmit={handleSubmit}>
                     <h4 className='text-center'>Add Product</h4>
                     <div class='mb-3'>
                        <label for='title' class='form-label'>
                           Title
                        </label>
                        <Field
                           type='text'
                           class='form-control'
                           id='title'
                           aria-describedby='emailHelp'
                           name='Title'
                           aria-describedby='titlee'
                        />
                        {errors.Title && touched.Title ? (
                           <div id='titlee' class='form-text'>
                              {errors.Title}
                           </div>
                        ) : null}
                     </div>
                     <div class='mb-3'>
                        <label for='description' class='form-label'>
                           Description
                        </label>
                        <textarea
                           type='text'
                           class='form-control'
                           id='description'
                           name='Description'
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.Description}
                           aria-describedby='descriptione'
                        />
                        {errors.Description && touched.Description ? (
                           <div id='descriptione' class='form-text'>
                              {errors.Description}
                           </div>
                        ) : null}
                     </div>
                     <div class='mb-3'>
                        <label for='price' class='form-label'>
                           Price
                        </label>
                        <Field
                           type='number'
                           class='form-control'
                           id='price'
                           name='Price'
                           aria-describedby='pricee'
                        />
                        {errors.Price && touched.Price ? (
                           <div id='pricee' class='form-text'>
                              {errors.Price}
                           </div>
                        ) : null}
                     </div>
                     <div class='mb-3'>
                        <label for='stock' class='form-label'>
                           Stock
                        </label>
                        <Field
                           type='number'
                           class='form-control'
                           id='stock'
                           min={1}
                           inputMode='numeric'
                           name='Quantity'
                           aria-describedby='stocke'
                        />
                        {errors.Quantity && touched.Quantity ? (
                           <div id='stocke' class='form-text'>
                              {errors.Quantity}
                           </div>
                        ) : null}
                     </div>
                     <div class='mb-3'>
                        <label for='photo' class='form-label'>
                           Photo
                        </label>
                        <Field
                           type='file'
                           class='form-control'
                           id='photo'
                           accept='image/*'
                           name='Image'
                           aria-describedby='imagee'
                           onChange={(e) => {
                              handleChange(e);
                              setPhoto(e.target.files[0]);
                           }}
                        />
                        {errors.Image && touched.Image ? (
                           <div id='imagee' class='form-text'>
                              {errors.Image}
                           </div>
                        ) : null}
                     </div>
                     {error && (
                        <div className='text-center text-danger mt-1'>
                           {error}
                        </div>
                     )}
                     <div className='text-center'>
                        <button
                           type='submit'
                           class='btn btn-primary '
                           disabled={isSubmitting}
                        >
                           Submit
                        </button>
                     </div>
                     {success && (
                        <div className=' text-success text-center my-1'>
                           {success}
                        </div>
                     )}
                  </form>
               )}
            </Formik>
         </div>
      </div>
   );
}
