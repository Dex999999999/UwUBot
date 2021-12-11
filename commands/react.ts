import { ICommand } from "wokcommands";
import { MessageReaction, User } from "discord.js";

export default {
    category: 'Random',
    description: 'Reaction Testing',

    slash: false,
    testOnly: true,
    hidden: true,
    

    callback: ({message, client}) => {
        message.reply("pls react")
        message.react('🍕')
        
        const filter = (reaction: MessageReaction, user: User) => { return user.id === message.author.id }
        const collector = message.createReactionCollector({ 
        filter, 
        max: 1, 
        time: 1000 * 5 
        })
        
        collector.on('collect', (reaction) => { 
            console.log(reaction.emoji)
        })
        
        collector.on('end', (collected) => {
        
        if(collected.size === 0) {
            message.reply('you didnt react')
            return 
        }
        
        let txt = 'collected:\n\n'
        collected.forEach((message) => {
        txt += message.emoji.name
        })
		message.reply(txt)
        })
        
        
      
    }, 
} as ICommand