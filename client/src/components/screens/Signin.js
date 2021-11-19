import React, {useState} from "react"
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import M from "materialize-css"

const Signin = () => {

        const navigate = useNavigate();//react history hook now called navigate hook
        const [password,setPassword]=useState("");
        const [email,setEmail]=useState("");
    
        const PostData = ()=>{
    
            //to check if email is valid or not,if not return instantly
            if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){
               return   M.toast({html: "Invalid Email Id",classes:"#ff1744 red accent-3"})
            }

            fetch("/signin",{
    
            method:"post",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                password:password,
                email:email
            })
        //fetch.then() statement
            }).then(res => res.json())
              .then(data => {
                  console.log(data);
                  //condn to display toast type error messages
                  if(data.error){
                    M.toast({html: data.error,classes:"#ff1744 red accent-3"})
                  }

                  else{
                      M.toast({html:"Signed In Successfully!",classes:"#00e676 green accent-3"})
                      navigate('/')//redirects to home page once user has signed In successfully
                    }
                  //console.log(data);
              })
              .catch(err =>{
                  console.log(err);
              }) 
        }


    return (
        <div className="mycard">
            <div className="card auth-card input-field ">
                <h2>INSTA</h2>

                <input type="text" placeholder="email" value={email}
                onChange={(e)=>setEmail(e.target.value)} />

                <input type="text" placeholder="password" value={password}
                onChange={(e)=>setPassword(e.target.value)} />


                <button className="btn waves-effect waves-light #0d47a1 blue darken-4"
                onClick={()=>PostData()}>Login</button>

                <h5>
                    <Link to="/Signup">New User?</Link>
                </h5>

            </div>
        </div>
    )
}

export default Signin;