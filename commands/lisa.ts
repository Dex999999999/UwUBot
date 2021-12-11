import { Client, TextChannel, MessageEmbed, MessageAttachment} from "discord.js";
import { ICommand } from "wokcommands";
import DIG from "discord-image-generation";

export default {
        category: 'Random',
        description: '**lisa**',
        aliases: ['present', 'presentation'],

        slash: false,
        testOnly: true,
    

        callback: async ({message, args}) => {
        if(args.length < 1) return 'you need to input text!'
        let img = await new DIG.LisaPresentation().getImage(`${args.join(' ').substring(0,300)}`);

        let attach = new MessageAttachment(img, "presentation.png");
        
        message.channel.send({
            files: [attach]
        })
    }  
} as ICommand