import { ICommand } from "wokcommands"
import { DISTUBE } from "../../index"

export default {
    category: 'Music',
    description: 'Shuffles the queue',
    name: 'shuffle',
    aliases: ['mix'],

    slash: false,
    testOnly: false,
    

    callback: async ({client, message, args}) => {
        if(!message.member!.voice.channel) return message.reply('you need to be in a vc bozo')
        
        const queue = DISTUBE.getQueue(message)
		if (!queue) {message.channel.send("there's no songs in the queue 😕")}
        else{await DISTUBE.shuffle(message); return 'shuffled!'}
    }, 
} as ICommand