import { CATEGORIES } from '../../config/categories';

import style from './styles.module.css';
import styled from 'styled-components';

import { requester } from '../../services/app-service.js';
import { uploadImage } from '../../services/cloudinary-service.js';

import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductAdd = ({
    history
}) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState();
    /*
    const [state, setState] = useState({});
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState();
    const [price, setPrice] = useState();*/
    const [errors, setErrors] = useState({name: '', file: null});

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setErrors({});

        //if (state.name.length < 5) {
        if (name.length < 5) {console.log("aaa");
            setErrors({name: 'Product name should be at least 5 characters long!'});
            //setErrors({ ...errors, name: 'Product name should be at least 5 characters long!'});
            return;
        }

        console.log(errors);

        /*if (state.price.length < 0) {
            setErrors({ ...errors, price: 'Product price should be positive value!'});
        }*/

        //if (!state.file) {
        if (!file) {
            setErrors({file: 'Product image should be set!'});
            return;
        }
        
        if(errors != {}){
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
        /*const { name, value } = e.target;
        console.log(name);
        setState({ ...state, [name]: value });
console.log(state);*/
        setName(e.target.value);
    }

    const onChangeHandlerFile = (e) => {
        //setState({ ...state, file: e.target.files[0] });
        setFile(e.target.files[0]);
    }

    return (
        <div className={style['product-add-container']}>
                <form className={style['product-add-form']} onSubmit={onSubmitHandler}>
                    <label className={style['label']} htmlFor="name">Product name</label>
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


                    <label className={style['label']} htmlFor="price">Price</label>
                    <input className={style['input-field']} 
                        type="number"
                        id="price"
                        name="price" 
                    />

                    <label className={style['label']} htmlFor="description">Description</label>
                    <textarea className={style['input-field']} name="description" />

                    <label className={style['label']} htmlFor="category">Category</label>
                    <select className={style['input-field']} 
                        name="category"
                        id="category" 
                    >
                        {CATEGORIES.map(x => 
                            <option key={x.id} value={x.value}>{x.text}</option>    
                        )}
                    </select>

                    <label className={style['label']} htmlFor="upload-file">Upload File</label>
                    <input className={style['input-field']} 
                        id="upload-file" 
                        name="file" 
                        type="file" 
                        className="upload-file-button" 
                        onChange={onChangeHandlerFile} 
                    />
                    {errors.file && 
                        <span>{errors.file}</span>
                    }

                    <div className={style['button-wrapper']}>
                        <input type="submit" value="Save"  />
                        <Link to="/products">Cancel</Link>
                    </div>
                </form>
            </div>
    );
}

export default ProductAdd;