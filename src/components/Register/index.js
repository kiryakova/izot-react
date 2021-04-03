import style from './styles.module.css';

import firebase from '../../utils/firebase';
import requester from '../../services/app-service';
import {timeoutRedirect} from '../../helpers/timeout-redirect.js';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import FormInput from '../FormInput';
import Notification from '../Notification';

const Register = ({
    history
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState('');

    const onSubmitHandler = async (e) => {
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

    return (
        <div className={style['product-login-container']}>
                <Notification message={notification} />
                <form className={style['product-login-form']} onSubmit={onSubmitHandler}>
                    <FormInput
                        name="email"
                        type="email" 
                        placeholder="Please enter email address..." 
                        defaultValue={email}
                        label='Email' 
                    />

                    <FormInput
                        name="password"
                        type="password"  
                        defaultValue={password}
                        label='Password' 
                    />

                    <div className={style['link-container']}>
                        <Link className={style['link-redirect']} to="/login">LogIn&#32;&#32;<i class="fas fa-sign-in-alt"></i></Link>
                    </div>

                    <div className={style['button-wrapper']}>
                        <input className="button" type="submit" value="Register"  />
                        <Link className="button" to="/products">Cancel</Link>
                    </div>
                </form>
            </div>
    );
}

export default Register;