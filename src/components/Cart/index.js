import style from './styles.module.css';

import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CartProduct from '../CartProduct';

import {AuthContext, CartContext} from '../../ContextWrapper';

const Cart = () => {
    const [isAuthenticated, username] = useContext(AuthContext);
    const [cartItems] = useContext(CartContext);
    const [boughtProducts, setBoughtProducts] = useState({});
    
console.log(cartItems);
    
    useEffect(() => {
        if(cartItems){
            let res = Object.entries(cartItems)
                .map(([id, record]) => ({id, ...record}) );
            
            setBoughtProducts(res);
        }
    }, []);

    return(
        <section className={style['cart-container']}>
            <h2>Products in your Cart:</h2>
            {boughtProducts.length > 0 ? (boughtProducts.map(x => 
                <CartProduct key={x.id} {...x} />
            ) ) : <h3 className={style['cart-empty-message']}>There are no products in your cart!</h3>}
        
        </section>
    );
}

export default Cart;