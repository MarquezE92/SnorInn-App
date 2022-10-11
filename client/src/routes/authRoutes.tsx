import {useAppSelector} from '../Redux/Store/hooks'
import {Navigate, Outlet} from 'react-router-dom'

export const AuthRoutes = ()=>{
    const user = useAppSelector((state)=>state.auth.userInfo)
    return user && user.isAdmin ? 
    <Outlet/> : (alert('You are not authorized'), <Navigate replace to={'/'}/>)
}

export const AuthRoutesUser = () => {
    const user = useAppSelector((state)=>state.auth.userInfo)
    return user && user.isAdmin === false ? 
    <Outlet/> : (alert('You need to Sign In'), <Navigate replace to={'/'}/>)
}