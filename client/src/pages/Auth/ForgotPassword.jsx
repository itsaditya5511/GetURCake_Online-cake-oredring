import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {


    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer,setAnswer] =useState("")
    



    const navigate = useNavigate();
    const location =useLocation();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/auth/forgot-password", {
                email,
                answer,
                newPassword,


            })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate(location.state || "/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title="Forgot password - Ecommer App">
            <div className="form-container" style={{ minHeight: "90vh" , backgroundColor: '#fff8dc' }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Reset Password</h4>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="email"
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>

                    
                    <div className="mb-3">
                        <label htmlFor="answer" className="form-label">Favorite Sport</label>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => {
                                // Regex pattern to allow only alphabetic characters
                                const value = e.target.value.replace(/[^a-zA-Z]/g, '');
                                setAnswer(value);
                            }}
                            className="form-control"
                            id="answer"
                            placeholder="What is Your Favorite Sport"
                            required
                        />
                    </div>



                    <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input
        type="password"
        value={newPassword}
        onChange={(e) => {
            // Regex pattern to allow alphabetic characters, numbers, and common special characters
            const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?-]/g, '');
            setNewPassword(value);
        }}
        className="form-control"
        id="newPassword"
        placeholder="Enter Your Password"
        minLength="8"
        required
    />
</div>

                   
                    <button type="submit" className="btn btn-primary">
                        RESET
                    </button>
                </form>
            </div>
        </Layout>
    )
}


export default ForgotPassword