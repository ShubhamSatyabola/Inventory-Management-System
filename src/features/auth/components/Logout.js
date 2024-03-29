import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutUserAsync, selectLoggedInUser } from "../authSlice"
import { Navigate } from "react-router-dom"

const Logout = () => {
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(logoutUserAsync(user.id))
    },[])
    const user = useSelector(selectLoggedInUser);
  return <>{!user && <Navigate to={'/login'}></Navigate>}</>;
}
export default Logout