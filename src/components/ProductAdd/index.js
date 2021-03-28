import { CATEGORIES } from '../../config/categories';

import style from './styles.module.css';
import styled from 'styled-components';

import { requester } from '../../services/app-service.js';
import { uploadImage } from '../../services/cloudinary-service.js';

import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductAdd = ({
    match,
    history
}) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState();
    const [price, setPrice] = useState();
    const [errors, setErrors] = useState({name: ''});

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (e.target.name.value.length < 5) {
            setErrors({ ...errors, name: 'Product name should be at least 5 characters long!'});
        }
        console.log(errors);

        if (e.target.price.value.length < 0) {
            setErrors({ ...errors, price: 'Product price should be positive value!'});
        }

        if (!file) {
            setErrors({ ...errors, image: 'Product image should be set!'});
        }
        console.log("aaa");
        if(!errors){
            const { name, price, description, category } = e.target;

            let formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'htugtrbk');
        
            const res = await uploadImage(formData);
            
            const imageUrl = res['secure_url'];

            const data = {
                'name': name.value, 
                'price' : price.value, 
                'description' : description.value, 
                'category' : category.value, 
                'imageURL' : imageUrl
            };

            requester.dataSet.createEntity(data)
                .then(() => {
                    history.push(`/products`);
                });

            e.stopPropagation();
        }
    };

    const onChangeHandler = (e) => {
        setName(e.target.value);
    }

    const onChangeHandlerFile = (e) => {
        setFile(e.target.files[0]);
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
                    />
                    {errors.price && 
                        <span>{errors.price}</span>
                    }

                    <label htmlFor="description">Description</label>
                    <textarea name="description" />

                    <label htmlFor="category"></label>
                    <select
                        name="category"
                        id="category" 
                    >
                        {CATEGORIES.map(x => 
                            <option key={x.id} value={x.value}>{x.text}</option>    
                        )}
                    </select>

                    <label htmlFor="upload-file">Upload File</label>
                    <input id="upload-file" type="file" className="upload-file-button" onChange={onChangeHandlerFile} />
                    {errors.file && 
                        <span>{errors.file}</span>
                    }

                    <div className={style['button-wrapper']}>
                        <input type="submit" value="Send"  />
                    </div>
                </form>
            </div>
    );
}

export default ProductAdd;