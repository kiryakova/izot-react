import {Route, Switch} from 'react-router-dom';

import style from './App.module.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Contacts from './components/Contacts';
import Profile from './components/Profile';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <div className={style.app}>
      <Header />
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/products" exact component={Products} />
        <Route path="/products/category/:category" exact component={Products} />
        <Route path="/products/details/:productId" component={ProductDetails} />
        <Route path="/contacts" exact component={Contacts} />
        <Route path="/profile" exact component={Profile} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </div>
  );
}
/*<Route path="/products" render={(props) => <Contacts />} /> 
<Route render={() => <h1 >Error Page</h1>} />
<Route path="/products/:categoryId" exact component={Products} />
<Route path="/products/product/:id" exact component={Product} />
*/
export default App;