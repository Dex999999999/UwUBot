import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sends a message',

    slash: 'both',
    testOnly: false,
    guildOnly: true,

    //permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    

    callback: ({message, interaction, args}) => {
        const channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel')) as TextChannel
        if(!channel || channel.type !== 'GUILD_TEXT') {
            return 'please input a text channel'
        }

        //remove channel from the array
        args.shift()
        const text = args.join (' ')
        
        channel.send(text)

        if(interaction){
            interaction.reply({
                content: 'sent message!',
                ephemeral: true
            })
        }
    }, 
} as ICommand