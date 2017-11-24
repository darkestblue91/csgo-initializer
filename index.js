const prompt = require('prompt');
const SteamUser = require('steam-user');
const accountSchema = require('./accountSchema');
const twoFactorSchema = require('./twoFactorSchema');

console.log('CSGO bot initializer');

//Start data recolection
prompt.start();

prompt.get(accountSchema, (err, accountResult) => {
	if(err) console.log(err);

	//Create client
	const client = new SteamUser();
	const user = {
		accountName: accountResult.username,
		password: accountResult.password
	};

	//Log in into account
	client.logOn(user);

	//When account is logged in
	client.on('loggedOn', () => {
		console.log('Logged in succesfully');
		console.log(`Enabling 2 factor authentification!`);

		client.enableTwoFactor((response) => {
			if(response.status === SteamUser.EResult.OK) {
				//Obtain secret key
				const sharedKey = response.shared_secret;

				//Ask for SMS code
				prompt.get(twoFactorSchema, (err, smsResult) => {
					if(err) console.log(err);

					client.finalizeTwoFactor(sharedKey, smsResult.sms, (err) => {
						if(err) return console.log('Can not add two factor authentification.');

						console.log('Two factor authentification added to account.');
						console.log('NOTE: Add the following information as environment variables and save then in a safe place.');
						console.log('DANGER: If you do not save this info you cannot run the bot well and you fucked up the bot account for at least 7-15 days :D.');
						console.log('Bot number: ', accountResult.bot);
						console.log('Shared secret: ', response.shared_secret);
						console.log('Identity secret: ', response.identity_secret);
						console.log('Revocation code: ', response.revocation_code);
						console.log('Bot is enabled to use it with automated codes generator');

						client.logOff();
					});
				});
			} else {
				console.log(`Failed! try again later!`);
			}
		});
	});
});
