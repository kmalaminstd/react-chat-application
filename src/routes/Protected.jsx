import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { BarLoader } from 'react-spinner-animated'

function Protected({children}) {
    
    const {currentUser, loader} = useContext(AuthContext)
    const location = useLocation()

    let loadComp;

        if(loader){
            loadComp = currentUser ? (children) : <Navigate to="/login" state={{from: location.pathname}} />
        }else{
            return <BarLoader />
        }
    
    

  return (
    <div>{loadComp}</div>
  )
}

export default Protected