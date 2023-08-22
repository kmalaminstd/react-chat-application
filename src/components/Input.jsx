import React, { useContext, useState } from 'react'
import { attach, img } from '../images'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../config/firebase.config'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

function Input() {

  const { currentUser } = useContext(AuthContext)
  const { state } = useContext(ChatContext)
  // console.log(state);
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)

  const handleSend = ()=>{
    if(file){

      const bucketRef = ref(storage, `chatImg/${uuid()}`)

      uploadBytes(bucketRef, file)
      .then((snapshot)=>{
        getDownloadURL(snapshot.ref)
        .then((url)=>{
          updateDoc(doc(db, 'chats', state.chatId), {
            msg: arrayUnion({
              id: uuid(),
              text,
              senerId: currentUser.uid,
              img: url,
              date: Timestamp.now()
            })
          }).then((res)=>{
            console.log(res);
            setFile(null)
          }).catch((err)=>{
            console.log(err);
          })
        }).catch((err)=>{
          console.log(err);
        })
      }).catch(err=>{
        console.log(err);
      })


    }else{
      
        updateDoc(doc(db, 'chats', state.chatId), {
          msg: arrayUnion({
            id: uuid(),
            senerId: currentUser.uid,
            text,
            date: Timestamp.now()
          })
        }).then((res)=>{
          setText('')
        }).catch((err)=>{
          console.log(err);
        })

        updateDoc(doc(db, 'userChat', currentUser.uid),{
          [state.chatId+'.lastMessage']: {
            text
          } ,
          [state.chatId + '.date']: serverTimestamp()
        })

        updateDoc(doc(db, 'userChat', state.user.uid),{
          [state.chatId+'.lastMessage']: {
            text
          } ,
          [state.chatId + '.date']: serverTimestamp()
        })
     
    }
    
  }

  // console.log(text);
  return (
    <div className="input">
        <input type="text" placeholder="Type something..." onChange={(e)=>setText(e.target.value)} value={text} />
        <div className="send">
            <img src={attach} alt="" />
            <input type="file" style={{display: 'none'}} id="file" onChange={(e)=>setFile(e.target.files[0])} />
            <label htmlFor="file">
                <img src={img} alt=""  />
            </label>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input