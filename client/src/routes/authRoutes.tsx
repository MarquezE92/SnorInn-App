import {useAppSelector} from '../Redux/Store/hooks';
import {Navigate, Outlet} from 'react-router-dom';
import Swal from "sweetalert2";

export const AuthRoutes = ()=>{
    const admin = useAppSelector((state)=>state.admin.AdminInfo)
    return admin && admin._id !=''? 
    <Outlet/> : (Swal.fire("Ups!", "You are not authorized", "error"), <Navigate replace to={'/'}/>)
}

