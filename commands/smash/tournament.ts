import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import smashSchema from '../../models/smash-schema';
import axios from "axios";

const username = 'MDZH231'
const key = 'nGtb7EGLXq3xAG6Y2VYNYCLwfTWDeYR0VsPWJYQ3'

// const username = 'Dex999999999'
// const key = 'HweiPosMkFdwlcXLLaVEMgd5z3zqPevM7ZBvGp2K'

export default {
    
    category: 'Smash',
    description: 'Fetches smash tournaments',
    aliases: ['tournaments', 'tourneys', 'tourney'],

    slash: false,
    testOnly: false,

    callback: async ({ message, args }) => {
        await axios.get(`https://${username}:${key}@api.challonge.com/v1/tournaments.json`)
            .then(async (res) => {
                    const embed = new MessageEmbed()
                    .setTitle('Tournaments: ')
                    .setColor('ORANGE')
                    //.setFooter(message.member?.displayName!)
                    //add matches!!! mb numbers reaction
                    for (var _i = 0; _i < res.data.length; _i++) {
                        embed.addField(res.data[_i].tournament.name, 'Simple ID: ' + _i)
                    }
                    message.reply({
                        embeds:  [embed]
                    })
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
            
        
    }
} as ICommand
