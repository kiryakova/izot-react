import style from './styles.module.css';

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import {AuthContext, CartContext} from '../../ContextWrapper';

const CartProducts = ({
    id,
    name,
    price,
    count
}) => {

    const [isAuthenticated] = useContext(AuthContext);
    const [countPurschases, setCountPurschases] = useState(count);
    const [cartItems, setCartItems] = useContext(CartContext);

    const buyProduct = async () => {
        await setCountPurschases(oldState => oldState + 1);
        await setCartItems({...cartItems, [id]: {name: name, price: price, count: (countPurschases + 1)}});
    }

    const unbuyProduct = async () => {
        await setCountPurschases((oldState) => (Number(oldState) > 0 ? (oldState - 1) : Number(0)));
        await setCartItems({...cartItems, [id]: {name: name, price: price, count: ((countPurschases > 0) ? (countPurschases - 1) : 0)}});
    }

    return (
        <article className={style['product-item']}>
            <div><p>Product Name: <span>{name}</span></p></div>
            <div><p>Price per piece: <span>{price}</span> lv.</p></div>
            <div><p>Count: <span>{countPurschases}</span></p></div>
            
            {isAuthenticated ? (
                <div className={style['button-wrapper']}><Link to="#">
                <button onClick={unbuyProduct}>-</button>
                <button onClick={buyProduct}>+</button>
                </Link></div>
            ) : ''}

        </article>
    );
}

export default CartProducts;