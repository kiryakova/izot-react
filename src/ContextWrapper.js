import { createContext } from 'react';

export const AuthContext = createContext({ 
	user: {}
 });

const ContextWrapper = (props) => {
  return (
    <AuthContext.Provider value={{user: {}}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default ContextWrapper;