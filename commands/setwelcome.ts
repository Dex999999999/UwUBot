import { ICommand } from "wokcommands";
import DJS from 'discord.js'
import welcomeSchema from "../models/welcome-schema";

export default {
    category: 'Configuration',
    description: 'Sets welcome channel',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',

    slash: 'both',
    testOnly: true,

    options: [
        {
            name: 'channel',
            description: 'The channel to send welcome messages in',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        },
        {
            name: 'text',
            description: 'The welcome message',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],

    callback: async({ guild, message, interaction , args, client, member }) => {
        if(!guild){
            return "you can't use this command in a dm"
        }
        const target = message ? message.mentions.channels.first() : interaction.options.getChannel('channel')

        if(!target || target.type !== 'GUILD_TEXT') {
            return 'you need to input a text channel'
        }

        let text = interaction?.options.getString('text')

        if(message){
            args.shift()
            text = args.join(' ')
        }

        await welcomeSchema.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild,
            text,
            channelId: target.id
        }, {
            upsert: true
        })

        //client.emit('guildMemberAdd', member) ?

        return 'set the welcome channel'
    }
} as ICommand