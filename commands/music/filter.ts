import { ICommand } from "wokcommands";
import { DISTUBE } from "../../index"

export default {
    category: 'Music',
    description: 'Adds a filter to the music',
    name: 'filter',
    aliases: ['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave'],

    slash: false,
    testOnly: false,
    

    callback: async ({client, message, args}) => {
        if(!message.member!.voice.channel) return message.reply('you need to be in a vc bozo')
        const queue = DISTUBE.getQueue(message)
		if (!queue){ return "there's no songs in the queue 😕"}
		if (args[0] === "off" && queue!.filters?.length) queue!.setFilter(false)
		else if (Object.keys(DISTUBE.filters).includes(args[0])){
        const filter = DISTUBE.setFilter(message, message.content.slice(1))
		message.channel.send(`Current Queue Filter: \`${queue.filters.join(", ") || "Off"}\``)
		} else if (args[0]){ message.channel.send(`thats not a valid filter`); return }
        
    }, 
} as ICommand