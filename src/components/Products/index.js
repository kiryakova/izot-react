import {CATEGORIES_MENU_ITEMS } from '../NavigationCategories/CategoriesMenuItems';

import style from './styles.module.css';

import requester from '../../services/app-service';

import { useEffect, useState, useContext } from 'react';

import Notification from '../Notification';

import Product from '../Product';
import NavigationCategories from '../NavigationCategories';

import {PageContext} from '../../ContextWrapper';

const Products = ({
    match
}) => {
    const [products, setProducts] = useState([]);
    const [currentCategoryItem, setCurrentCategoryItem] = useState(1);
    const [currentCategory, setCurrentCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState('');
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    setCurrentHeaderItem(1);

    useEffect(() => {
        try{
            let category = match.params.category;

            if (category == currentCategory) {
                return;
            }
            
            let categoryId = match.params.categoryId;

            if(categoryId){
                category = CATEGORIES_MENU_ITEMS.filter(x => x.id == categoryId).map(x => x)[0].value;
                
                getProducts(category, categoryId);
            }
            else{
                getProducts(category, currentCategoryItem);
            }
        
        }
        catch(e){
            setNotification('There are not products!');
        };

    }, [match])
    
    const getProducts = (category, currentCategoryItem) => {
       
        requester.dataSet.getAll(category)
        .then(res => {
            if(category && category != 'all'){
                res = Object.entries(res)
                .filter(([key, value]) => value.category === category)
                .map(([id, record]) => ({id, ...record}) );
            }
            else{
                res = Object.entries(res)
                .map(([id, record]) => ({id, ...record}) );
            }

            setIsLoading(true);
            setProducts(res);
            setCurrentCategory(category);
            setCurrentCategoryItem(currentCategoryItem);
        })
        .catch(() => {
            setNotification('There are not products!');
        });;

    }

    const menuItemClickHandler = (id) => {
        setCurrentCategoryItem(id);
    }

    return (
        <div className={style.container}>
            <NavigationCategories menuItemClickHandler={menuItemClickHandler} currentCategoryItem={currentCategoryItem} />
            <Notification message={notification} />

            {(products.length == 0 && isLoading) ? (
                <Notification message="There are not products by selected category!" />
            ) : <Notification message="" />}

            <h1>{!isLoading ? 'Loading...' : ``}</h1>
            
            <ul className={style['container-products']}>
                {products.map(x => 
                    <Product key={x.id} {...x} categoryId={currentCategoryItem} />
                )}
            </ul>
        </div>
    );
}

export default Products;