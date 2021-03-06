import style from './styles.module.css';

import allProducts from '../../images/all-products.jpg';
import cashRegisters from '../../images/cash-registers.jpg';
import electronicScales from '../../images/electronic-scales.jpg';
import fiscalPrinters from '../../images/fiscal-printers.jpg';

import {Link} from 'react-router-dom';

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

    if(image === "all"){
        image = <img src={allProducts} alt="" />
    }
    else if(image === "cashRegisters") {
        image = <img src={cashRegisters} alt="" />
    }
    else if(image === "electronicScales") {
        image = <img src={electronicScales} alt="" />
    }
    else if(image === "fiscalPrinters") {
        image = <img src={fiscalPrinters} alt="" />
    }

    return(
        <li className={style[liClassName]}>
            <Link className={classes.join(' ')} to={href}  exact={true} onClick={() => onClick(id)} >
            {image} {children}
            </Link>
        </li>
    );
}

export default NavigationItem;