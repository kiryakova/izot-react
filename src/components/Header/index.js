import logo from '../../logo.jpg';
import style from './styles.module.css';
import NavigationItem from '../NavigationItem';

const Header = () => {
    return(
        <header>
            <nav className={style.nav}>
                <div className={style['logo-wrapper']}>
                    <img src={logo}/>
                </div>
                <ul className={style['list-menu']}>
                    <NavigationItem itemTitle='Products' href="/products"></NavigationItem>
                    <NavigationItem itemTitle='Contacts' href="/contacts"></NavigationItem>
                    <NavigationItem itemTitle='logIn' href="/logIn"><i class="fas fa-sign-in-alt"></i>&#32;</NavigationItem>

                    <li className={style['list-item']}>Administration
                        <ul className={style['list-sub-menu']}>
                            <NavigationItem itemTitle='Add Product' href="/products/add"></NavigationItem>
                        </ul>
                    </li>
                    
                    <li className={style['list-item']}>userName
                        <ul className={style['list-sub-menu']}>
                            <NavigationItem itemTitle='Profile' href="/profile"></NavigationItem>
                            <NavigationItem itemTitle='LogOut' href="/logOut"><i class="fas fa-sign-out-alt"></i>&#32;</NavigationItem>
                        </ul>
                    </li>

                </ul>
            </nav>
        </header>
    );
}

export default Header;