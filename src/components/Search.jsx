import React, { useContext, useState } from 'react'
import { collection, where, getDoc, query, doc, getDocs, setDoc, updateDoc, serverTimestamp} from 'firebase/firestore'
import { db } from '../config/firebase.config'
import {AuthContext} from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'

function Search() {

  const {currentUser} = useContext(AuthContext)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [error, setError] = useState(false)
  const {dispatch} = useContext(ChatContext)

  const handleKey = (e)=>{
    e.code === 'Enter' && handleSearch()
    // console.log(e.keycode);
  }

  const handleSearch = async (e)=>{
    const q = query(collection(db, 'users'), where("displayName", "==", username))

    try{
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc)=>{
        setUser(doc.data())
        // console.log(user);
        // dispatch({type: 'CHANGE_USER', payload: user})

      })

    }catch(err){
      setError(true)
      console.log(err);
    }
  }

  const handleSelect = async ()=>{
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

    console.log(combinedId);

    try{
      const res = await getDoc(doc(db, 'chats', combinedId))

      if(!res.exists()){
        await setDoc(doc(db, 'chats', combinedId), {msg: []})

        // userChats
        await updateDoc(doc(db, 'userChat', currentUser.uid),{
          [combinedId+'.userInfo']: {
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName
          },
          [combinedId+".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, 'userChat', user.uid),{
          [combinedId+'.userInfo']: {
            uid: currentUser.uid,
            photoURL: currentUser.photoURL,
            displayName: currentUser.displayName
          },
          [combinedId+".date"]: serverTimestamp()
        })

      }

    }catch(err){
      console.log(err.code);
      console.log(err.message);
    }
    setUser(null)
    setUsername('')
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find user" onKeyDown={handleKey} value={username} onChange={(e)=>setUsername(e.target.value)} />
      </div>
      {error && <p style={{color: '#fff'}}>User not found!</p>}
      { user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search