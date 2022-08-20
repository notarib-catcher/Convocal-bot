const { SlashCommandBuilder, Routes, SlashCommandStringOption, SlashCommandRoleOption, SlashCommandAttachmentOption, SlashCommandChannelOption, ChannelType, SlashCommandNumberOption, SlashCommandBooleanOption } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');


const message = new SlashCommandStringOption().setName('message').setRequired(true).setDescription('Embed text content. Supports MD');
const title = new SlashCommandStringOption().setName('title').setRequired(true).setDescription('Title of the embed');
const pickrole = new SlashCommandRoleOption().setName('mention').setRequired(false).setDescription('Role to ping');
const channel = new SlashCommandChannelOption().setName('channel').setRequired(true).setDescription('Channel to send the embed').addChannelTypes(ChannelType.GuildNews, ChannelType.GuildText);
const attachment = new SlashCommandAttachmentOption().setName('file').setRequired(false).setDescription('Attachment to send');
const colour = new SlashCommandStringOption().setName('colour').setRequired(false).setDescription('HEX Colour code for the attachment (Default: None)');
const delay = new SlashCommandNumberOption().setName('delay').setRequired(false).setDescription('Time to delay the message (seconds)');
const linkintitle = new SlashCommandBooleanOption().setName('linkintitle').setRequired(false).setDescription('Do you want the link to the resource in the title or in the description? (Default: Description)');

const commands = [
    
    (new SlashCommandBuilder().setName('post').setDescription('Post an embed').addChannelOption(channel).addStringOption(title).addStringOption(message).addAttachmentOption(attachment).addRoleOption(pickrole).addStringOption(colour).addNumberOption(delay).addBooleanOption(linkintitle)).toJSON(),
    (new SlashCommandBuilder().setName('ping')).setDescription('Brighten your day!').toJSON()

]

const rest = new REST({version: '10'}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);