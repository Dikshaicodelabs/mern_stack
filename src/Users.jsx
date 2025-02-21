import React,{useEffect,useState} from "react"


const Users=()=>{
    const [users,setUsers]=useState([])
  const getUsers=async()=>{
    const result = await fetch('http://localhost:1100/users')
        const data = await result.json();

        setUsers(data)
  }
    useEffect(  ()=>{
        getUsers();
    },[])

    console.log(users)
    return (
        <>
          {users.map((user)=>(
            <div key={user.id}>
                <p>{user.name}</p>
            </div>
          ))}
        </>
    )
}

export default Users