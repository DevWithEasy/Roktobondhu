import { Navigate, useLocation } from "react-router-dom";

const Protected = ({children}) => {
    const isAuth = true;
    const location = useLocation()
    return isAuth ? (children) :
    <Navigate to='/login' replace state={{from : location}}/>
};

export default Protected;