import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Summarizes a given source',

    slash: false,
    testOnly: true,
    cooldown: '10s',
    aliases: ['summarize'],

    callback: async ({ message }) => {
        if(message.content.includes('summarize')){var cmdLength = 11}
        else{var cmdLength = 6}
        if(!message.content.includes(' https://')){ return 'please give a link' }

        let config = {
            params: {
                'SM_API_KEY': '7BF6ACFFC5',
                'SM_URL': message.content.slice(cmdLength)
            },
            header_params : {"Expect":"100-continue"}
          }

        await axios.get('https://api.smmry.com', config)
            .then((res) => {
                if(res.data.sm_api_message == 'THE PAGE IS IN AN UNRECOGNISABLE FORMAT'){'page does not have enough text'}
                console.log(res.data)
                const embed = new MessageEmbed()
                    .setTitle(res.data.sm_api_title)
                    .setDescription(res.data.sm_api_content)
                    .setColor('PURPLE')
                    .setFooter(message.member?.displayName! + ' - Reduced by: ' + res.data.sm_api_content_reduced, message.author.avatarURL()!)
                message.reply({
                    embeds:  [embed]
                })
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }
} as ICommand
