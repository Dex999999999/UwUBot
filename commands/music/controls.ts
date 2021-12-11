import { ICommand } from "wokcommands"
import { DISTUBE } from "../../index"
var _i = 0
export default {
    category: 'Music',
    description: 'Shows the playing song',
    name: 'controls',
    aliases: ['control'],

    slash: false,
    testOnly: false,
    

    callback: async ({client, message, args}) => {
        if(!message.member!.voice.channel) return message.reply('you need to be in a vc bozo')
        
        const botMessage = await message.channel.send(`Controls:`)
        await botMessage.react('⏮️')
        await botMessage.react('⏸️')
        await botMessage.react('▶️')
        await botMessage.react('⏹️')
        await botMessage.react('⏭️')
        await botMessage.react('🔁')

    client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message:', error);
            return;
        }
    }
    if(user.bot) return
    if(reaction.emoji.name === '▶️'){
        if(_i === 1) {DISTUBE.resume(message); _i = 0}
        else{}
    }
    if(reaction.emoji.name === '⏸️'){
        if(_i === 0){
        DISTUBE.pause(message); _i = 1
    } else{}
    }
    if(reaction.emoji.name === '⏮️'){
        var queue = DISTUBE.getQueue(message)
        if (!queue) {message.channel.send(`there's no songs in the queue 😕`)}
        else{
        try {
            queue!.previous()
        } catch (e) {
            message.channel.send(`${e}`)
        }
        }
    }
    if(reaction.emoji.name === '⏭️'){
        var queue = DISTUBE.getQueue(message)
        if (!queue){ 
            message.channel.send(`there's no songs in the queue 😕`)
        } else if (queue.songs.length === 1){
            DISTUBE.stop(message)
        } else{
        DISTUBE.skip(message)
        }
    }
    if(reaction.emoji.name === '⏹️'){
        await DISTUBE.stop(message)
        botMessage.reactions.removeAll()
        .catch(error => console.error('Failed to clear reactions:', error));
    }
    if(reaction.emoji.name === '🔁'){
        const mode = DISTUBE.setRepeatMode(message)
		message.channel.send(`Set repeat mode to \`${mode ? mode === 2 ? 'All Queue' : 'This Song' : 'Off'}\``)
    }

    const userReactions = botMessage.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));

    try {
		await reaction.users.remove(message.author.id);
    } catch (error) {
	console.error('Failed to remove reactions.');
    }
    
    });
    }, 
} as ICommand