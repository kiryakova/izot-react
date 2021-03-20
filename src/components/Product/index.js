import { Link } from 'react-router-dom';

const Product = ({
    id,
    name,
    description,
    imageURL,
    category,
    likes,
}) => {

    return (
        <li>
            <h3>Name: {name}</h3>
            <p>Category: {category}</p>
            <p><img src={imageURL} /></p>
            <p>{description}</p>
            <div>
                <Link to="#"><button><i className="fas fa-heart"></i> Product</button></Link>
                <Link to={`/products/details/${id}`}><button>Details</button></Link>
                <i className="fas fa-heart"></i> <span> {likes}</span>
            </div>
        </li>
    );
}

export default Product;