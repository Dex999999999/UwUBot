import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Gets a joke from the random api',
    aliases: ['rjoke'],

    slash: false,
    testOnly: true,

    callback: async ({ message }) => {
        await axios.get('https://some-random-api.ml/joke')
            .then((res) => {
                console.log('RES:', res.data)
                const embed = new MessageEmbed()
                    .setTitle('Random Joke')
                    .setColor('PURPLE')
                    .setDescription(res.data.joke)
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