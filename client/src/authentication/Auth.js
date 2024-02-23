import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectloginstatus, set_loginstatus } from "../Redux/Slices/Authslice";

import axios from "axios"
const Authenticate = (path) => {
  const logstatus = useSelector(selectloginstatus)
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    useEffect(() => {
     const loggedinstatus = async ()=>{
     const status = await axios.get("https://food-delivery-website-lovat.vercel.app/logged",{withCredentials:true})
     dispatch(set_loginstatus(status.data))
     if(status.data!==true){
      Navigate(path)
    }
    }
    
     loggedinstatus()
    }, 
    
    
    [dispatch,logstatus,Navigate,path])}

export default Authenticate