import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectloginstatus, set_loginstatus } from "../Redux/Slices/Authslice";

import axios from "axios"
const backend_url = process.env.REACT_APP_BACKEND_URL
const Authenticate = (path) => {
  const logstatus = useSelector(selectloginstatus)
console.log(logstatus)
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    useEffect(() => {
     const loggedinstatus = async ()=>{
     const status = await axios.get(`${backend_url}/logged`,{withCredentials:true})
     dispatch(set_loginstatus(status.data))
     if(!status){
      Navigate(path)
    }
    }
    
     loggedinstatus()
    }, 
    
    
    [dispatch,logstatus,Navigate,path])}

export default Authenticate