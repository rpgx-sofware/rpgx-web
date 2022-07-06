import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useFetch = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();
    const authFetch = async(url,data) => {
        try {
            let response = await request(url,data)
            if(response.status === 403){
                const newAccessToken  = await refresh();
                response = await request(url,data)
            }
            return response;
        } catch (error) {
            
        }
    }
}

const request = async(url,data) => {
    return await fetch(url,{
        method: 'POST',
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json'
        },
        ...data
    });
}
export default useFetch;