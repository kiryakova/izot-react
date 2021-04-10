import firebase from './utils/firebase';
import './services/app-service';

import React, {Suspense, useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {CartContext} from './ContextWrapper';

const Products = React.lazy(() => import('./components/Products'));
const ProductAdd = React.lazy(() => import('./components/ProductAdd'));
const ProductDetails = React.lazy(() => import('./components/ProductDetails'));
const ProductEdit = React.lazy(() => import('./components/ProductEdit'));
const Cart = React.lazy(() => import('./components/Cart'));
const Contacts = React.lazy(() => import('./components/Contacts'));
const Register = React.lazy(() => import('./components/Register'));
const LogIn = React.lazy(() => import('./components/LogIn'));
const ErrorPage = React.lazy(() => import('./components/ErrorPage'));

function AppNavigation() {
    const [cartItems, setCartItems] = useContext(CartContext);

  return (
        <Suspense fallback={<div className="lazy-notification">Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/category/:category" exact component={Products} />
            <Route path="/products/:categoryId/category/:category" exact component={Products} />
            <Route path="/products/:categoryId/:category/details/:productId" exact component={ProductDetails} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/products/add" exact component={ProductAdd} />
            <Route path="/products/:categoryId/:category/edit/:productId" component={ProductEdit} />
            <Route path="/contacts" exact component={Contacts} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={LogIn} />
            <Route path='/logout' render={() => {
              firebase.auth().signOut();
              setCartItems({});
              return <Redirect to="/" />
            }} />
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
  );
}

export default AppNavigation;
