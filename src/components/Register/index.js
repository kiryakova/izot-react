import style from './styles.module.css';

import firebase from '../../utils/firebase';
import requester from '../../services/app-service';
import {timeoutRedirect} from '../../helpers/timeout-redirect.js';

import { useState } from 'react';

import Notification from '../Notification';
import FormLogInRegister from '../FormLogInRegister';

const Register = ({
    history
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});

    const onSubmitHandlerRegister = async (e) => {
        e.preventDefault();

        const { email, password } = e.target;

        const data = {
            'email': email.value, 
            'password' : password.value
        };

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
            setNotification('Unsuccessfyll registration! User already exists!');
        };
    }

    const handleChangeField = (name, value) => {

        if(name == "email" && value.length == 0) {
            setErrors({...errors, [name]: `${name} should be set!`});
        }
        else if(name == "email" && value.length != 0) {
            let patternEmail = RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$`, "");
            if(!patternEmail.test(value)){
                setErrors({...errors, [name]: `${name} is not valid!`});
            }
            else{
                const {email, ...partialErrors} = errors;
                setErrors({...partialErrors});
            }
        }

        if(name == "password" && value.length == 0) {
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
        }

    }

    return (
        <div className={style['login-container']}>
                <Notification message={notification} />
                <FormLogInRegister formType="Register" errors={errors} onSubmitHandler={onSubmitHandlerRegister} handleChangeField={handleChangeField}></FormLogInRegister>
            </div>
    );
}

export default Register;