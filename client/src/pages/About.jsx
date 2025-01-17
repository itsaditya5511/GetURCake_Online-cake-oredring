import React from "react";
import Layout from "../components/Layout";
import banner1 from '../assets/banner1.jpg'


const About = () => {
    return (
        <Layout title={"About Us - GetUrCake"}>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzM3fDB8MHwxfGFsbHwxfHx8fHx8fHwxNjI2ODk5MTg2&ixlib=rb-1.2.1&q=80&w=1080"
                            alt="Delicious Cake"
                            style={{ width: "100%", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                        />
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                        <div>
                            <h2 className="mb-4" style={{ color: "#d2691e", fontFamily: "'Dancing Script', cursive" }}>
                                Welcome to GetUrCake!
                            </h2>
                            <p className="text-justify" style={{ fontSize: "1.1rem", color: "#555" }}>
                                At GetUrCake, we believe that every celebration deserves a perfect cake. 
                                Whether it's a birthday, anniversary, or just a sweet craving, we've got 
                                you covered with our delightful range of cakes. Our expert bakers use only 
                                the finest ingredients to craft cakes that not only taste heavenly but also 
                                look stunning. Let us make your special moments even more memorable with our 
                                cakes, made with love and delivered with care.
                            </p>
                            <p className="text-justify" style={{ fontSize: "1.1rem", color: "#555" }}>
                                Our journey began with a passion for baking and a commitment to quality. 
                                Over the years, we've grown into a beloved brand, known for our creativity 
                                and attention to detail. Join us on this sweet adventure and indulge in the 
                                best cakes around.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
