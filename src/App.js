import firebase from './utils/firebase';
import './services/app-service';

import React, {Suspense, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import ContextWrapper from './ContextWrapper';

import Header from './components/Header';
import Footer from './components/Footer';
//import Products from './components/Products';
//import ProductAdd from './components/ProductAdd';
//import ProductDetails from './components/ProductDetails';
//import ProductEdit from './components/ProductEdit';
//import Contacts from './components/Contacts';
//import ErrorPage from './components/ErrorPage';

const Products = React.lazy(() => import('./components/Products'));
const ProductAdd = React.lazy(() => import('./components/ProductAdd'));
const ProductDetails = React.lazy(() => import('./components/ProductDetails'));
const ProductEdit = React.lazy(() => import('./components/ProductEdit'));
const Contacts = React.lazy(() => import('./components/Contacts'));
const Register = React.lazy(() => import('./components/Register'));
const LogIn = React.lazy(() => import('./components/LogIn'));
const ErrorPage = React.lazy(() => import('./components/ErrorPage'));

function App(props) {

  const [user, setUser] = useState(props.user ? {
    ...props.user
  } : {})

  return (
    <ContextWrapper value={
      user
    }>
      <Header />
        <Suspense fallback={<div className="lazy-notification">Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/category/:category" exact component={Products} />
            <Route path="/products/:categoryId/category/:category" exact component={Products} />
            <Route path="/products/add" exact component={ProductAdd} />
            <Route path="/products/:categoryId/:category/details/:productId" component={ProductDetails} />
            <Route path="/products/:categoryId/:category/edit/:productId" component={ProductEdit} />
            <Route path="/contacts" exact component={Contacts} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={LogIn} />
            <Route path='/logout' render={() => {
              firebase.auth().signOut();
              return <Redirect to="/" />
            }} />
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
      <Footer />
    </ContextWrapper>
  );
}

export default App;
