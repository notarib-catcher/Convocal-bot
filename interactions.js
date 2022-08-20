const Discord = require('discord.js')
const Quote = require('inspirational-quotes');


/**
 * @param {Discord.BaseInteraction} interaction - the incoming interaction
 */

const ping = async (interaction) => {

    let { createdAt } = interaction
    let date = new Date().getTime();
    let diff = date - createdAt.getTime();
    let quote = Quote.getQuote();
    await interaction.reply(`> ***"${quote.text}"***\n> - ${quote.author} \n\n*(took ${Math.abs(diff)}ms)*`);
    
}

/**
 * @param {Discord.BaseInteraction} interaction - the incoming interaction
 */

const post = async (interaction) => {
    let { options } = interaction;

    let title = options.getString('title', true);
    let message = options.getString('message', true);
    let colour = options.getString('colour',false);

    let role = options.getRole('mention',false);

    let delay = options.getNumber('delay',false)

    let channel = options.getChannel('channel', true);

    let linkintitle = options.getBoolean('linkintitle',false);

    let attachment = options.getAttachment('file', false);
    let url = attachment?.url;

    let embed = new Discord.EmbedBuilder().setTitle(title).setTimestamp(new Date().getTime()).setColor(colour).setFooter({text:'The Manipal Convocal'});

    if(!linkintitle && url){
        embed.setDescription(`${message}\n\nLink to resource [here.](${url})`);
    }
    else{
        embed.setURL(url).setDescription(message);
    }

    let msgobject = {}
    msgobject['embeds'] = [embed]
    if(role){
       msgobject['content'] = `<@&${role.id}>` ;
    }

    if(!delay){
        await channel.send(msgobject).then(interaction.reply({content: 'Success!', ephemeral:true}));
    }
    else{
        setTimeout(() => {channel.send(msgobject)},delay*1000);
        await interaction.reply({content: 'Queued!', ephemeral:true})
    }

}



const interactionHandlers = {
    "ping"          : ping,
    "post"          : post,
}

module.exports = { interactionHandlers }