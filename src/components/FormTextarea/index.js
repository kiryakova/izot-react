import {
    FormTextareaContainer,
    FormTextareaField,
    FormTextareaLabel
} from './styled.module.js';

const FormInput = ({ handleChange, label, ...props }) => {
    return (
        <FormTextareaContainer>
            {label ? (
                <FormTextareaLabel>
                    {label}
                </FormTextareaLabel>
            ) : null}

            {handleChange ? (<FormTextareaField onBlur={(e) => handleChange(e.target.name, e.target.value)} {...props} />)
            : <FormTextareaField {...props} /> }
        </FormTextareaContainer>
    );
}
export default FormInput;

