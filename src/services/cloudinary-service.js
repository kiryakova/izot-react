export const uploadImage = (data) => {
    return fetch(`https://api.cloudinary.com/v1_1/stela-cloud/image/upload`, {
        method: 'POST',
        body: data
    })
    .then(res => res.json())
    .catch(() => {
        console.log('There is a problem with Cloudinary!');
    });
};
