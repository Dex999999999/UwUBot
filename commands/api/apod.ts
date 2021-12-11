import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Fetches the astronomy picture of the day',

    slash: false,
    testOnly: true,

    callback: async ({ message }) => {

        await axios.get('https://api.nasa.gov/planetary/apod?api_key=oLggWom5vSDG4pnacHs9pDhwS8mk4I1eyMO5TI1n')
            .then((res) => {
                console.log('RES:', res.data)
                const embed = new MessageEmbed()
                    .setTitle(res.data.title)
                    .setImage(res.data.hdurl)
                    .setDescription(res.data.explanation)
                    .setFooter(res.data.date)
                    .setColor('PURPLE')
                    //.setFooter(message.member?.displayName!)
                message.reply({
                    embeds:  [embed]
                })
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }
} as ICommand
