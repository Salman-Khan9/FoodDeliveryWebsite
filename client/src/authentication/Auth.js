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
     const status = await axios.get("https://food-hunter-website-server.vercel.app/logged",{withCredentials:true})
     dispatch(set_loginstatus(status.data))
     console.log(logstatus,"logstatus")
     console.log(status.data,"backend status data")
     if(status.data!==true){
      Navigate(path)
    }
    }
    
     loggedinstatus()
    }, 
    
    
    [dispatch,logstatus,Navigate,path])}

export default Authenticate