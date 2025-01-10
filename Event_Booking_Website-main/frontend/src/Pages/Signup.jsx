import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Signup() {
  let navigate=useNavigate();
  let name=useRef();
 
  let mail=useRef();
  let passw=useRef();
  const submitform=async (e)=>{
      e.preventDefault();
      const username=name.current.value;
    
      const email=mail.current.value;
      const password=passw.current.value;

      
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
          let res=await axios.post('https://event-booking-website-2.onrender.com/register',{username,email,password})
            toast.success("User Register successfully",{
            position:"top-center"
          });
         
        }catch(err){
          console.log("can not SignUp");
        }
      }



      

  }
  return (
    <div>
      <div className="row">
  
  <div className="col-md-6 mx-auto">
   <h1 className="display-6">Sign up</h1>
      <form onSubmit={submitform} >
          <div className="mb-3">
           <label htmlFor="name" className="form-label">Username</label>
           <input type="text" ref={name}className="form-control" name="name" placeholder="username"/>
          </div>
          <div  className="mb-3">
           <label htmlFor="email" className="form-label">E-mail</label>
           <input type="email"  ref={mail} className="form-control" name="email" placeholder="email"/>
          </div>
          
          <div  className="mb-3">
           <label htmlFor="password" className="form-label">Password</label>
           <input type="password" ref={passw} className="form-control" name="password" placeholder="password"/>
          </div>
          <button className="btn btn-sm btn-success">Sign Up</button>
      </form>
      <ToastContainer/>
  </div>

</div>


    </div>
  )
}

export default Signup