import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Random',
    description: 'Gets info on an emoji',

    slash: false,
    testOnly: true,
    

    callback: ({message, args, client}) => {
        if(args.length > 0) {
            var emojiId = args[0].split(':')
            var emoji = emojiId[2]
            var id = emoji.slice(0,-1)
            const emojiEmbed = new MessageEmbed()
                .setColor('PURPLE')
                //.setTitle(emoji!.name!)
                .setImage('https://cdn.discordapp.com/emojis/' + id + '.png')
                .setDescription(`Link: ` + 'https://cdn.discordapp.com/emojis/' + id + '.png')
            message.channel.send({ embeds: [emojiEmbed]})
        }
        else{message.reply('you need to give an emoji')}
            
    }, 
} as ICommand