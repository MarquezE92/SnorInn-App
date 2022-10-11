import {useAppSelector} from '../Redux/Store/hooks'
import {Navigate, Outlet} from 'react-router-dom'

export const PrivateRoutes = ()=>{
    const user = useAppSelector((state)=>state.auth.userInfo)
    return user._id != '' ? <Outlet/> : <Navigate replace to={'/signup'}/>
}