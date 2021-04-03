import './utils/firebase';
import './services/app-service';

import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';

import ContextWrapper from './ContextWrapper';

import Header from './components/Header';
import Footer from './components/Footer';
//import Products from './components/Products';
//import ProductAdd from './components/ProductAdd';
//import ProductDetails from './components/ProductDetails';
//import ProductEdit from './components/ProductEdit';
//import Contacts from './components/Contacts';
//import Profile from './components/Profile';
//import ErrorPage from './components/ErrorPage';

const Products = React.lazy(() => import('./components/Products'));
const ProductAdd = React.lazy(() => import('./components/ProductAdd'));
const ProductDetails = React.lazy(() => import('./components/ProductDetails'));
const ProductEdit = React.lazy(() => import('./components/ProductEdit'));
const Contacts = React.lazy(() => import('./components/Contacts'));
const LogIn = React.lazy(() => import('./components/LogIn'));
const Profile = React.lazy(() => import('./components/Profile'));
const ErrorPage = React.lazy(() => import('./components/ErrorPage'));

function App() {
  return (
    <ContextWrapper>
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
            <Route path="/login" exact component={LogIn} />
            <Route path="/profile" exact component={Profile} />
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
      <Footer />
    </ContextWrapper>
  );
}
/*<Route path="/products" render={(props) => <Contacts />} /> 
<Route render={() => <h1 >Error Page</h1>} />
<Route path="/products/:categoryId" exact component={Products} />
<Route path="/products/product/:id" exact component={Product} />
*/
export default App;
