import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Event from './Event';
import  styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
function Home() {
let navigate=useNavigate();
let searche=useRef();
let [events,setevents]=useState([]);

const [currLocation, setCurrLocation] = useState({});

useEffect(() => {
  getLocation();
}, []);

const getLocation = async () => {
  const location = await axios.get("https://ipapi.co/json");
  setCurrLocation(location.data);
};

const login=async ()=>{
  try {
  let res=await axios.get('https://event-booking-website-2.onrender.com/getlog');
  console.log(res.data);
  if(res.data.msg!="true")
  {
    navigate('/login');
  }
  } catch (error) {
    console.log("can not login");
  }
  
}
useEffect(()=>{
  login()
},[]);
const getevent=async ()=>{
try {
  let res=await axios.get('https://event-booking-website-2.onrender.com/getevent');
  console.log(res)
  setevents(res.data);
} catch (error) {
  console.log("can not get event");
}
 

}
const searchevent=async (e)=>{
  e.preventDefault();
  const searcheve=searche.current.value;

  try {
    let res=await axios.get(`https://event-booking-website-2.onrender.com/searchevent/${searcheve}`);
     
      console.log(res.data)
      if(res.data){
      console.log(res.data);
      setevents(res.data);}
      else{
        console.log("got nothing");
        }
   
   
    
  } catch (error) {
    console.log("can not get event");
  }

}
useEffect(()=>{
  getevent();
},[])
  return (
    <div>
         <div className={styles.image}>
          <form onSubmit={searchevent} className={styles.but}>
          <input
        placeholder="Search"
        type="text"
        ref={searche}
        value={currLocation.city} // Set the value of the input field to the default city name
        onChange={(e) => setCurrLocation(e.target.value)} // Allow the user to change the default city name
      />

           <button >Search</button>
        </form>
          <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
          <div className={styles.plain}>
        <ul >
            {
                events.map((item,index)=>{
                    if(item.seatleft>0)
                    return <Event getevent={getevent}key={index}id={item._id} location={item.location}price={item.price} seat={item.seatleft} img={item.img} event={item.event} date={item.date}/>
                })
            }
        </ul></div>
    </div>
  )
}

export default Home