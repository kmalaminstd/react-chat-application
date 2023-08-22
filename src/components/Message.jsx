import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';

function Message({message}) {

  const {currentUser} = useContext(AuthContext)
  const {state} = useContext(ChatContext)
  const ref = useRef()

  // console.log(message.senerId);
  // console.log(currentUser.uid);

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior: 'smooth'})
  }, [message])

  return (
    <div ref={ref} className={`message ${message.senerId === currentUser.uid && "owner" } `}>
      <div className="messageInfo">
        <img src={message.senerId === currentUser.uid ? currentUser.photoURL : state.user.photoURL} alt="" />
        {/* <span>{message.date}</span> */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {
          message.img &&(

            <img src={message.img} alt="" />
          )
        }
      </div>
    </div>
  )
}

export default Message