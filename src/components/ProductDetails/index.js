import style from './styles.module.css';

import requester from '../../services/app-service';

import { useEffect, useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import { Link } from 'react-router-dom';

import Image from '../Image';
import Notification from '../Notification';

import ContextWrapper from '../../ContextWrapper';

const ProductDetails = ({
    match,
    history
}) => {
    const [product, setProduct] = useState({});
    const [notification, setNotification] = useState('');
    const context = useContext(ContextWrapper);

    console.log(context);

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

            /*
            const timer = setTimeout(() => {
                history.push(`/products/${match.params.categoryId}/category/${product.category}`);
              }, 3000);
            
            return () => clearTimeout(timer);
            */

        }
        catch(e){
            setNotification('The product is not deleted!');
        };
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

                <div className={style['button-wrapper']}>
                    <Link to={`/products/${match.params.categoryId}/${product.category}/edit/${match.params.productId}`}><button>Edit</button></Link>
                    <Link to="#"><button onClick={deleteProduct}>Delete</button></Link>
                    <Link to={`/products/${match.params.categoryId}/category/${product.category}`}><button>Back to products...</button></Link>
                </div>
            </article>
        </section>
    );
};

export default ProductDetails;