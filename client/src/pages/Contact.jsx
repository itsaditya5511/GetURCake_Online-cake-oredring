import React, { useState } from 'react';
import Layout from '../components/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        setShowPopup(true); // Show the popup message
        // Optionally, you can reset the form fields here if needed
        e.target.reset();
    };

    return (
        <Layout title={"Contact Us - GetUrCake"}>
            <div className="container my-5">
                <h1 className="text-center mb-4">Contact Us</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="contact-info bg-light p-4 rounded shadow-sm">
                            <h3 className="mb-3">Get in Touch</h3>
                            <p>If you have any questions about our cakes or need support with your order, please reach out to us through the following channels:</p>
                            <ul className="list-unstyled mt-4">
                                <li className="mb-3">
                                    <BiMailSend size={24} className="text-primary" /> 
                                    <strong>Email:</strong> <a href="mailto:help@geturcake.com">help@geturcake.com</a>
                                </li>
                                <li className="mb-3">
                                    <BiPhoneCall size={24} className="text-primary" /> 
                                    <strong>Phone:</strong> <a href="tel:+0123456789">012-3456789</a>
                                </li>
                                <li className="mb-3">
                                    <BiSupport size={24} className="text-primary" /> 
                                    <strong>Toll-free Support:</strong> <a href="tel:+18000000000">1800-0000-0000</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="contact-form bg-light p-4 rounded shadow-sm">
                            <h3 className="mb-3">Send Us a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Your Name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Your Email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" id="message" rows="4" placeholder="Your Message" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Popup Message */}
            {showPopup && (
                <div className="popup-message" style={popupStyle}>
                    <div className="popup-content" style={popupContentStyle}>
                        <h4>Thank You!</h4>
                        <p>We will reach out to you soon.</p>
                        <button onClick={() => setShowPopup(false)} style={closeButtonStyle}>Close</button>
                    </div>
                </div>
            )}
        </Layout>
    );
};

// Inline styles for popup
const popupStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
};

const popupContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const closeButtonStyle = {
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '10px',
};

export default Contact;
