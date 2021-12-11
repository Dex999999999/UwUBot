import { ICommand } from "wokcommands";
import DJS from 'discord.js'
import welcomeSchema from "../models/welcome-schema";

export default {
    category: 'Configuration',
    description: 'Sets leave channel',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',

    slash: 'both',
    testOnly: true,

    options: [
        {
            name: 'channel',
            description: 'The channel to send the left messages in',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        },
        {
            name: 'text',
            description: 'The leave message',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],

    callback: async({ guild, message, interaction , args }) => {
        if(!guild){
            return "you can't use this command in a dm"
        }
        const target = message ? message.mentions.channels.first() : interaction.options.getChannel('channel')

        if(!target || target.type !== 'GUILD_TEXT') {
            return 'you need to input a text channel'
        }

        let Ltext = interaction?.options.getString('text')

        if(message){
            args.shift()
            Ltext = args.join(' ')
        }

        await welcomeSchema.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild,
            Ltext,
            LchannelId: target.id
        }, {
            upsert: true
        })

        return 'set the leave channel'
    }
} as ICommand