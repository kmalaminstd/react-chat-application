import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase.config';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    // console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((res)=>{
      console.log(res);
      navigate('/chatRoom')
    }).catch((err)=>{
      console.log(err.message);
      console.log(err.code);
      setErr(true)
    })
  }

  const handleChange = (e)=>{
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Your Chat</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" name="email" onChange={handleChange}  value={data.name}/>
            <input type="password" placeholder="password" name="password"  onChange={handleChange}  value={data.password}/>
            <button>Sign in</button>
            {err && <p style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>Something went wrong!</p>}
          </form>
          <p>You don't have an account? <Link to="/registration">Register</Link></p>
        </div>
      </div>
    </>
  )
}

export default Login