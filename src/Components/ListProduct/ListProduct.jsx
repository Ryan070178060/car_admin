import React, { useEffect, useState } from 'react';
import cross_icon from '../../assets/cross_icon.png';
import './ListProduct.css';



const ListProduct = () => {

  const [allproducts,setAllProducts] = useState ([]);

  const fetchInfo = async ()=>{
    await fetch('https://autodealer.onrender.com/allproducts')
    .then((res)=>res.json())
    .then ((data)=>{setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product =async (id)=>{
    await fetch('https://autodealer.onrender.com/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
   await fetchInfo();
  }



  return (
    <div className='list-product'>
      <h1>All products list</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
         </div>
         <div className="listproduct-allproducts">
          <hr />
          {allproducts.map((product,index)=>{
            return <>
            <div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="list-product-icon" />
              <p>{product.name}</p>
              <p>Ksh {product.old_price}</p>
              <p>Ksh {product.new_price}</p>
              <p>{product.category}</p>
              <p><img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="list-product-remove-icon" /></p>

            </div>
            <hr />
            </>
          })}

         </div>

    </div>
  )
}

export default ListProduct