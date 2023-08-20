import React from 'react'
import { add, cam, more } from '../images'
import Messages from './Messages'
import Input from './Input'

function Chat() {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jene</span>
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