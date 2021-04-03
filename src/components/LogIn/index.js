import style from './styles.module.css';

import firebase , { auth } from '../../utils/firebase';

import {timeoutRedirect} from '../../helpers/timeout-redirect.js';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import FormInput from '../FormInput';
import Notification from '../Notification';
import { getAllByDisplayValue } from '@testing-library/dom';

const LogIn = ({
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

        verifyUserAndLogIn(data);

        e.stopPropagation();
        
    };

    const verifyUserAndLogIn = async (data) => {
        try{
            const loggedInUser = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
            
            //const email = data.email;
            //const password = data.password;
            //auth.signInWithEmailAndPassword(data.email, data.password)
            /*auth.signInWithEmailAndPassword(data.email, data.password)
            .then((loggedUser) => {console.log("aaa");
                console.log(loggedUser);
            });*/

            setNotification('User logged successfully!');
            
            timeoutRedirect(history, `/products`);

        }
        catch(e){
            setNotification('You credentials are not correct! Please check you email and password!');
        };
    }

    return (
        <div className={style['product-add-container']}>
                <Notification message={notification} />
                <form className={style['product-add-form']} onSubmit={onSubmitHandler}>
                    <FormInput
                        name="email"
                        type="email" 
                        defaultValue={email}
                        label='Email' 
                    />

                    <FormInput
                        name="password"
                        type="password"  
                        defaultValue={password}
                        label='Password' 
                    />

                    <div className={style['button-wrapper']}>
                        <input type="submit" value="LogIn"  />
                        <Link to="/products">Cancel</Link>
                    </div>
                </form>
            </div>
    );
}

export default LogIn;