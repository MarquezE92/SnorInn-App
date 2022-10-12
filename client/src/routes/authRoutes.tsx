import {useAppSelector} from '../Redux/Store/hooks'
import {Navigate, Outlet} from 'react-router-dom'

export const AuthRoutes = ()=>{
    const admin = useAppSelector((state)=>state.admin.AdminInfo)
    return admin && admin._id !=''? 
    <Outlet/> : (alert('You are not authorized'), <Navigate replace to={'/'}/>)
}

