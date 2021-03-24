import style from './styles.module.css';
import styled from 'styled-components'

import {useEffect, useState} from 'react';
import * as productsService from '../../services/products-service';

import { Link } from 'react-router-dom';

const ProductDetails = ({
    match
}) => {console.log(match.params.categoryId);console.log("fff");
    let [product, setProduct] = useState({});

    useEffect(() => {
        productsService.getOne(match.params.productId)
            .then(res => setProduct(res));
    }, []);

    const Image = styled.img`
                    width: 300px;
                    height: 300px
                    `

    return (
        <section className = {style['container-product-details']}>
            <article className = {style['product-details']}>
                <Image src={product.imageURL} />
                <h5>{product.name}</h5>
                <p>Category: {product.category}</p>
                <h6>Price: <span>{product.price} лв.</span></h6>
                
                <p>Product counter: {product.likes} <a href="#"><button class="button"><i class="fas fa-heart"></i>
                        Product</button></a>
                </p>
                
                <p>{product.description}</p>
                <div className={style['button-wrapper']}>
                    <Link to={`/products/${match.params.categoryId}/category/${product.category}`}><button>Back to products...</button></Link>
                </div>
            </article>
        </section>
    );
};

export default ProductDetails;