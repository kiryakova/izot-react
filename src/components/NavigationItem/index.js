import style from './styles.module.css';

import cashRegisters from '../../images/cash-registers.jpg';
import electronicScales from '../../images/electronic-scales.jpg';
import fiscalPrinters from '../../images/fiscal-printers.jpg';

import {NavLink} from 'react-router-dom';

const NavigationItem = ({
    id,
    liClassName,
    linkClassName,
    href,
    image,
    children,
    isSelected,
    onClick
}) => {

    let classes = [];

    if (isSelected) {
        classes.push(style[linkClassName]);
    }

    if(image == "cashRegisters") {
        image = <img src={cashRegisters} alt="" />
    }
    else if(image == "electronicScales") {
        image = <img src={electronicScales} alt="" />
    }
    else if(image == "fiscalPrinters") {
        image = <img src={fiscalPrinters} alt="" />
    }

    return(
        <li className={style[liClassName]}>
            <NavLink className={classes.join(' ')} to={href}  exact={true} onClick={() => onClick(id)} >
            {image} {children}
            </NavLink>
        </li>
    );
}

export default NavigationItem;