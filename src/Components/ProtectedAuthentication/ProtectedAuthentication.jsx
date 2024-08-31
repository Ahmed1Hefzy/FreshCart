import React from 'react'
import styles from "./ProtectedAuthentication.module.css"
import { Navigate } from 'react-router-dom';
export default function ProtectedAuthentication(props) {
  if (localStorage.getItem("userToken")) {
    return <Navigate to="/"></Navigate>;
  } else {
    return props.children; 
  }
}
