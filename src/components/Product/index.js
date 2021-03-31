import style from './styles.module.css';

import { Link } from 'react-router-dom';

import Image from '../Image';

const Product = ({
    id,
    name,
    price,
    imageURL,
    category,
    categoryId
}) => {

    return (
        <li className={style['product-item']}>
            <Image src={imageURL} />
            <h5>{name}</h5>
            <p>Category: {category}</p>
            <h6>Price: <span>{price} лв.</span></h6>
            <div className={style['button-wrapper']}>
                <Link to={`/products/${categoryId}/${category}/details/${id}`}><button>Details</button></Link>
            </div>
        </li>
    );
}

/*
<Link to={`/products/${categoryId}/${category}/edit/${id}`}><button>Edit</button></Link>
*/
export default Product;