import firebase from './utils/firebase';
import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  username: ''
});

const ContextWrapper = (props) => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  const authInfo = {
    isAuthenticated: Boolean(user),
    username: user?.email,
  };

  return (
    <AuthContext.Provider value={[
      authInfo.isAuthenticated,
      authInfo.username,
    ]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default ContextWrapper;