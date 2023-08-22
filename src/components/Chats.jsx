import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../config/firebase.config'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'

function Chats() {
  const {currentUser} = useContext(AuthContext)
  const { state, dispatch } = useContext(ChatContext)
  const [chats, setChats] = useState([])

  useEffect(()=>{
      
    (()=>{
      if(currentUser.uid){
      return onSnapshot(doc(db, 'userChat', currentUser.uid), doc=>{
        setChats(doc.data())
      })
    }
    })()

    

  },[currentUser.uid])

  // console.log(Object.entries(chats));

  const handleSelect = (info)=>{
    dispatch({type: 'CHANGE_USER', payload: info})
    // console.log(state);
  }

  return (
    <div className="chats">
      { 
        chats &&
        Object.entries(chats)?.sort((a,b)=>(b[1].date - a[1].date)).map((chat)=>(

          <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Chats