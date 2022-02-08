import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import { RIDDLE } from '../../riddledata';

export default {
    
    category: 'Random',
    description: 'Fetches a riddle',

    slash: false,
    testOnly: false,

    callback: async ({ message }) => {
        const randomRiddle = RIDDLE[Math.floor(Math.random() * RIDDLE.length)];
                const embed = new MessageEmbed()
                    .setTitle('Ponder This: ')
                    .setDescription(randomRiddle.question)
                    .setColor('PURPLE')
                const newMessage = await message.reply({
                    embeds:  [embed]
                })
                await new Promise(resolve => setTimeout(resolve, 5000))
                embed.addField('**Answer**', '||' + randomRiddle.answer + '||')
                newMessage.edit({
                    embeds:  [embed]
                })
    }
} as ICommand
