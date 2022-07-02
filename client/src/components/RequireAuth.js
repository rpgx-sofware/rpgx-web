import {useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const RequireAuth = ({neededPerms}) => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth?.perms?.find(perm => neededPerms?.includes(perm))
            ? <Outlet/>
            : auth?.user
                ? <Navigate to="/dashboard" state={{from: location}} replace/>
                : <Navigate to="/login" state={{from: location}} replace/>

    );
}

export default RequireAuth