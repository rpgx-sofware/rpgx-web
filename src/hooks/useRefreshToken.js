import { useContext } from "react";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const {auth,setAuth} = useAuth();
    const refresh = async () => {
        const response = await fetch('/auth/refresh',{
            method: "GET",
            credentials: 'include', 
        })
        let data = await response.json()
        setAuth(prev => {
            return {...prev, 
                perms: data.perms,
                accessToken: data.token}
        })
        return response.body.token;
    }
    return refresh;
}

export default useRefreshToken;