import style from './styles.module.css';

import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CartProduct from '../CartProduct';

import Notification from '../Notification';

import {CartContext} from '../../ContextWrapper';

const Cart = () => {
    const [cartItems, setCartItems] = useContext(CartContext);
    const [boughtProducts, setBoughtProducts] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [notification, setNotification] = useState('');
    
    useEffect(() => {
        if(cartItems){
            try{
                let products = Object.entries(cartItems)
                    //.filter(([id, value]) => value.count !== 0)
                    .map(([id, record]) => ({id, ...record}));
                
                setBoughtProducts(products);
                /*const total = Object.entries(cartItems).reduce((acc, value) => {
                    acc += value[1].count * value[1].price;
                    return acc;
                }, 0);*/
                setTotalPrice(getTotalPrice(products));
            }
            catch(e){
                setNotification('There is a problem with your Cart!');
            };
        }

    }, [cartItems]);

    /*useEffect(() => {
        return (async () => {
            let newCartItems = await Object.entries(cartItems).reduce((acc, value) => {
                if(value[1].count > 0)
                    acc[value[0]] = value[1];
                    return acc;
                }, {});

            (newCartItems && newCartItems.length > 0) ? setCartItems(newCartItems) : setCartItems({});
            
        });
    }, []);*/

    const getTotalPrice = (products) => {
        if(products && products.length > 0) 
            return products.reduce((acc, value) => {
                        acc += value.count * value.price;
                        return acc;
                }, 0);
        else
            return 0;
    }

    return(
        <section className={style['cart-container']}>
            <h2>Products in your Cart:</h2>
            <Notification message={notification} />
            {boughtProducts && boughtProducts.length > 0 ? (boughtProducts.map(x => 
                <CartProduct key={x.id} {...x} total={getTotalPrice} />
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