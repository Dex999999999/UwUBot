import { ICommand } from "wokcommands";
import { DISTUBE } from "../../index"

export default {
    category: 'Music',
    description: 'Stops the music',
    name: 'stop',
    aliases: ['leave', 'disconnect', 'bye', 'leave'],

    slash: false,
    testOnly: false,
    

    callback: async ({client, message, args}) => {
        if(!message.member!.voice.channel) return message.reply('you need to be in a vc bozo')
        
        await DISTUBE.stop(message)
        await message.channel.send("**Stopped Music**")
        
    }, 
} as ICommand