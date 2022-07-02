import { useContext } from "react";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const refresh = async () => {
        const response = await fetch('/auth/refresh',{
            credentials: 'include', 
        })
        setAuth(prev => {
            console.log(response.body)
            return {...prev, 
                perms: response.body.perms,
                accessToken: response.body.token}
        })
        return response.body.token;
    }
    return refresh;
}

export default useRefreshToken;