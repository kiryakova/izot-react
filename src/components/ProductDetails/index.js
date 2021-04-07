import style from './styles.module.css';

import requester from '../../services/app-service';

import { useEffect, useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import { Link } from 'react-router-dom';

import Image from '../Image';
import Notification from '../Notification';

import {AuthContext} from '../../ContextWrapper';

const ProductDetails = ({
    match,
    history
}) => {
    const [product, setProduct] = useState({});
    const [countPurschases, setCountPurschases] = useState(0);
    const [notification, setNotification] = useState('');
    const [isAuthenticated] = useContext(AuthContext);

    useEffect(() => {
        requester.dataSet.getById(match.params.productId)
            .then(res => setProduct(res) )
            .catch(() => {
                setNotification('The product is not found!');
            });
    }, []);

    const deleteProduct = async () => {
        try{
            await requester.dataSet.deleteEntity(match.params.productId);
            setNotification('The product is deleted!');
            
            timeoutRedirect(history, `/products/${match.params.categoryId}/category/${product.category}`);

        }
        catch(e){
            setNotification('The product is not deleted!');
        };
    }

    const buyProduct = () => {
        setCountPurschases(oldState => oldState + 1);
    }

    const unbuyProduct = () => {
        setCountPurschases((oldState) => (oldState > 0 ? oldState - 1 : 0));
    }

    return (
        <section className = {style['container-product-details']}>
            <article className = {style['product-details']}>
                <Notification message={notification} />
                <Image src={product.imageURL} />
                <h5>{product.name}</h5>
                <p>Category: {product.category}</p>
                <h6>Price: <span>{product.price} лв.</span></h6>
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