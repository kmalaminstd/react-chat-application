import React, { useContext } from 'react'
import { add, cam, more } from '../images'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../contexts/ChatContext'

function Chat() {
  const { state } = useContext(ChatContext)

  // console.log(state.user);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{state.user?.displayName}</span>
        <div className="chatIcons">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
        <Messages />
        <Input />
    </div>
  )
}

export default Chat