import style from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

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