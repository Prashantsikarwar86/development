import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Edit() {
    let params=useParams();
    let navigate=useNavigate();
    let image=useRef();
  let item=useRef();
  let data=useRef();
  let seat=useRef();
  let priceval=useRef();
  let loc=useRef();
    const editevent=async (e)=>{
         e.preventDefault();
         let img=image.current.value;
         let event=item.current.value;
         let date=data.current.value;
         let seatleft=seat.current.value;
         let price=priceval.current.value;
         let location=loc.current.value;

         if(img===""){
          toast.error("image url is required",{
            position:"top-center"
          });
        }else if(event===""){
          toast.error("event is required",{
            position:"top-center"
          });
        }else if(date===""){
          toast.warning("Enter a Date of an event",{
            position:"top-center"
          });
        }else if(seatleft===""){
          toast.error("seatleft is required",{
            position:"top-center"
          });
        }else if(price===""){
          toast.error("price is required",{
            position:"top-center"
          });
        }
        else if(location===""){
          toast.error("location is required",{
            position:"top-center"
          });
        }

        else {
         try {
           
            let res=await axios.put(`https://event-booking-website-2.onrender.com/edit/${params.id}`,{img,event,date,seatleft,price,location});
            navigate('/');
         } catch (error) {
            console.log("can not edit");
         }
        
        }
    }
  return (
    <div>
            <div className="row">
  <div className="col-md-6 mx-auto">
   <h1 className="display-6">Edit Your Event</h1>
      <form onSubmit={editevent}>
          <div className="mb-3">
           <label htmlFor="img" className="form-label">Image</label>
           <input type="text" ref={image}className="form-control" name="img" placeholder="img"/>
          </div>
          <div  className="mb-3">
            <label htmlFor="event" className="form-label">Event</label>
            <input type="text" ref={item} className="form-control" name="event" placeholder="event"/>
           </div>
          <div  className="mb-3">
           <label htmlFor="date" className="form-label">Date</label>
           <input type="date" ref={data} className="form-control" name="date" placeholder="date"/>
          </div>
          <div  className="mb-3">
           <label htmlFor="price" className="form-label">Price</label>
           <input type="number" ref={priceval} className="form-control" name="price" placeholder="price"/>
          </div>
          
          <div  className="mb-3">
           <label htmlFor="seatleft" className="form-label">Seats</label>
           <input type="number" ref={seat} className="form-control" name="seatleft" placeholder="seatleft"/>
          </div>
          <div  className="mb-3">
           <label htmlFor="location" className="form-label">Location</label>
           <input type="text" ref={loc} className="form-control" name="location" placeholder="location"/>
          </div>
          <button className="btn btn-sm btn-success">Edit event</button>
          
      </form>
      <ToastContainer/>
  </div>

</div>
    </div>
  )
}

export default Edit