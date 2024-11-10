import {createContext,useState} from 'react'

export const context = createContext();

const ContextProvider = ({children}) => {
    const [user,setUser] = useState({
        id:"",
        name:" ",
        email:" ",
        role:" "
    });
  return (
    <context.Provider value={{user,setUser}}>
        {children}
    </context.Provider>
  )
}

export default ContextProvider;