import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap

import home1 from '../assets/home1.jpg'
import banner1 from '../assets/banner1.jpg'

import bb from '../assets/bb.jpg'

import limbu from '../assets/limbu.jpg'
import lyc from '../assets/lyc.jpg'
import mango from '../assets/mango.jpg'
import org from '../assets/org.jpg'
import bb2 from '../assets/bb2.jpg'



import Layout from '../components/Layout'
import {useAuth} from "../context/Auth"
import { json } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import Prices from "./../components/Prices.js"
import {Checkbox,Radio} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart.jsx'
import "../styles/Homepage.css"
function HomePage() {


   const navigat =useNavigate()
    const [products,setProducts]=useState([])
    const[categories,setCategories]=useState([])
    const [checked,setChecked]=useState([])
    const [radio,setRadio]=useState([])
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const[cart,setCart]=useCart([])

    const location = 'New York, NY';
    const zoom = 12;
    const size = '600x300';
    const apiKey = 'YOUR_GOOGLE_MAPS_STATIC_API_KEY';    
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=${zoom}&size=${size}&key=${apiKey}`;
  



    const getAllProducts=async()=>{
        try {

            const {data}=await axios.get('http://localhost:8000/api/v1/product/get-product');
            setProducts(data.products);
            
            
        } catch (error) {
            console.log(error);
            toast.error("SOmething went wrong products/getproducts")
        }
    }
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
      }, [checked.length, radio.length]);


const handleFilter=(value,id)=>{
    let all =[...checked];
    if(value){
        all.push(id)

    }else{
        all.filter(c=>c !== id)
    }
    setChecked(all)

}

//get all cat
const getAllCategory=async()=>{
    try {
      const {data}=await axios.get('http://localhost:8000/api/v1/category/get-category')
      if(data.success){
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  }
  
  useEffect(()=>{
  getAllCategory()
  getTotal();
  },[])


  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };



  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <Layout title={"ALl Products - Best offers "}>
     <div className="container-fluid row mt-3" style={{ backgroundColor: '#fff8dc' }}>

     <div className="col-md-2">
  <h4 className="text-center">Filter By Category</h4>
  <div className="d-flex flex-column">
    {categories?.map((c) => (
      <Checkbox
        key={c._id}
        onChange={(e) => handleFilter(e.target.checked, c._id)}
      >
        {c.name}
      </Checkbox>
    ))}
  </div>

  {/* price filter */}
  {/* <h4 className="text-center mt-4">Filter By Price</h4>
  <div className="d-flex flex-column">
    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
      {Prices?.map((p) => (
        <div key={p._id}>
          <Radio value={p.array}>{p.name}</Radio>
        </div>
      ))}
    </Radio.Group>
  </div> */}

  <div className="d-flex flex-column mt-3">
    <button
      className="btn btn-danger mb-3"
      onClick={() => window.location.reload()}
    >
      RESET FILTERS
    </button>
  </div>


  
  <Carousel style={{ width: '100%', height: '400px' }}>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={limbu}
        alt="First slide"
      />
      <Carousel.Caption>
       
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={mango}
        alt="Second slide"
      />
      <Carousel.Caption>
       
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={org}
        alt="Third slide"
      />
      <Carousel.Caption>
       
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>

  



</div>


          <div className="col-md-9">
          <h1 className="text-center display-4 my-4 fst-italic bg-light p-3 rounded" style={{ fontWeight: 'bold', color: '#hh000', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>
  Open new happiness in every bite!!
</h1>



          <div className="image-container text-center mb-4">
        <img
          src={home1}
          className="img-fluid img-thumbnail"
          alt="Example"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '800px',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            objectFit: 'cover'
          }}
        />
      </div>
<hr/>
      <h1 className="text-center display-4 my-4" style={{ fontWeight: 'bold', color: '#2c3e50' }}>
  |--------All cakes---------|
</h1>
 
<hr/>

         
        
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
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
                    <p className="card-text"> Rs {p.price} per half kg</p>
                    <button className="btn btn-primary ms-1" onClick={()=>navigat(`product/${p.slug}`)}>More Details</button>
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
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Loadmore"}
                </button>
              )}
            </div>  
          </div>
          <h1 className="text-center display-4 my-4 fst-italic bg-light p-3 rounded" style={{ fontWeight: 'bold', color: '#hh000', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>
our new launches</h1>

<div className="image-container text-center mb-4">
        <img
          src={bb2}
          className="img-fluid img-thumbnail"
          alt="Example"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '800px',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            objectFit: 'cover'
          }}
        />
      </div>
        </div>
        <div className="text-center mb-4">
            <img
              src={mapUrl}
              className="img-fluid img-thumbnail"
              alt="Map"
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '800px',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                objectFit: 'cover'
              }}
            />
          </div>

       
      </Layout>
    )
}

export default HomePage