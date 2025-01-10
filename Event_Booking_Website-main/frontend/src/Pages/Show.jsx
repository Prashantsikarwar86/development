import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import styles from './Show.module.css';
function Show() {
    let params=useParams();
    let navigate=useNavigate();
    let [events,setevent]=useState({img:'',event:'',date:'',seatleft:0,price:0,location:''})
    const showevent=async ()=>{
        try {
            let res=await axios.get(`https://event-booking-website-2.onrender.com/getevent/${params.id}`);
            let {img,event,date,seatleft,price,location}=res.data;
            setevent({img,event,date,seatleft,price,location});
            console.log(res);

        } catch (error) {
            console.log("can not get show");
        }
        
    }
    const addtocart=async ()=>{
        try {
            let res=await axios.post(`https://event-booking-website-2.onrender.com/addtocart/${params.id}`);
            console.log(res);
        } catch (error) {
            console.log("can not add");
        }
       
    }
    const editevent= ()=>{
        navigate(`/edit/${params.id}`);
    }
    const gohome=()=>{
        navigate('/');
    }
    useEffect(()=>{
        showevent();
    },[])
  return (
    <div className={styles.marg} >
           <div className="card mt-3 " style={{width:"18rem", fontFamily:"cursive",margin:"auto"}} >
        <img src={events.img} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h3 className="card-title">Event:{events.event}</h3>
        <h5 className="card-title">Date:{events.date}</h5>
        <h5 className="card-title">Seat-left:{events.seatleft}</h5>
        <h5 className="card-title">Price:{events.price}</h5>
        <h5 className="card-title">Location:{events.location}</h5>
        <button  onClick={gohome} className="btn btn-primary ">back</button>
        <button  onClick={editevent} className="btn btn-primary mx-3">Edit</button>
       
        </div>
        </div>
    </div>
  )
}

export default Show