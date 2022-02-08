import { Client, TextChannel, MessageEmbed, MessageAttachment} from "discord.js";
import { ICommand } from "wokcommands";
import DIG from "discord-image-generation";

export default {
        category: 'Random',
        description: '**TRIGGERED**',

        slash: false,
        testOnly: false,
    

        callback: async ({message, client, user, args}) => {
        const person = message.mentions.members?.first() || message.guild?.members.cache.get(args[0]) || message.member
        if(person == null) return 'something broke, try again'
        let avatar = person.displayAvatarURL({ size: 1024 , format: 'png' })

        let img = await new DIG.Triggered().getImage(avatar);

        let attach = new MessageAttachment(img, "triggered.gif");
        
        message.channel.send({
            files: [attach]
        })
    }  
} as ICommand