import React from "react"
import { Link } from 'react-router-dom'
const Signup = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field ">
                <h2>INSTA</h2>
                <input type="text" placeholder="name" />
                <input type="text" placeholder="email" />
                <input type="text" placeholder="password" />


                <button className="btn waves-effect waves-light #0d47a1 blue darken-4">Signup
                </button>
                <h5>
                    <Link to="/Signin">Already have an account?</Link>
                </h5>











            </div>
        </div>
    )
}

export default Signup;