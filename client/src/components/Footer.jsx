import React from 'react'
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer" style={{ backgroundColor: '#fff8dc' }}>
            <h1 className="text-center"></h1>
            <p className="text-center mt-3">
                Made with ❤️ by aditya suaysh
            </p>
            <p className="text-center mt-3">
        |<Link to="/about">About Us</Link>|
      

      </p>

        </div>
    )
}

export default Footer
