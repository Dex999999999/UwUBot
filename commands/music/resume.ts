import { ICommand } from "wokcommands";
import { DISTUBE } from "../../index"

export default {
    category: 'Music',
    description: 'Resumes the song',
    name: 'resume',
    aliases: ['r', 'continue'],

    slash: false,
    testOnly: false,
    

    callback: async ({client, message, args}) => {
        if(!message.member!.voice.channel) return message.reply('you need to be in a vc bozo')
        
        DISTUBE.resume(message)
        
    }, 
} as ICommand