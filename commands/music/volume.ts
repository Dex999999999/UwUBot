import { ICommand } from "wokcommands";
import { DISTUBE } from "../../index"

export default {
    category: 'Music',
    description: 'Changes the volume',
    name: 'volume',
    aliases: ['v'],

    slash: false,
    testOnly: false,
    

    callback: async ({client, message, args}) => {
        
        if(!message.member!.voice.channel) return 'you need to be in a vc bozo'
        const queue = DISTUBE.getQueue(message)
        if (!queue) return `there's no songs in the queue 😕`
        if (args.length < 1) return `${queue.volume}`
        const volume = parseInt(args[0])
        if (isNaN(volume)) {
        if(args[0].toLowerCase() == 'up'||args[0].toLowerCase() == 'increase'){
            console.log(queue.volume)
            queue.setVolume(queue.volume + 10)
            message.channel.send(`Volume set to \`${queue.volume}\``)
        } else if(args[0].toLowerCase() == 'down'||args[0].toLowerCase() == 'decrease'){
            queue.setVolume(queue.volume - 10)
            message.channel.send(`Volume set to \`${queue.volume}\``)
        } else {
            return `enter an actual number!`
            }
        } else{
        queue.setVolume(volume)
        message.channel.send(`Volume set to \`${volume}\``)
        }
    }, 
} as ICommand