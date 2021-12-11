import { ICommand } from "wokcommands";
import { DISTUBE } from "../../index"

export default {
    category: 'Music',
    description: 'Skips the current song',
    name: 'skip',
    aliases: ['s', 'next'],

    slash: false,
    testOnly: false,
    

    callback: async ({client, message, args}) => {
        if(!message.member!.voice.channel) return message.reply('you need to be in a vc bozo')
        const queue = DISTUBE.getQueue(message)
        if (!queue){ 
            return message.channel.send(`there's no songs in the queue 😕`)
        } else if (queue.songs.length === 1){
            DISTUBE.stop(message)
        } else{
        
        DISTUBE.skip(message)
        message.channel.send("Skipped Song")
        }
        
    }, 
} as ICommand