import style from './styles.module.css';

import * as productsService from '../../services/products-service';

import { useEffect, useState } from 'react';

import Product from '../Product';
import NavigationCategories from '../NavigationCategories';

const Products = ({
    match
}) => {console.log(match.params.categoryId);
    const [products, setProducts] = useState([]);
    const [currentCategoryItem, setCurrentCategoryItem] = useState(1);
    const [currentCategory, setCurrentCategory] = useState('all');

    const getProducts = (category, currentCategoryItem) => {
        productsService.getAll(category)
            .then(res => {
                setProducts(res);
                setCurrentCategory(category);
                setCurrentCategoryItem(currentCategoryItem);
            })
    }

    const menuItemClickHandler = (id) => {
        setCurrentCategoryItem(id);
    }

    useEffect(() => {
        const category = match.params.category;

        if (category == currentCategory) {
            return;
        }
        
        let categoryId = match.params.categoryId;

        if(categoryId){
            getProducts(category, categoryId);
        }
        else{
            getProducts(category, currentCategoryItem);
        }
    }, [match])

    return (
        <div className={style.container}>
            <NavigationCategories menuItemClickHandler={menuItemClickHandler} currentCategoryItem={currentCategoryItem} />

            <ul className={style['container-products']}>
                {products.map(x => 
                    <Product key={x.id} {...x} categoryId={currentCategoryItem} />
                )}
            </ul>
        </div>
    );
}

export default Products;