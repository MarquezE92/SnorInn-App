import {useAppSelector} from '../Redux/Store/hooks'
import {Navigate, Outlet} from 'react-router-dom'

export const AuthRoutes = ()=>{
    const user = useAppSelector((state)=>state.auth.userInfo)
    return user && user.isAdmin ? 
    <Outlet/> : (alert('NO ESTAS AUTORIZADO'), <Navigate replace to={'/'}/>)
}