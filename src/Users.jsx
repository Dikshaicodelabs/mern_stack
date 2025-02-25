import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "./redux/slices/UserSlice";
import { useDispatch } from "react-redux";
const Users = () => {
  const [users, setUsers] = useState([]);
  const user_id= localStorage.getItem("id");
  console.log("id", user_id)
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  console.log(token);
  const navigate= useNavigate()
  const getUsers = async () => {
    const result = await fetch("http://localhost:1100/all-users",
      {
        headers:{
          "Authorization": "Bearer "+ token
        }
      }
    );
    const data = await result.json();

    setUsers(data.data);
  };
 

   
  const handleDelete = async (id) => {

  if(id=== user_id){
    console.log(id,"id")
    await fetch("http://localhost:1100/delete/" + id,
      {
        method: "DELETE",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }).then(()=>{alert('deleted')});
      navigate('/')

    }else{
      alert('sorry, you cannot dlt this user')
      return
    }
  };

  const handleSignUp=()=>{
    dispatch(signOut())
    navigate('/login')
  }
  useEffect(() => {
    getUsers();
  }, []);
  console.log(users, ">>>>>>>");
  return (
    <>
      <h1>all users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <b>NAME</b>&nbsp;&nbsp;
          <span>{user.name}</span>&nbsp;&nbsp;
          <b>EMAIL</b>&nbsp;&nbsp;
          <span>{user.email}</span>
          <button onClick={() => handleDelete(user._id)}>Delete</button>
          <hr />
        </div>
      ))}

      <button onClick={handleSignUp}>Sign Up</button>
    </>
  );
};

export default Users;
