import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import useAuth from "../../hooks/useAuth";
import { matchRoutes, useLocation } from "react-router-dom"
import useLogout from "../../hooks/useLogout";

const Layout = () => {

    const logout = useLogout();
    let {auth} = useAuth();
    let Authmenu;

    if(auth.accessToken !== undefined){
        Authmenu = [
            {
                text: "user",
                dest: "/login"
            },
            {
                text: "logout",
                dest: "/",
                action: async () => {
                    await logout();
                }
            }
        ]
    }else{
        Authmenu = [
            {
                text: "Login",
                dest: "/login"
            },
            {
                text: "Register",
                dest: "/register"
            }
        ]
    }


    return(
        <main className="App">
            <NavBar links={[
                {
                    text: "Dashboard",
                    dest: "/dashboard"
                },
            ]}
            linksRight={Authmenu}
            title="RPGX"
            />
            <Outlet/>
        </main>
    )
}

export default Layout;