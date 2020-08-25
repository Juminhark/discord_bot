const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const Client = require('./src/Client');

const PREFIX = '!';

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync('./src/commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(`${client.user.tag} has logged in.`);
});
client.once('reconnecting', () => {
	console.log('Reconnecting!');
});
client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async (message) => {
	if (message.author.username == '미어란다') {
		if (message.content === '1') {
			message.channel.send('이한성 병신');
		} else if (message.content === '2') {
			message.channel.send('한지협 병신');
		} else if (message.content === '3') {
			message.channel.send('정윤호 병신');
		}
	}

	if (message.author.username == '붉은불곰') {
		message.channel.send('정윤호 병신');
	} else if (message.author.username == 'JH_Han') {
		message.channel.send('한지협 병신');
	} else if (message.author.username == '정윤호') {
		message.channel.send('이한성 병신');
	}

	if (message.author.bot) return;
	if (message.content === 'hello') {
		message.channel.send('hello');
	}

	if (message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/);

		const command = client.commands.get(CMD_NAME);

		try {
			command.execute(message);
		} catch (error) {
			console.error(error);
			message.reply('There was an error trying to execute that command!');
		}
	}
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
