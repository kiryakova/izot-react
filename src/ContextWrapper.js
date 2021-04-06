import { createContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  username: ''
});

const ContextWrapper = (props) => {
  return (
    <AuthContext.Provider value={[
      props.isAuthenticated,
      props.username,
    ]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default ContextWrapper;