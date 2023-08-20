import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import { BarLoader } from 'react-spinner-animated'

function Public({children}) {

    const {currentUser, loader} = useContext(AuthContext)
    const location = useLocation()

    let loadCom ;
    if(loader){

      loadCom = currentUser ? (
          <Navigate to={location?.state?.from ? location.state.from : '/chatRoom'} />
      ) : children
    }else{
      return <BarLoader />
    }

  return (
    <div>{loadCom}</div>
  )
}

export default Public