import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(children);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("in if");

      navigate("/login");
      //   return null; // Will be executed in render, which can be problematic if do without useEffect
    }
  });
  return <div>{children}</div>;
};

export default UserProtectWrapper;
