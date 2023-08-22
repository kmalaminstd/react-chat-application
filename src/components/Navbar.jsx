import React, { useContext } from 'react'
import {userImg} from '../images'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase.config'
import { AuthContext } from '../contexts/AuthContext'


function Navbar() {

  const { currentUser } = useContext(AuthContext)
// console.log(currentUser);
  return (
    <div className="navbar">
      <span className="logo">Your Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Log Out</button>
      </div>
    </div>
  )
}

export default Navbar