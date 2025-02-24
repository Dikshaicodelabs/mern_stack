import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const result = await fetch("http://localhost:1100/all-users");
    const data = await result.json();

    setUsers(data.data);
  };

  const handleDelete = async (id) => {
    console.log(id,"id")
    await fetch("http://localhost:1100/delete/" + id,
      {
        method: "DELETE",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }).then(()=>{alert('deleted')});
  };
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
    </>
  );
};

export default Users;
