import {NavLink} from 'react-router-dom';

import style from './styles.module.css';

const NavigationItem = ({
    liClassName,
    linkClassName,
    href,
    itemTitle,
    children
}) => {
        return(
            <li className={style[liClassName]}>
                <NavLink activeClassName={style[linkClassName]} to={href}  exact={true}>
                {children}{itemTitle}
                </NavLink>
            </li>
        );
}

export default NavigationItem;