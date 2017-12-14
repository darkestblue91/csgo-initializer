module.exports = {
	properties: {
		username: {
			message: 'Username is required',
			required: true
		},
		password: {
			message: 'Password is required',
			hidden: true,
			replace: '*',
			required: true,
		}
	}
};
