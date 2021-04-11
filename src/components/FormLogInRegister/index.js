import style from './styles.module.css';

import { Link } from 'react-router-dom';

import FormInput from '../FormInput';
import FormErrorField from '../FormErrorField';

const FormLogInRegister = ({ formType, errors, onSubmitHandler, handleChangeField }) => {

    return (
        <form className={style['login-form']} onSubmit={onSubmitHandler} fileds>
                <div className={style['input-container']}>
                <i class="fas fa-user"></i>
                <FormInput
                    label='Email' 
                    name="email"
                    type="email" 
                    placeholder="Please enter email address..."
                    defaultValue='' 
                    handleChange={handleChangeField} 
                />
                <FormErrorField message={errors.email} />
                </div>

                <div className={style['input-container']}>
                <i class="fas fa-key"></i>
                <FormInput
                    label='Password' 
                    name="password"
                    type="password"  
                    defaultValue='' 
                    handleChange={handleChangeField} 
                />
                <FormErrorField message={errors.password} />
                </div>

                {(formType=="Register") ? (<div className={style['input-container']}>
                    <i class="fas fa-key"></i>
                    <FormInput
                        label='Confirm Password' 
                        name="confirmPassword"
                        type="password"  
                        defaultValue='' 
                        handleChange={handleChangeField} 
                    />
                    <FormErrorField message={errors.confirmPassword} />
                </div>)
                : null }

                {(formType=="LogIn") ? (<div className={style['link-container']}>
                    <Link className={style['link-redirect']} to="/register">Not&#32;registered&#32;yet?&#32;Register&#32;here&#32;&#32;<i class="fas fa-sign-in-alt"></i></Link>
                </div>)
                : null }

                <div className={style['button-wrapper']}>
                    <input className="button" type="submit" value={formType}  />
                    {(formType=="LogIn") ? (<Link className="button" to="/products">Cancel</Link>) 
                    : (<Link className="button" to="/login">Cancel</Link>)}
                </div>
            </form>
    );
}
export default FormLogInRegister;

