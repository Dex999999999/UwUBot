import { Client, TextChannel, MessageEmbed, MessageAttachment} from "discord.js";
import { ICommand } from "wokcommands";
import DIG from "discord-image-generation";

export default {
        category: 'Random',
        description: '**ross**',
        aliases: ['ross'],

        slash: false,
        testOnly: false,
    

        callback: async ({message, args}) => {
        const person = message.mentions.members?.first() || message.guild?.members.cache.get(args[0]) || message.member
        if(person == null) return 'something broke, try again'
        let avatar = person.displayAvatarURL({ size: 1024 , format: 'png' })
        let img = await new DIG.Bobross().getImage(avatar);
        

        let attach = new MessageAttachment(img, "ross.png");
        
        message.channel.send({
            files: [attach]
        })
    }  
} as ICommand