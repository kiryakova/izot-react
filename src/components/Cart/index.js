import style from './styles.module.css';

import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CartProduct from '../CartProduct';

import {CartContext} from '../../ContextWrapper';

const Cart = () => {
    const [cartItems] = useContext(CartContext);
    const [boughtProducts, setBoughtProducts] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    
console.log(cartItems);
    
    useEffect(() => {
        if(cartItems){
            let products = Object.entries(cartItems)
                .filter(([id, value]) => value.count !== 0)
                .map(([id, record]) => ({id, ...record}));
            
            setBoughtProducts(products);

            /*const total = products.reduce((acc, value) => {
                acc += value.count * value.price;
                return acc;
            }, 0);
            */
            const total = Object.entries(cartItems).reduce((acc, value) => {
                acc += value[1].count * value[1].price;
                return acc;
            }, 0);

            setTotalPrice(total);
        }

    }, [cartItems]);

    return(
        <section className={style['cart-container']}>
            <h2>Products in your Cart:</h2>
            {boughtProducts.length > 0 ? (boughtProducts.map(x => 
                <CartProduct key={x.id} {...x} />
            ) ) : <h3 className={style['cart-empty-message']}>There are no products in your cart!</h3>}

            {boughtProducts.length > 0 ? (
                
                <h2>Total price: <span>{totalPrice}</span> lv.</h2>
                
            ) : ''}

            {boughtProducts.length > 0 ? (
                <div className={style['button-wrapper']}>
                <Link to="#"><button>Order</button></Link>
                </div>
            ) : ''}
        </section>
    );
}

export default Cart;