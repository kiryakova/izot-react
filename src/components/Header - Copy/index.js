import { MAIN_MENU_ITEMS } from './MainMenuItems.js';
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
                    <NavigationItem itemTitle='Products' href="/products" liClassName='list-item' linkClassName='active-navigation-item'></NavigationItem>
                    <NavigationItem itemTitle='Contacts' href="/contacts" liClassName='list-item' linkClassName='active-navigation-item'></NavigationItem>
                    <NavigationItem itemTitle='logIn' href="/logIn" liClassName='list-item' linkClassName='active-navigation-item'><i class="fas fa-sign-in-alt"></i>&#32;</NavigationItem>

                    <li className={style['list-item']}>Administration
                        <ul className={style['list-sub-menu']}>
                            <NavigationItem itemTitle='Add Product' href="/products/add" liClassName='list-item' linkClassName='active-navigation-item'></NavigationItem>
                        </ul>
                    </li>
                    
                    <li className={style['list-item']}>userName
                        <ul className={style['list-sub-menu']}>
                            <NavigationItem itemTitle='Profile' href="/profile" liClassName='list-item' linkClassName='active-navigation-item'></NavigationItem>
                            <NavigationItem itemTitle='LogOut' href="/logOut" liClassName='list-item' linkClassName='active-navigation-item'><i class="fas fa-sign-out-alt"></i>&#32;</NavigationItem>
                        </ul>
                    </li>

                </ul>
            </nav>
        </header>
    );
}

export default Header;