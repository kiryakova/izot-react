import {Route, Switch} from 'react-router-dom';

import style from './App.module.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import Contacts from './components/Contacts';
import Profile from './components/Profile';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <div className={style.app}>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/profile" component={Profile} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </div>
  );
}
/*<Route path="/products" render={(props) => <Contacts />} /> 
<Route render={() => <h1 >Error Page</h1>} />*/
export default App;
