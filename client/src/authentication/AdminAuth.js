import { useSelector } from "react-redux";
import { selectAdminloginstatus } from "../Redux/Slices/Authslice";

import  { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const AdminAuth = (path) => {
    const navigate = useNavigate()
const adminlogstatus = useSelector(selectAdminloginstatus)


  useEffect(() => {
if(adminlogstatus!==true){
navigate(path)
}
    
  }, [adminlogstatus,navigate,path])
  
}

export default AdminAuth