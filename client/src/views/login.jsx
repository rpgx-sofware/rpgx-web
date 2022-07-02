import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function Login(){
    const {setAuth}  = useAuth();

    const [user,setUser] = useState('');
    const [pwd,setPwd] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/auth/login',{
                method: 'POST',
                //mode: 'cors', 
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user,pwd}) // body data type must match "Content-Type" header
            })
            let res = await response.json()
            const accessToken = res.token
            setAuth({user,accessToken,perms: res.perms});
            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} method="post">
                <label htmlFor="user">username</label><br/>
                <input type="text" id="user" name="user" onChange={(e) => setUser(e.target.value)} value={user}/><br/>
                <label htmlFor="pwd">password</label><br/>
                <input type="text" id="pwd" name="pwd" onChange={(e) => setPwd(e.target.value)} value={pwd} />
                <input type="submit" value="Submit"></input>
            </form>
            <Link to={"/dashboard"}>dash</Link>
        </div>
    )
}