import {useEffect, useState} from 'react';
import * as productsService from '../../services/productsService';

const ProductDetails = ({
    match
}) => {
    let [product, setProduct] = useState({});

    useEffect(() => {
        productsService.getOne(match.params.productId)
            .then(res => setProduct(res));
    }, []);

    return (
        <section>
            <h3>{product.name}</h3>
            <p>Product counter: {product.likes} <a href="#"><button class="button"><i class="fas fa-heart"></i>
                    Product</button></a>
            </p>
            <p><img src={product.imageURL} /></p>
            <p>{product.description}</p>
        </section>
    );
};

export default ProductDetails;