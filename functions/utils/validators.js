const { isEmpty, isEmail } = require('./helpers')

exports.validateLoginData = (data) => {
	let error = {};
	if (isEmpty(data.email)) error.email = 'Must not be empty';
	if (isEmpty(data.password)) error.password = 'Must not be  empty';
	return {
		error,
		valid: !Object.keys(error).length
	};
};

exports.validateSignUpData = (data) => {
	let error = {};

	if (isEmpty(data.email)) {
		error.email = 'Must not be empty';
	} else if (!isEmail(data.email)) {
		error.email = 'Must be valid email address';
	}
	if (isEmpty(data.firstName)) error.firstName = 'Must not be empty';
	if (isEmpty(data.lastName)) error.lastName = 'Must not be empty';
	if (isEmpty(data.phoneNumber)) error.phoneNumber = 'Must not be empty';
	if (isEmpty(data.password)) error.password = 'Must not be empty';
	if (data.password !== data.confirmPassword) error.confirmPassword = 'Passwords must be the same';
	if (isEmpty(data.username)) error.username = 'Must not be empty';

	return {
		error,
		valid: !Object.keys(error).length
	};
};
