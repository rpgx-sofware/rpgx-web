import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = async() => {
        setAuth({})
        try {
            const response = await fetch("/auth/logout",{
                method: 'POST',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        } catch (error) {
            console.error(error)
        }
    }
    return logout
}

export default useLogout