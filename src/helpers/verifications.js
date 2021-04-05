export const verifyEmail = (email) => {
	let patternEmail = RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$`, "");
	if(!patternEmail.test(email)){console.log(email);
		return `Email is not valid!`;
	}
	
	return null;
};

export const verifyPassword = (password) => {
	if(password.length < 6) {
		return `Password should be at least 6 symbols long!`;
	}
	
	return ``;
};

export const verifyConfirmPassword = (password, comfirmPassword) => {
	if(comfirmPassword !== password) {
		return `Confirm Password is different by Password!`;
	}
	else if(comfirmPassword.length < 6) {
		return `Password should be at least 6 symbols long!`;
	}
	
	return ``;
};

export const verifyConfirmPasswordOnly = (comfirmPassword) => {
	if(comfirmPassword.length < 6) {
		return `Password should be at least 6 symbols long!`;
	}
	
	return ``;
};

export const verifyProductName = (name) => {
	if(name.length < 5) {
		return `Product name be at least 5 symbols long!`;
	}
	
	return ``;
};