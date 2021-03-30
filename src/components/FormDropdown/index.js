import {
    FormDropdownContainer,
    FormDropdownField,
	FormDropdownOption,
    FormDropdownLabel
} from './styled.module.js';

const FormDropdown = ({ handleChange, label, options, ...props }) => {
    return (
        <FormDropdownContainer>
            {label ? (
                <FormDropdownLabel>
                    {label}
                </FormDropdownLabel>
            ) : null}

            {handleChange ? (<FormDropdownField onBlur={(e) => handleChange(e.target.name, e.target.value)} {...props} > 
				{options.map(x => 
                            <FormDropdownOption key={x.id} value={x.value}>{x.text}</FormDropdownOption>    
                        )}
				</FormDropdownField>
			)
            : <FormDropdownField {...props} > 
				{options.map(x => 
                            <FormDropdownOption key={x.id} value={x.value}>{x.text}</FormDropdownOption>    
                        )}
				</FormDropdownField>
			}
        </FormDropdownContainer>
    );
}
export default FormDropdown;

