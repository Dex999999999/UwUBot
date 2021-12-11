import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Fetches a random joke',

    slash: false,
    testOnly: true,

    callback: async ({ message }) => {
        let config = {
            headers: {
                'x-rapidapi-host': 'jokes-by-api-ninjas.p.rapidapi.com',
                'x-rapidapi-key': '401666ad98msh6b792b9d7df7aedp17e6acjsnb26225812c74'
              }
          }

        await axios.get('https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes', config)
            .then((res) => {
                console.log('RES:', res.data[0].joke)
                const embed = new MessageEmbed()
                    .setTitle('funny haha:')
                    .setDescription(res.data[0].joke)
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
