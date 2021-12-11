import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Shows a picture of a cat',

    slash: false,
    testOnly: true,

    callback: async ({ message }) => {
        await axios.get('https://api.thecatapi.com/v1/images/search')
            .then((res) => {
                console.log('RES:', res.data[0].url)
                const embed = new MessageEmbed()
                    .setTitle('hewe is cat :)')
                    .setColor('PURPLE')
                    .setImage(res.data[0].url)
                    .setFooter(message.member?.displayName!)
                message.reply({
                    embeds:  [embed]
                })
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }
} as ICommand

// RES: {
//     breeds: [],
//     id: 'adk',
//     url: 'https://cdn2.thecatapi.com/images/adk.jpg',
//     width: 900,
//     height: 729
//   }