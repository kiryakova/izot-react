import { CATEGORIES } from '../../config/categories';

import style from './styles.module.css';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductAdd = () => {
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

        
    };

    const onChangeHandler = (e) => {
        setName(e.target.value);
    }

    return (
        <div>
                <h1>Add Product</h1>

                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="name">Product name</label>
                    <input 
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
                        onChange={onChangeHandler} 
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
                    
                    <input type="submit" value="Send"  />

                    <input
                        type="submit"
                        value="Send"
                        onClick={onSubmitHandler}
                    />
                </form>
            </div>
    );
}

export default ProductAdd;