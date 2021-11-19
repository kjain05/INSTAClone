import React, {useState} from "react"
import { Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import M from "materialize-css"

const Signup = () => {
    const navigate = useNavigate();//react history hook now called navigate hook
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");

    const PostData = ()=>{

        //to check if email is valid or not,if not return instantly
        if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){
           return   M.toast({html: "Invalid Email Id",classes:"#ff1744 red accent-3"})
        }
        fetch("/signup",{

        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            password:password,
            email:email
        })

        }).then(res => res.json())
          .then(data => {
              //condn to display toast type error messages
              if(data.error){
                M.toast({html: data.error,classes:"#ff1744 red accent-3"})
              }
              else{
                  M.toast({html: data.message,classes:"#00e676 green accent-3"})
                  navigate('/signin')//redirects to login page once user has signed up successfully
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
                <input type="text" placeholder="name" value={name}
                onChange={(e)=>setName(e.target.value)} />

                <input type="text" placeholder="email" value={email}
                onChange={(e)=>setEmail(e.target.value)} />

                <input type="text" placeholder="password" value={password}
                onChange={(e)=>setPassword(e.target.value)} />


                <button className="btn waves-effect waves-light #0d47a1 blue darken-4"
                onClick={()=>PostData()}>Signup</button>
                <h5>
                    <Link to="/Signin">Already have an account?</Link>
                </h5>

            </div>
        </div>
    )
}

export default Signup;