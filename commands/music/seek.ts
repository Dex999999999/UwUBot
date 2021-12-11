import { ICommand } from "wokcommands";
import { DISTUBE } from "../../index"

export default {
    category: 'Music',
    description: 'Seeks song to the time specified',
    name: 'seek',
    aliases: ['go to'],

    slash: false,
    testOnly: false,
    

    callback: async ({client, message, args}) => {
        if(!message.member!.voice.channel) return message.reply('you need to be in a vc bozo')
        const queue = DISTUBE.getQueue(message)
        if (!queue) return message.channel.send(`there's no songs in the queue 😕`)
        if (!args[0]) return message.channel.send(`give a time to seek to (in seconds or split by colons)`)

        if(args[0].includes(':')){
           const convert = args[0].split(':')
           if(args.length = 3){var minutes = parseInt(convert[0])*60+parseInt(convert[1])} else{var minutes = parseInt(convert[0])}
           var time = Number(minutes*60 + parseInt(convert[args.length - 1]))
        } else {
        var time = Number(args[0])
        }
        
        if (isNaN(time)) return message.channel.send(`enter an actual number!`)
        queue.seek(time)
        message.channel.send(`Seeked to \`${time}\``)
    }, 
} as ICommand