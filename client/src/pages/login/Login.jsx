import "./Login.css"
import { Link } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export const Login = () => {
  const userRef = useRef();
  const passRef = useRef();
  const { dispatch, isFetching} = useContext(Context);
  const onClick = () => {
    window.location.replace("/register")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
      username: userRef.current.value,
      password: passRef.current.value,
    });
    // console.log(isFetching);
    console.log(res.data);
    localStorage.setItem('auth', res.data);
    const user = await axios.get("http://localhost:5000/api/auth/getuser", {
                headers: {
                    'authtoken': localStorage.getItem("auth")
                }
            })
        localStorage.setItem('pp', user.data.profilePic);

    dispatch({type: "LOGIN_SUCCESS", payload: res.data});

    } catch (error) {
      dispatch({type: "LOGIN_FAILURE"});
    }
    // console.log(isFetching);

    
}
  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input className="loginInput" type="text" placeholder="Enter Your Username" ref = {userRef}/>
            <label>Password</label>
            <input className="loginInput" type="password" placeholder="Enter Your Password" ref = {passRef} />
            <button className="loginButton1" type="submit" disabled={isFetching}>Login</button>
        </form>
        <button className="loginRegisterButton" onClick={onClick}>Register</button>
    </div>
  )
}
