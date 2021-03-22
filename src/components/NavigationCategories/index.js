import {CATEGORIES_MENU_ITEMS } from './CategoriesMenuItems';

import style from './styles.module.css';
import NavigationItem from '../NavigationItem';

const NavigationCategories = ({
    menuItemClickHandler, currentCategoryItem
}) => {
    return (
            <ul className={style['container-menu']}>
                {CATEGORIES_MENU_ITEMS.map(x => 
                    <NavigationItem 
                        key={x.id}
                        id={x.id}
                        href={x.href}
                        image={x.image}
                        liClassName='category-list-item'
                        linkClassName='active-category-item'
                        isSelected={x.id === currentCategoryItem}
                        onClick={menuItemClickHandler}
                    >
                        {x.text}
                    </NavigationItem>
                
                )}
                
            </ul>
    );
};

export default NavigationCategories;