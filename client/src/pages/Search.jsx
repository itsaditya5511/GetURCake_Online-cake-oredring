import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../context/Search'
import { useNavigate } from 'react-router-dom'

import { useCart } from '../context/Cart.jsx'

function Search() {
    const [values, setValues] = useSearch();
    const [products,setProducts]=useState([])
    const[cart,setCart]=useCart([])

    const navigat =useNavigate()

  

  

  return (
    <Layout title={"Search results"}>
    <div className="container"  style={{ backgroundColor: '#fff8dc' }}>
      <div className="text-center">
        <h1>Search Resuts</h1>
        <h6>
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length}`}
        </h6>
        <div className="d-flex flex-wrap mt-4">
          {values?.results.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="card-text"> Rs {p.price}</p>
                <button className="btn btn-primary ms-1" onClick={()=>navigat(`/search/${p.slug}`)}>More Details</button> 
                <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >Intrested</button>
                             </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Search