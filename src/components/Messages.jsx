import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../contexts/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase.config'

function Messages() {
  
  const { state } = useContext(ChatContext)
  const [message, setMessage] = useState([])
  
  useEffect(()=>{
    (()=>{
      if(state.chatId){
        return onSnapshot(doc(db, 'chats', state.chatId), (doc)=>{
          doc.exists() && setMessage(doc.data().msg)
        })
      }
    })()
  }, [state.chatId])
  // console.log(message);
  return (
    <div className="messages">

      {
        message &&
        message.map((msg, i)=> <Message key={i} message={msg} />)
      }

        
    </div>
  )
}

export default Messages