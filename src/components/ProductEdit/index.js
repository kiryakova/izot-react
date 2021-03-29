import style from './styles.module.css';

import {useEffect, useState} from 'react';
import { requester } from '../../services/app-service.js';

import { Link } from 'react-router-dom';

import FormInput from '../FormInput';
import FormErrorField from '../FormErrorField';
import Image from '../Image';

const ProductEdit = ({
    match,
    history
}) => {
    let [product, setProduct] = useState({});
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        requester.dataSet.getById(match.params.productId)
            .then(res => {
                setProduct(res);
            });
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        setErrors({});

        const { price, description } = e.target;

        const data = {
            'price' : price.value, 
            'description' : description.value, 
        };

        if(!data.price) {
            setErrors({price: 'Price should be entered!'});
            return;
        }

        if(!data.description || data.description.length < 7) {
            setErrors({description: 'Description should be at least 7 characters long!'});
            return;
        }
        
        //if(Object.entries(errors).length === 0){

            requester.dataSet.patchEntity(data, match.params.productId)
                .then(() => {
                    history.push(`/products/${match.params.categoryId}/category/${product.category}`);
                });

            e.stopPropagation();
        //}
    };

    return (
        <section className = {style['container-product-edit']}>
            <article className = {style['product-edit']}>
                <Image src={product.imageURL} />
                <h5>{product.name}</h5>
                <p>Category: {product.category}</p>

                <form className={style['product-edit-form']} onSubmit={onSubmitHandler}>
                    <FormInput
                        name="price"
                        type="number" 
                        step="0.01" 
                        handleChange={setPrice}
                        defaultValue={product.price}
                        label='Price(leva)'
                        required
                    />
                    <FormErrorField message={errors.price} />

                    <label className={style['label']} htmlFor="description">Description</label>
                    <textarea className={style['input-field']} 
                            name="description" 
                            defaultValue={product.description} 
                            onChange={(e) => setDescription(e.target.value)} />
                    <FormErrorField message={errors.description} />

                    <div className={style['button-wrapper']}>
                        <input type="submit" value="Save"  />
                        <Link to={`/products/${match.params.categoryId}/category/${product.category}`}>Cancel</Link>
                    </div>
                </form>

            </article>
        </section>
    );
};

export default ProductEdit;