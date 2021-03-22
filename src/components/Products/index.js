import style from './styles.module.css';

import * as productsService from '../../services/productsService';

import { useEffect, useState } from 'react';

import Product from '../Product';
import NavigationCategories from '../NavigationCategories';

const Products = ({
    match
}) => {
    const [products, setProducts] = useState([]);
    const [currentCategoryItem, setCurrentCategoryItem] = useState(1);
    const [currentCategory, setCurrentCategory] = useState('All Products');

    const getProducts = (category, currentCategoryItem) => {
        productsService.getAll(category)
            .then(res => {
                setProducts(res);
                setCurrentCategory(category);
                menuItemClickHandler(currentCategoryItem);
            })
    }

    const menuItemClickHandler = (id) => {
        setCurrentCategoryItem(id);
    }

    useEffect(() => {
        const category = match.params.category;

        if (category === currentCategory) {
            return;
        }

        let categoryId = match.params.categoryId;
        if(categoryId){
            getProducts(category, categoryId);
        }
        else{
            getProducts(category, currentCategoryItem);
        }
    })

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