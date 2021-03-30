import style from './styles.module.css';

import {useEffect, useState} from 'react';
import { requester } from '../../services/app-service.js';

import { Link } from 'react-router-dom';

import FormInput from '../FormInput';
import FormTextarea from '../FormTextarea';
import FormErrorField from '../FormErrorField';
import Image from '../Image';
import Notification from '../Notification';

const ProductEdit = ({
    match,
    history
}) => {
    let [product, setProduct] = useState({});
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [notification, setNotification] = useState('');
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
            'price' : Number(price.value), 
            'description' : description.value, 
        };

        if(data.price.length < 1) {
            setErrors({price: 'price should be set!'});
            return;
        }

        if(data.description.length < 7) {
            setErrors({description: 'description should be at least 7 characters long!'});
            return;
        }
        
        /*
        requester.dataSet.patchEntity(data, match.params.productId)
            .then(() => {
                history.push(`/products/${match.params.categoryId}/category/${product.category}`);
            });
        */

        editProduct(data, match.params.productId);

        e.stopPropagation();
        
    };

    const editProduct = async (data, productId) => {
        try{
            await requester.dataSet.patchEntity(data, productId);
            setNotification('The product is edited!');
            
            const timer = setTimeout(() => {
                history.push(`/products/${match.params.categoryId}/category/${product.category}`);
                }, 3000);
            
            return () => clearTimeout(timer);

        }
        catch(e){
            setNotification('The product is not deleted!');
        };
    }

    const handleChangeField = (name, value) => {
        if(name == "description" && value.length < 5) {
            setErrors({...errors, [name]: `${name} should be at least 7 characters long!`});
        }
        else if(name == "price" && value.length < 1) {
            setErrors({...errors, [name]: `${name} should be set!`});
        }
        else{
            setErrors({...errors, [name]: ''});
        }
    }

    return (
        <section className = {style['container-product-edit']}>
            <article className = {style['product-edit']}>
                <Notification message={notification} />
                <Image src={product.imageURL} />
                <h5>{product.name}</h5>
                <p>Category: {product.category}</p>

                <form className={style['product-edit-form']} onSubmit={onSubmitHandler}>
                    <FormInput
                        name="price"
                        type="number" 
                        step="0.01" 
                        handleChange={handleChangeField} 
                        defaultValue={product.price}
                        label='Price(leva)'
                        required
                    />
                    <FormErrorField message={errors.price} />

                    <FormTextarea
                        name="description" 
                        label='Description' 
                        handleChange={handleChangeField} 
                        defaultValue={product.description} 
                    />
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