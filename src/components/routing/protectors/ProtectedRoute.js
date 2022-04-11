import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({
    token = localStorage.getItem('token')
}) => {
    if(!token){
        return <Navigate to={"/"}/>;
    }
    return <Outlet />;
}

export default ProtectedRoute;