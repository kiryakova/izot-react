import { CATEGORIES } from '../../utils/categories';

import requester from '../../services/app-service';

import style from './styles.module.css';

import { uploadImage } from '../../services/cloudinary-service';
import {timeoutRedirect} from '../../helpers/timeout-redirect';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import FormInput from '../FormInput';
import FormTextarea from '../FormTextarea';
import FormDropdown from '../FormDropdown';
import FormErrorField from '../FormErrorField';
import Notification from '../Notification';

const ProductAdd = ({
    history
}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [file, setFile] = useState();
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({name: '', file: null});

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setErrors({});

        if(!file) {
            setErrors({file: 'Product image should be set!'});
            return;
        }
        else{
            setErrors({});
        }

        let formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'htugtrbk');
    
        const res = await uploadImage(formData);
        
        const imageUrl = res['secure_url'];

        const { name, price, description, category } = e.target;

        const data = {
            'name': name.value, 
            'price' : Number(price.value), 
            'description' : description.value, 
            'category' : category.value, 
            'imageURL' : imageUrl
        };

        if(data.name.length < 5) {
            setErrors({name: 'Product name should be at least 5 characters long!'});
            return;
        }

        if(data.price <= 0) {
            setErrors({price: 'Price should be set!'});
            return;
        }

        if(data.description.length < 7) {
            setErrors({description: 'Description should be at least 7 characters long!'});
            return;
        }

        if(Object.keys(errors).length == 0){
            addProduct(data);
        }

        e.stopPropagation();
        
    };

    const addProduct = async (data) => {
        try{
            await requester.dataSet.createEntity(data);
            setNotification('The product is created!');
            
            timeoutRedirect(history, `/products`);

        }
        catch(e){
            setNotification('The product is not created!');
        };
    }

    const handleChangeField = (name, value) => {
        if(name == "name" && value.length < 5) {
            setErrors({...errors, [name]: `product ${name} should be at least 5 characters long!`});
        }
        else if(name == "name") {
            const {name, ...partialErrors} = errors;
            setErrors({...partialErrors});
        }

        if(name == "price" && value.length < 1) {
            setErrors({...errors, [name]: `${name} should be set!`});
        }
        else if(name == "price") {
            const {price, ...partialErrors} = errors;
            setErrors({...partialErrors});
        }

        if(name == "description" && value.length < 7) {
            setErrors({...errors, [name]: `${name} should be at least 7 characters long!`});
        }
        else if(name == "description") {
            const {description, ...partialErrors} = errors;
            setErrors({...partialErrors});
        }

        /*if(!file) {
            setErrors({...errors, file: `Product image should be set!`});
        }
        else {
            const {file, ...partialErrors} = errors;
            setErrors({...partialErrors});
        }*/
    }

    const onChangeHandlerFile = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className={style['product-add-container']}>
                <Notification message={notification} />
                <form className={style['product-add-form']} onSubmit={onSubmitHandler}>
                    <FormInput
                        name="name"
                        type="text" 
                        handleChange={handleChangeField}
                        defaultValue={name}
                        label='Product name' 
                    />
                    <FormErrorField message={errors.name} />

                    <FormInput
                        name="price"
                        type="number" 
                        step="0.01" 
                        handleChange={handleChangeField} 
                        defaultValue={price}
                        label='Price(leva)' 
                    />
                    <FormErrorField message={errors.price} />
                    
                    <FormTextarea
                        name="description" 
                        label='Description' 
                        handleChange={handleChangeField} 
                        defaultValue={description} 
                    />
                    <FormErrorField message={errors.description} />

                    <FormDropdown
                        name="category" 
                        id="category" 
                        label='Category' 
                        options={CATEGORIES} 
                    />

                    <label className={style['label']} htmlFor="upload-file">Upload File</label>
                    <input className={style['input-field']} 
                        id="upload-file" 
                        name="file" 
                        type="file" 
                        className="upload-file-button" 
                        onChange={onChangeHandlerFile} 
                    />
                    <FormErrorField message={errors.file} />

                    <div className={style['button-wrapper']}>
                        <input type="submit" value="Save"  />
                        <Link to="/products">Cancel</Link>
                    </div>
                </form>
            </div>
    );
}

export default ProductAdd;