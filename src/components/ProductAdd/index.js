import { CATEGORIES } from '../../config/categories';

import style from './styles.module.css';
import styled from 'styled-components';

import { requester } from '../../services/app-service.js';

import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductAdd = ({
    history
}) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [price, setPrice] = useState();
    const [errors, setErrors] = useState({name: '', category: ''});

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (e.target.name.length < 5) {
            setErrors({ ...errors, name: 'Product name should be at least 5 characters long!'});
        }

        const { name, price, description, category, imageURL } = e.target;

        requester.dataSet.createEntity({'name': name.value, 'price' : price.value, 'description' : description.value, 'category' : category.value, 'imageURL' : imageURL.value})
            .then(() => {
                history.push('/products');
            });

        e.stopPropagation();
    };

    const onChangeHandler = (e) => {
        setName(e.target.value);
    }

    return (
        <div className={style['product-add-container']}>
                <form className={style['product-add-form']} onSubmit={onSubmitHandler}>
                    <label htmlFor="name">Product name</label>
                    <input className={style['input-field']}  
                        type="text" 
                        id="name" 
                        name="name" 
                        value={name} 
                        onChange={onChangeHandler} 
                    />
                    {errors.name && 
                        <span>{errors.name}</span>
                    }


                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        
                    />

                    <label htmlFor="description">Description</label>
                    <textarea name="description" onChange={onChangeHandler} value={description} />

                    <label htmlFor="category"></label>
                    <select
                        name="category"
                        id="category"
                        onChange={onChangeHandler}
                        value={category}
                    >
                        {CATEGORIES.map(x => 
                            <option key={x.text} value={x.text}>{x.text}</option>    
                        )}
                    </select>


                    <input type="file" name="imageURL" />
                    
                    <div className={style['button-wrapper']}>
                        <input type="submit" value="Send"  />
                    </div>
                </form>
            </div>
    );
}

export default ProductAdd;