import style from './styles.module.css';

import * as productsService from '../../services/productsService';

import { Component } from 'react';

import Product from '../Product';
import NavigationCategories from '../NavigationCategories';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            currentCategory: 'all',
        }

    }

    getProducts(category) {
        productsService.getAll(category)
            .then(res => {

                this.setState({ products: res, currentCategory: category })
            })
    }

    componentDidMount() {
        this.getProducts();
    }

    componentDidUpdate(prevProps) {
        const category = this.props.match.params.category;

        if (prevProps.match.params.category === category) {
            return;
        }

        this.getProducts(category);
    }

    render() {
        return (
            <div className={style.container}>
                <NavigationCategories />

                <ul className={style['container-products']}>
                    {this.state.products.map(x => 
                        <Product key={x.id} {...x} />
                    )}
                </ul>
            </div>
        );
    }
}

export default Products;