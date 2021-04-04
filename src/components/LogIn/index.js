import style from './styles.module.css';

import firebase from '../../utils/firebase';
import requester from '../../services/app-service';
import {timeoutRedirect} from '../../helpers/timeout-redirect.js';

import { useContext, useState } from 'react';

import Notification from '../Notification';
import FormLogInRegister from '../FormLogInRegister';

//import ContextWrapper from '../../ContextWrapper';

const LogIn = ({
    history
}) => {
    //const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({name: ''});

    const onSubmitHandlerLogIn = async (e) => {
        e.preventDefault();

        const { email, password } = e.target;

        const data = {
            'email': email.value, 
            'password' : password.value
        };

        verifyUserAndLogIn(data);

        e.stopPropagation();
        
    };

    const verifyUserAndLogIn = async (data) => {
        try{
            const loggedInUser = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);

            const userToken = await firebase.auth().currentUser.getIdToken();
            requester.setAuthToken(userToken);

            //setUser({email: loggedInUser.email});

            setNotification('User logged successfully!');
            
            timeoutRedirect(history, `/products`);

        }
        catch(e){
            setNotification('You credentials are not correct! Please check you email and password!');
        };
    }

    const handleChangeField = (name, value) => {
        if(name == "email" && value.length == 0) {
            setErrors({...errors, [name]: `${name} should be set!`});
        }
        else if(name == "email") {
            const {email, ...partialErrors} = errors;
            setErrors({...partialErrors});
        }

        if(name == "password" && value.length == 0) {
            setErrors({...errors, [name]: `${name} should be set!`});
        }
        else if(name == "password") {
            const {password, ...partialErrors} = errors;
            setErrors({...partialErrors});
        }

    }

    return (
    
        <div className={style['login-container']}>
            <Notification message={notification} />
            <FormLogInRegister formType="LogIn" errors={errors} onSubmitHandler={onSubmitHandlerLogIn} handleChangeField={handleChangeField}></FormLogInRegister>
        </div>
        
    );
}

export default LogIn;