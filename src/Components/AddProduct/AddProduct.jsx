import React, { useState } from 'react';
import upload_area from '../../assets/upload_area.svg';
import './AddProduct.css';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "sports",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    console.log('Submitting product details:', productDetails);

    const formData = new FormData();
    formData.append('product', image);

    try {
      const response = await fetch('https://autodealer.onrender.com/upload', {
        method: 'POST',
        
        body: formData,
      });

      const responseData = await response.json();
      console.log('Response from server:', responseData);

      if (response.ok && responseData.success) {
        const updatedProduct = { ...productDetails, image: responseData.image_url };
        console.log('Updated product details:', updatedProduct);
        
        const addProductResponse = await fetch('https://autodealer.onrender.com/addproduct', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        });

        const data = await addProductResponse.json();
        data.success ? alert("Product Added") : alert("Failed");
      } else {
        throw new Error(responseData.message || 'Failed to upload product image');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      alert("An error occurred while adding the product. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct();
  };
 

  return (
    <div className='add-product'>
      <form onSubmit={handleSubmit}>
        <div className="addproduct-itemfield">
          <p>Product title</p>
          <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
            <option value="sports">Sports</option>
            <option value="muscle">Muscle</option>
            <option value="electric">Electric</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <div className="addproduct-itemfield">
          <button type="submit" className='addproduct-btn'>Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;