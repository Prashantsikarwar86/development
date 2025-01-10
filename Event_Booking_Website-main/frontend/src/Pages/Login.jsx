import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import styles from './Login.module.css'
function Login() {
  let navigate=useNavigate();
  let name=useRef();
  let passw=useRef();
  let mail=useRef();
  const login= async (e)=>{
      e.preventDefault();
      var username=name.current.value;
      var password=passw.current.value;
      var email=mail.current.value;

      if(username===""){
        toast.error("username is required",{
          position:"top-center"
        });
      }else if(email===""){
        toast.error("email is required",{
          position:"top-center"
        });
      }else if(!email.includes("@")){
        toast.warning("Enter a valid email",{
          position:"top-center"
        });
      }else if(password===""){
        toast.error("password is required",{
          position:"top-center"
        });
      }

      else {
        try{
          let res=await axios.post('https://event-booking-website-2.onrender.com/login',{username,password,email});
          //   toast.success("User login successfully",{
          //   position:"top-center"
          // });
          navigate('/');
        }catch(err){
          toast.warning("User not Authenticate",{
            position:"top-center"
          });
          e.target.value="";


        }
        
      }

    
      

  }
  return (
    <div className={styles.cont}>
        
  <div className="row">
  <div className="col-md-6 mx-auto">
   <h1 className="display-6">Login</h1>
      <form onSubmit={login}>
          <div className="mb-3">
           <label htmlFor="username" className="form-label">Username</label>
           <input type="text" ref={name}className="form-control" name="username" placeholder="username"/>
          </div>
          <div  className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input type="email" ref={mail} className="form-control" name="email" placeholder="email"/>
           </div>
          <div  className="mb-3">
           <label htmlFor="password" className="form-label">Password</label>
           <input type="password" ref={passw} className="form-control" name="password" placeholder="password"/>
          </div>
          <button className="btn btn-sm btn-success">Login</button>
          <p className="fw-light mt-2">Don't have an account,<a href="/register">SignUp</a></p>
      </form>
      <ToastContainer/>
  </div>

</div>
    </div>
  )
}

export default Login