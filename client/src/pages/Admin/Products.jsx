import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from "react-router-dom";
function Products() {

    const[products,setProducts]=useState([])

    const getAllProducts=async()=>{
        try {

            const {data}=await axios.get('http://localhost:8000/api/v1/product/get-product');
            setProducts(data.products);
            
            
        } catch (error) {
            console.log(error);
            toast.error("SOmething went wrong products/getproducts")
        }
    }
useEffect(()=>{
    getAllProducts()
},[])

  return (
    <Layout>
    <div className="row"  style={{ backgroundColor: '#fff8dc' }}>
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9 ">
        <h1 className="text-center">All Products List</h1>
        <div className="d-flex">
          {products?.map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/admin/product/${p.slug}`}
              className="product-link"
            >
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Products