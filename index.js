const {guildId, clientId, token} = require('./config.json')

const Discord = require('discord.js');

const interactions = require('./interactions.js');
const { interactionHandlers } = interactions;

const clientIntents = new Discord.IntentsBitField();
const Client = new Discord.Client({intents: clientIntents});




const onReady = () => {

    Client.user.setPresence({
        status: "online",
        activities: [{
            name: "you grow",
            type: Discord.ActivityType.Watching
        }]
    });

    console.log('Ready!');
};



let interactionHandler = async (interaction) => {
    
    let { commandName } = interaction;

    console.log(`[${new Date().getTime()}] INTFROM: ${interaction.user.id}`);

    interactionHandlers[commandName](interaction).catch((error) => {
        interaction.reply({content:"Error while processing command.",ephemeral:true}).catch(error_ => {
            console.log(`[${new Date().getTime()}] ERR:\n`);
            console.error(error_)
        });
        console.log(`[${new Date().getTime()}] ERR:\n`);
        console.error(error)
    });

};

Client.on('ready',onReady);
Client.on('interactionCreate', async interaction => {
    interactionHandler(interaction).catch((error) => {
        interaction.reply({content:"Error while processing command.",ephemeral:true}).catch(error_ => {
            console.log(`[${new Date().getTime()}] ERR:\n`);
            console.error(error_)
        });
        console.log(`[${new Date().getTime()}] ERR:\n`);
        console.error(error)
    });
});



Client.login(token);