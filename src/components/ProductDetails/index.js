import style from './styles.module.css';

import requester from '../../services/app-service';

import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { timeoutRedirect } from '../../helpers/timeout-redirect';

import Image from '../Image';
import Notification from '../Notification';

import {AuthContext, CartContext} from '../../ContextWrapper';

const ProductDetails = ({
    match,
    history
}) => {
    const [product, setProduct] = useState({});
    const [cartItems, setCartItems] = useContext(CartContext);
    const [countPurschases, setCountPurschases] = useState(0);
    const [notification, setNotification] = useState('');
    const [isAuthenticated] = useContext(AuthContext);
    
    useEffect(() => {
        let count = cartItems[match.params.productId] ? (cartItems[match.params.productId].count) : Number(0);
        setCountPurschases(count);

        requester.dataSet.getById(match.params.productId)
            .then(res => setProduct(res) )
            .catch(() => {
                setNotification('The product is not found!');
            });
    }, []);

    const deleteProduct = async () => {
        try{
            /*if(countPurschases > 0){
                setNotification('You cannot delete this product! The product is bought!');
                return;
            }*/
            await requester.dataSet.deleteEntity(match.params.productId);
            setNotification('The product is deleted!');
            
            timeoutRedirect(history, `/products/${match.params.categoryId}/category/${product.category}`);

        }
        catch(e){
            setNotification('The product is not deleted!');
        };
    }

    const buyProduct = async () => {
        await setCountPurschases(oldState => oldState + 1);
        setCartItems({...cartItems, [match.params.productId]: {name: product.name, price: product.price, count: (countPurschases + 1)}});
    }

    const unbuyProduct = async () => {
        await setCountPurschases((oldState) => (Number(oldState) > 0 ? (oldState - 1) : Number(0)));
        setCartItems({...cartItems, [match.params.productId]: {name: product.name, price: product.price, count: ((countPurschases > 0) ? (countPurschases - 1) : 0)}});
    }

    return (
        <section className = {style['container-product-details']}>
            <article className = {style['product-details']}>
                <Notification message={notification} />
                <Image src={product.imageURL} />
                <h5>{product.name}</h5>
                <p><span>Category: </span>{product.category}</p>
                <h6>Price: <span>{product.price} lv.</span></h6>
                <p>{product.description}</p>
                
                {isAuthenticated ? <h6>Bought from you: <span>{countPurschases}</span></h6> : ''}

                <div className={style['button-wrapper-buy']}>
                    {isAuthenticated ? (
                    <div><Link to="#">
                    <button onClick={unbuyProduct}>-</button>
                    <button>Buy</button>
                    <button onClick={buyProduct}>+</button>
                    </Link></div>
                    ) : ''}
                </div>
                
                <div className={style['button-wrapper']}>
                    {isAuthenticated ? (
                    <div><Link to={`/products/${match.params.categoryId}/${product.category}/edit/${match.params.productId}`}><button>Edit</button></Link>
                    <Link to="#"><button onClick={deleteProduct}>Delete</button></Link></div>
                    ) : ''}
                    
                    <Link to={`/products/${match.params.categoryId}/category/${product.category}`}><button>Back to products...</button></Link>
                </div>
            </article>
        </section>
    );
};

export default ProductDetails;