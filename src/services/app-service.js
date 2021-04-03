import { fireBaseRequestFactory } from './firebase-requests';

const nameDB = "products";
const apiKey = 'https://softuniproject-412dd.firebaseio.com/';

//**Creates object that support CRUD operations over set of entities
const requester = (() => {
    let _dataSet;
    let apiKey;
    let nameDB;

    /**
     * Updates the auth token which is applied to the requests
     * @param {string} token firebaseAuthToken
     */
    let setAuthToken = (token) => {
        _dataSet = fireBaseRequestFactory(apiKey, nameDB, token);
    };

    /**
     * Initialize singleton request objet to be used across the application 
     * @param {string} firebaseApiKey sets the firebaseApiKey to which we will make requests
     * @param {string} token optionally sets the auth token
     */
    let init = (firebaseApiKey, firebaseNameDB, token = null) => {
        apiKey = firebaseApiKey;
        nameDB = firebaseNameDB;
        _dataSet = fireBaseRequestFactory(apiKey, nameDB, token);
    };

    //**Return all supported collection + config functions
    return {
        init,
        setAuthToken,
        //_dataSet
        get dataSet(){
            return _dataSet
        }
    };
})();

if(!requester.dataSet){
    requester.init(apiKey, nameDB, sessionStorage.getItem('token'));
}

//export const requester = requester.dataSet;
export default requester;