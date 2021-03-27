import style from './styles.module.css';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const Product = ({
    id,
    name,
    price,
    imageURL,
    category,
    categoryId,
    likes,
}) => {

    const Image = styled.img`
                    width: 250px;
                    height: 250px
                    `

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
<Link to="#"><button><i className="fas fa-heart"></i> Product</button></Link>
                <i className="fas fa-heart"></i> <span> {likes}</span>
*/
export default Product;