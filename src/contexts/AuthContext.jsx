import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase.config'

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [currentUser, setCurrentUser] = useState(null)
    const [loader, setLoader] = useState(false)
    const [changetDet, setChangeDet] = useState(false)

    useEffect(()=>{
        return onAuthStateChanged(auth, (user)=>{
            // console.log(user);
            if(!user){
                setLoader(true)
                setCurrentUser(null)
            }else{
                setLoader(true)
                setCurrentUser(user)
            }
        })
        
    },[changetDet])
    
    const value = {
        currentUser,
        loader,
        changetDet,
        setChangeDet
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
