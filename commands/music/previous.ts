import { ICommand } from "wokcommands";
import { DISTUBE } from "../../index"

export default {
    category: 'Music',
    description: 'Goes back a song',
    name: 'previous',
    aliases: ['back'],

    slash: false,
    testOnly: false,
    

    callback: async ({client, message, args}) => {
        if(!message.member!.voice.channel) return message.reply('you need to be in a vc bozo')
        
        const queue = DISTUBE.getQueue(message)
        if (!queue) return message.channel.send(`there's no songs in the queue 😕`)
        try {
            queue.previous()
        } catch (e) {
            message.channel.send(`${e}`)
        }
        
    }, 
} as ICommand