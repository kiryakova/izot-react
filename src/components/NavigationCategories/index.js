import cashRegisters from '../../images/cash-registers.jpg';
import electronicScales from '../../images/electronic-scales.jpg';
import fiscalPrinters from '../../images/fiscal-printers.jpg';
import style from './styles.module.css';

import { NavLink } from 'react-router-dom';

const NavigationCategories = () => {
    return (
            <ul className={style['container-menu']}>
                <li><NavLink activeClassName={style['active-item']} to="/products/category/all"><img src={cashRegisters} alt="" />All Products</NavLink></li>
                <li><NavLink activeClassName={style['active-item']} to="/products/category/Cash Registers"><img src={cashRegisters} alt="" />Cash Registers</NavLink></li>
                <li><NavLink activeClassName={style['active-item']} to="/products/category/Electronic Scales"><img src={electronicScales} alt="" />Electronic Scales</NavLink></li>
                <li><NavLink activeClassName={style['active-item']} to="/products/category/Fiscal Printers"><img src={fiscalPrinters} alt="" />Fiscal Printers</NavLink></li>
            </ul>
    );
};

export default NavigationCategories;