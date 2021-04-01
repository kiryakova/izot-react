import { createContext } from 'react'

export const AuthContext = createContext({ 
	auth: false,
	/*user: null,
	logIn: () => { },
	logOut: () => { }*/
 })

const ContextWrapper = props => {
  return (
    <AuthContext.Provider value={{auth: true}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default ContextWrapper