import React from "react";
import useLogout from "../hooks/useLogout";


export default function Dashboard(){
    const logout = useLogout();

    const signOut = async () => {
        await logout();
    }

    return(
        <div>
            <h1>dashboard</h1>
            <p>you have the right permissions</p>
            <button onClick={signOut}>Log out</button>
        </div>
    )
}