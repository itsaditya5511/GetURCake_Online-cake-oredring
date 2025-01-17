import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {useAuth} from "../../context/Auth"
import "../../styles/AuthStyles.css"



const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[auth,setAuth]=useAuth(
    )



    const navigate = useNavigate();
    const location =useLocation();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(name, email, password)
            const res = await axios.post("http://localhost:8000/api/v1/auth/login", {


                email,
                password,

            })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title="Register - Ecommer App">
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Login FORM</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input
        type="password"
        value={password}
        onChange={(e) => {
            // Regex pattern to allow alphabetic characters, numbers, and common special characters
            const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?-]/g, '');
            setPassword(value);
        }}
        className="form-control"
        id="password"
        placeholder="Enter Your Password"
        minLength="8"
        required
    />
</div>
                    <button type="submit" className="btn btn-primary">
                        LOGIN
                    </button>

                    <button type="submit" className="btn btn-close-white" onClick={()=>navigate('/forgot-password')}>
                        Forgot Password
                    </button>
                    
                </form>
            </div>
        </Layout>
    )
}


export default Login