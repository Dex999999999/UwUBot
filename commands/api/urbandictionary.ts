import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Fetches a definition from urban dictionary',

    slash: false,
    testOnly: false,
    aliases: ['ud'],

    callback: async ({ message, args }) => {
        let config = {
            params: {term: args[0]},
            headers: {
                'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com',
                'x-rapidapi-key': '401666ad98msh6b792b9d7df7aedp17e6acjsnb26225812c74'
              }
          }

        await axios.get('https://mashape-community-urban-dictionary.p.rapidapi.com/define', config)
            .then((res) => {
                var desc = ((res.data.list[0].definition + '\n \n Examples: \n' + res.data.list[0].example).replace(/]/g, ' ')).replace(/\[/g, ' ')
                
                const embed = new MessageEmbed()
                    .setTitle(res.data.list[0].word)
                    .setDescription(desc)
                    .setColor('YELLOW')
                    .setFooter('definition author: ' + res.data.list[0].author)
                message.reply({
                    embeds:  [embed]
                })
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }
} as ICommand
