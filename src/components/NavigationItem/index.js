import {NavLink} from 'react-router-dom';

import style from './styles.module.css';

const NavigationItem = (props) => {
        return(
            <li className={style['list-item']}>
                <NavLink activeClassName={style['active-navigation-item']} to={props.href}  exact={true}>
                {props.children}{props.itemTitle}
                </NavLink>
            </li>
        );
}

export default NavigationItem;