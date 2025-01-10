import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function Success() {
    const params=useParams();
    const navigate=useNavigate();
    const seatbook=async ()=>{
        try {
            let res=await axios.put(`https://event-booking-website-2.onrender.com/seat/${params.id}`);
            console.log(res);
            navigate('/');
        } catch (error) {
            console.log("can not book");
        }
    }
    useEffect(()=>{
        seatbook();
    },[])
  return (
    <div>Success</div>
  )
}

export default Success