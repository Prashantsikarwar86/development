import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Event(props) {
  let navigate=useNavigate();
  const checkout=async ()=>{
    try {
        const res=await fetch("https://event-booking-website-2.onrender.com/checkout",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            mode:"cors",
            body:JSON.stringify({
                items:[
                    {   id:props.id,
                        quantity:1,
                        price:props.price,
                        name:props.event
                    },
                ]
            })
        });

        
        const data=await res.json();
        window.location=data.url;
       
        
    } catch (error) {
        console.log("error")
    }
}
  const viewevent=async ()=>{
    try {
      
    
      navigate(`/Show/${props.id}`);
    } catch (error) {
      console.log("can not get view");
    }
      

  }
  const deleteevent=async ()=>{
    try {
      let res=await axios.post(`https://event-booking-website-2.onrender.com/delete/${props.id}`);
      console.log(res);
      props.getevent();
      navigate('/')
    } catch (error) {
      console.log("can not delete");
    }
   
   
  }
  return (
    <div>
        <div className="card mt-3 mx-3" style={{width:"18rem", fontFamily:"cursive"}} >
        <img src={props.img} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h3 className="card-title">{props.event}</h3>
        <h5 className="card-title">Date:{props.date}</h5>
        <h5 className="card-title">Seat-left:{props.seat}</h5>
        <h5 className="card-title">Price:{props.price}</h5>
        <h5 className="card-title">Location:{props.location}</h5>
        <button onClick={viewevent} className="btn btn-primary mr-3">View</button>
        <button onClick={checkout}  className="btn btn-primary mx-3 mr-3">Pay</button>
        <button onClick={deleteevent} className="btn btn-primary mr-3">Delete</button>
        
        </div>
        </div>
    </div>
  )
}

export default Event