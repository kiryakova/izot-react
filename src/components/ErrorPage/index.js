import style from './styles.module.css';

import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <section>

            <div>
                <h2>404 - Not Found</h2>
                <Link className="button" to="/products">Go to Products</Link>
            </div>

            <img src="https://res.cloudinary.com/stela-cloud/image/upload/o7hfrt963.png" alt="404" />
        </section>
    )
}

export default ErrorPage;

