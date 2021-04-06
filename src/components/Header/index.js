import logo from '../../logo.jpg';
import style from './styles.module.css';

import getNavigationItems from '../../utils/navigation';

import { useState, useContext } from 'react';

import NavigationItem from '../NavigationItem';
import {AuthContext} from '../../ContextWrapper';

const Header = () => {
    const [isAuthenticated, username] = useContext(AuthContext);
console.log(isAuthenticated);
    const [currentHeaderItem = 1, setCurrentHeaderItem] = useState();

    const HEADER_MENU_ITEMS = getNavigationItems(isAuthenticated);

    const menuItemClickHandler = (id) => {
        setCurrentHeaderItem(id);
    }

    return(
        <header>
            <nav className={style.nav}>
                <div className={style['logo-wrapper']}>
                    <img src={logo}/>
                </div>
                <ul className={style['list-menu']}>

                {HEADER_MENU_ITEMS.map(x => 
                    <NavigationItem 
                        key={x.id}
                        id={x.id}
                        href={x.href}
                        image={x.image}
                        liClassName='list-item'
                        linkClassName='active-navigation-item'
                        isSelected={x.id === currentHeaderItem}
                        onClick={menuItemClickHandler}
                    >
                        {x.text}
                    </NavigationItem>
                
                )}

                </ul>
            </nav>
        </header>
    );
}

export default Header;