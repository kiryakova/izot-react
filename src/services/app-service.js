import { fireBaseRequestFactory } from './firebase-requests';

const nameDB = "products";
const apiKey = 'https://softuniproject-412dd.firebaseio.com/';

//**Creates object that support CRUD operations over set of entities
const requester = (() => {
    let _dataSet;
    let apiKey;
    let nameDB;

    let setAuthToken = (token) => {
        _dataSet = fireBaseRequestFactory(apiKey, nameDB, token);
    };

    let init = (firebaseApiKey, firebaseNameDB, token = null) => {
        apiKey = firebaseApiKey;
        nameDB = firebaseNameDB;
        _dataSet = fireBaseRequestFactory(apiKey, nameDB, token);
    };

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

export default requester;
