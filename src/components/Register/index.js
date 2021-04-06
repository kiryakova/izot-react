import style from './styles.module.css';

import firebase from '../../utils/firebase';
import requester from '../../services/app-service';
import {timeoutRedirect} from '../../helpers/timeout-redirect';
import {verifyEmail, verifyPassword, verifyConfirmPassword, verifyConfirmPasswordOnly} from '../../helpers/verifications.js';

import { useState } from 'react';

import Notification from '../Notification';
import FormLogInRegister from '../FormLogInRegister';

const Register = ({
    history
}) => {
    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    //const [confirmPassword, setConfirmPassword] = useState('');
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});

    const onSubmitHandlerRegister = async (e) => {
        e.preventDefault();

        //setErrors({});

        const { email, password, confirmPassword } = e.target;

        const data = {
            'email': email.value, 
            'password' : password.value,
            'confirmPassword' : confirmPassword.value
        };

        let errEmail = await verifyEmail(data.email);
        if(errEmail){console.log(data.email);
            //setErrors({...errors, email: errEmail});
            setErrors(oldErrors => oldErrors.email = errEmail);
        }
        else {
            const {email, ...partialErrors} = errors;
            setErrors({...partialErrors});
        }

        let errConfirmPassword =  await verifyConfirmPassword(data.password, data.confirmPassword);
        if(errConfirmPassword){console.log(data.confirmPassword);
            setErrors({...errors, confirmPassword: errConfirmPassword});
        }
        else {
            const {confirmPassword, ...partialErrors} = errors;
            setErrors({...partialErrors});
        }
        
        registerUser(data);

        e.stopPropagation();
        
    };

    const registerUser = async (data) => {
        try{
            const registeredInUser = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);

            const userToken = await firebase.auth().currentUser.getIdToken();
            requester.setAuthToken(userToken);

            setNotification('User registered successfully!');
            
            timeoutRedirect(history, `/products`);

        }
        catch(e){
            setNotification('Unsuccessfyll registration! User already exist!');
        };
    }

    const handleChangeField = (name, value) => {
        let err = "";
        if(name == "email"){
            err = verifyEmail(value);
        }
        else if(name == "password"){
            err = verifyPassword(value);
        }
        else if(name == "confirmPassword"){
            err = verifyConfirmPasswordOnly(value);
        }

        setErrors({...errors, [name]: err});

        /*if(name == "password" && value.length == 0) {
            setErrors({...errors, [name]: `${name} should be set!`});
        }
        else if(name == "password") {
            const {password, ...partialErrors} = errors;
            setErrors({...partialErrors});
        }

        if(name == "confirmPassword" && value.length == 0) {
            setErrors({...errors, [name]: `${name} should be set!`});
        }
        else if(name == "confirmPassword") {
            const {confirmPassword, ...partialErrors} = errors;
            setErrors({...partialErrors});
        }*/

    }

    return (
        <div className={style['login-container']}>
                <Notification message={notification} />
                <FormLogInRegister formType="Register" errors={errors} onSubmitHandler={onSubmitHandlerRegister} handleChangeField={handleChangeField}></FormLogInRegister>
            </div>
    );
}

export default Register;