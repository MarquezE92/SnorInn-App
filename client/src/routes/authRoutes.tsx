import {useAppSelector} from '../Redux/Store/hooks'
import {Navigate, Outlet} from 'react-router-dom'

export const AuthRoutes = ()=>{
    const user = useAppSelector((state)=>state.users.userInfo)
    return user && user.isAdmin ? 
    <Outlet/> : (alert('You are not authorized'), <Navigate replace to={'/'}/>)
}

