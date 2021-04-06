import firebase from './utils/firebase';
import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  username: ''
});

export const PageContext = createContext({
  currentHeaderItem: 1,
  setCurrentHeaderItem: () => {}
});

const ContextWrapper = (props) => {
  
  const [user, setUser] = useState(null);
  const [currentHeaderItem, setCurrentHeaderItem] = useState(1);

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
      authInfo.username
    ]}>
    <PageContext.Provider value={[
      currentHeaderItem,
      setCurrentHeaderItem
    ]}>
      {props.children}
    </PageContext.Provider>
    </AuthContext.Provider>
  );
}

export default ContextWrapper;