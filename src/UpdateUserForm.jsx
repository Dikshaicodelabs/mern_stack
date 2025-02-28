import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { signIn } from "./redux/slices/UserSlice";
import { useDispatch } from "react-redux";
const UpdateUserForm = () => {
  const [user, setUser] = useState({});
  // console.log(user, '///////////////////')
  const [name, setName] = useState("");
  console.log(name);

  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [suggesstions, setSuggesstions] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const { id } = useParams();
  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};
  const getUser = async () => {
    const result = await fetch("http://localhost:1100/get-user/" + id);
    console.log(result, "result;;;;;");
    const data = await result.json();
    console.log(data, "data??????");
    setUser(data.data);
    setName(data.data.name);
    setEmail(data.data.email);
    setDob(data.data.dob);
    setBio(data.data.bio);
    setSuggesstions(data.data.suggesstions);
    setImage(data.data.image);
  };

  const handleSubmit = async (id) => {
    const result = await fetch("http://localhost:1100/update-user/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        bio: bio,
        suggesstions: suggesstions,
        dob: dob,
      }),
    });
    const data = await result.json();
    dispatch(signIn({ name, email, bio, suggesstions }));
  };
  console.log(image, ">>>");
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <form>
        <img
          src={`http://localhost:1100/images/${image}`}
          alt="image"
          height="100"
          width="100"
        />
        <label>Name:</label>&nbsp;&nbsp;
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email:</label>&nbsp;&nbsp;
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Dob:</label>&nbsp;&nbsp;
        <input
          type="date"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <br />
        <label>Bio:</label>&nbsp;&nbsp;
        <input
          type="text"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <br />
        <label>Suggesstions:</label>&nbsp;&nbsp;
        <input
          type="text"
          name="suggesstions"
          value={suggesstions}
          onChange={(e) => setSuggesstions(e.target.value)}
        />
        <br />
        <br />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(user._id);
          }}
        >
          Update Details
        </button>
      </form>
      <br />
      <b>
        <p>Click here to see all users!!!</p>
      </b>
      <Link to="/all-users">
        <button>Show all users </button>
      </Link>
    </div>
  );
};

export default UpdateUserForm;
