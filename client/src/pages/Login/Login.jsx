import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

export const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: undefined,
    password: undefined,
  });

  const { user, dispatch } = useContext(AuthContext);
  
  useEffect(()=>{
    if (user) {
      navigate("/spotify")
    }
  })
  
  const handleInput = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/login",
        userInfo,
        { withCredentials: true }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (e) {
      dispatch({ type: "LOGIN_FAIL", payload: e.response });
    }
  };

  return ( 
    <div className="login">
      <div className="container">
        <h3>Login</h3>
        <form>
          <input
            type="text"
            className="login-form"
            placeholder="username"
            required={true}
            onChange={handleInput}
            id="username"
          ></input>
          <input
            type="password"
            className="login-form"
            placeholder="password"
            id="password"
            required={true}
            onChange={handleInput}
          ></input>
          <button onClick={handleLogin}>sign in</button>
        </form>
      </div>
    </div>
  );
};
