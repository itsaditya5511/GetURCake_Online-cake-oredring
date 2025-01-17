import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(name, email, password);
            const res = await axios.post("http://localhost:8000/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                address,
                answer,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
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
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input
        type="text"
        value={name}
        onChange={(e) => {
            // Regex pattern to allow only alphabetic characters and spaces
            const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            setName(value);
        }}
        className="form-control"
        id="name"
        placeholder="Enter Your Name"
        required
        autoFocus
    />
</div>

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
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="password"
                            placeholder="Enter Your Password"
                            minLength="8"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="phone"
                            placeholder="Enter Your Phone"
                            pattern="\d{10}"
                            required
                        />
                    </div>
                    <div className="mb-3">
    <label htmlFor="address" className="form-label">Address</label>
    <input
        type="text"
        value={address}
        onChange={(e) => {
            // Regex pattern to allow only alphabetic characters, spaces, and commas
            const value = e.target.value.replace(/[^a-zA-Z\s,]/g, '');
            setAddress(value);
        }}
        className="form-control"
        id="address"
        placeholder="Enter Your Address"
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
                    <button type="submit" className="btn btn-primary">
                        REGISTER
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
