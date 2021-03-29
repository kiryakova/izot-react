import { CATEGORIES } from '../../config/categories';

import style from './styles.module.css';

import { requester } from '../../services/app-service.js';
import { uploadImage } from '../../services/cloudinary-service.js';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import FormInput from '../FormInput';
import FormErrorField from '../FormErrorField';

const ProductAdd = ({
    history
}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [file, setFile] = useState();
    const [errors, setErrors] = useState({name: '', file: null});

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setErrors({});

        if(name.length < 5) {
            setErrors({name: 'Product name should be at least 5 characters long!'});
            return;
        }

        if(!file) {
            setErrors({file: 'Product image should be set!'});
            return;
        }
        
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
        
    };

    const onChangeHandlerFile = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className={style['product-add-container']}>
                <form className={style['product-add-form']} onSubmit={onSubmitHandler}>
                <FormInput
                        name="name"
                        type="text" 
                        handleChange={setName}
                        defaultValue={name}
                        label='Product name'
                    />
                    <FormErrorField message={errors.name} />

                    <FormInput
                        name="price"
                        type="number" 
                        step="0.01" 
                        handleChange={setPrice}
                        defaultValue={price}
                        label='Price(leva)'
                    />
                    <FormErrorField message={errors.price} />

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