import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
const Layout = () => {
    return(
        <main className="App">
            <NavBar links={[
                {
                    text: "Dashboard",
                    dest: "/dashboard"
                },
            ]}
            linksRight={[
                {
                    text: "Login",
                    dest: "/login"
                },
                {
                    text: "register",
                    dest: "/register"
                }
            ]}
            title="RPGX"
            />
            <Outlet/>
        </main>
    )
}

export default Layout;