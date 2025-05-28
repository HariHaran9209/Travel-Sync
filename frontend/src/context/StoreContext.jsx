import React, { useState, createContext } from 'react'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [ token, setToken ] = useState("")
  const url = 'http://localhost:4000'
  
  const contextValue = {
    token,
    setToken,
    url
  }
  return (
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider