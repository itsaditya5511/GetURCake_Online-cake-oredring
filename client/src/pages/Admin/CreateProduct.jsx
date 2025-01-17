import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import { useNavigate } from "react-router-dom";
import AdminMenu from '../../components/AdminMenu';

 import { Select } from "antd";
 const { Option } = Select;
 import toast from 'react-hot-toast';
import axios from 'axios';
function craeateProduct() {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
    //get all category
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
  
    useEffect(() => {
      getAllCategory();
    }, []);


    
  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
       'http://localhost:8000/api/v1/product/create-product',
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
    <div className="container-fluid m-3 p-3"  style={{ backgroundColor: '#fff8dc' }}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Product</h1>
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="form-control"
              onChange={(e) => {
               // Regex pattern to allow only alphabetic characters and spaces, and limit to 12 characters
              const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 12);
              setName(newValue);
                    }}
                />
          </div>


          <div className="mb-3">
    <textarea
        value={description}
        placeholder="Write a description"
        className="form-control"
        onChange={(e) => {
            // Regex pattern to allow only alphabetic characters and spaces
            const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            setDescription(newValue);
        }}
    />
</div>


<div className="mb-3">
      <input
        type="text"
        value={price}
        placeholder="Write a Price"
        className="form-control"
        onChange={(e) => {
          // Regex pattern to allow only numbers
          let newValue = e.target.value.replace(/\D/g, '').slice(0, 5);
          
          // Ensure the value is a positive number greater than zero
          if (newValue && parseInt(newValue, 10) > 0) {
            setPrice(newValue);
          } else {
            setPrice('');
          }
        }}
      />
    </div>




    <div className="mb-3">
      <input
        type="text"
        value={quantity}
        placeholder="Write a quantity"
        className="form-control"
        onChange={(e) => {
          // Regex pattern to allow only numbers
          let newValue = e.target.value.replace(/\D/g, '').slice(0, 2);
          
          // Ensure the value is a positive number greater than zero
          if (newValue && parseInt(newValue, 10) > 0) {
            setQuantity(newValue);
          } else {
            setQuantity('');
          }
        }}
      />
    </div>



            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                required
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default craeateProduct