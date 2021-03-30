import {
    FormInputContainer,
    FormInputField,
    FormInputLabel
} from './styled.module.js';

const FormInput = ({ handleChange, label, ...props }) => {
    return (
        <FormInputContainer>
            {label ? (
                <FormInputLabel>
                    {label}
                </FormInputLabel>
            ) : null}

            {handleChange ? (<FormInputField onBlur={(e) => handleChange(e.target.name, e.target.value)} {...props} />)
            : <FormInputField {...props} /> }
        </FormInputContainer>
    );
}
export default FormInput;

