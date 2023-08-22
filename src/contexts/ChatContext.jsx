import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext()

export const ChatProvider = ({children})=>{
    const {currentUser} = useContext(AuthContext)

    const INITIAL_STATE = {
        chatId: null,
        user: {}
    }

    const chatReducer = (state, action)=>{
        // console.log(INITIAL_STATE);
        // console.log(currentUser.uid);
        // console.log(action);
        switch(action.type){
            case "CHANGE_USER":
                console.log(action.payload);
                return{
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid+action.payload.uid: action.payload.uid+currentUser.uid,
                    user: action.payload
                }
                
            default:
                return state
        }
        
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    const value = {
        state, 
        dispatch
    }

    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}