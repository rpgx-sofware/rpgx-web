import React from "react";

export default function Register(){
    return(
        <div>
            <h1>Register</h1>
            <form action="/auth/register" method="post">
                <label htmlFor="user">username</label><br/>
                <input type="text" id="user" name="user"/><br/>
                <label htmlFor="email">email</label><br/>
                <input type="text" id="email" name="email"/><br/>
                <label htmlFor="pwd">password</label><br/>
                <input type="text" id="pwd" name="pwd" />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}