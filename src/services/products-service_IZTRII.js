const url = 'http://localhost:5000/products';

/*let url ='https://softuniproject-412dd.firebaseio.com/articles.json';*/

export const getAll = (category = '') => {
    let productsUrl = url + ((category && category !== 'all') ? `?category=${category}` : '');

    return fetch(productsUrl)
        .then(res => res.json())
        .catch(error => console.log(error));
}

export const getOne = (productId) => {
    return fetch(`${url}/${productId}`)
        .then(res => res.json())
        .catch(error => console.log(error));
}