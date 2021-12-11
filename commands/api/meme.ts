import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Gives a meme',

    slash: false,
    testOnly: true,

    callback: async ({ message }) => {
        var subReddit = message.content.slice(6)
        await axios.get('https://meme-api.herokuapp.com/gimme/' + subReddit)
            .then((res) => {
                console.log('RES:', res.data)
                const embed = new MessageEmbed()
                    .setTitle(res.data.title)
                    .setDescription(res.data.subreddit)
                    .setColor('#FF5700')
                    .setImage(res.data.url)
                    .setFooter(res.data.author)
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