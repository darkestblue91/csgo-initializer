module.exports = {
	properties: {
		bot: {
			message: 'Bot number is required',
			required: true
		},
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
