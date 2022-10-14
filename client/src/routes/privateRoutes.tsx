import {useAppSelector} from '../Redux/Store/hooks'
import {Navigate, Outlet} from 'react-router-dom'

export const PrivateRoutes = ()=>{
    const user = useAppSelector((state)=>state.users.userInfo)
    return user._id !== '' ? <Outlet/> : <Navigate replace to={'/signup'}/>
}

export const PublicRoutes = ()=>{
    const user = useAppSelector((state)=>state.users.userInfo)
    return user._id === '' ? <Outlet/> : <Navigate replace to={'/'}/>
}