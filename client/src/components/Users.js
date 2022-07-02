import {useState, useEffect } from "react";


const Users =() => {
    const [users, setUsers] = useState();

    useEffect(() =>{
        let isMounted = true;

        const getUsers = async () => {
            
        }
    },[])

    return (
        <div>
            <h2>Users list</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user,i) => <li key={i}>{user?.name}</li>)}
                    </ul>
                ) :<p>no users</p>
            }
        </div>
    )
}
export default Users