import { Client, TextChannel } from "discord.js";

export default (client: Client) => {
    
client.on('messageCreate', async (message) => {
if (message.content.toLowerCase() === 'ping') {
        message.channel.send('pong')
    } else if (message.content.toLowerCase() === 'uwu') {
        if(message.author.id != '529447848438398986'){
            message.channel.send('owo')
            } else {message.channel.send("you're so weird <@529447848438398986>")}
    } else if (message.content.toLowerCase() === 'nuke'){
        message.channel.send('kaboooooooooooooooooooooooooooooooooooooooooooooom')
        message.channel.send('https://images-ext-2.discordapp.net/external/15xt6pC04tDay-mSvA5CWcBEOUtpB1tfjdUApFKJ3SQ/https/c.tenor.com/Ms3zVqn7qcUAAAAM/nuke-press-the-button.gif')
    }  else if (message.content.toLowerCase() === 'sus'){

        message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.\n.　　　 　　.　　　　　。　　 。　. 　\n.　　 。　　　• . 　　 • 　　　　• \n　ﾟ　　 Red was not An Impostor.　 ඞ。　. \n　　'　　　 1 Impostor remains 　 　　\n 。　　ﾟ　　　.　　　. 　　　　.　 .\n . 　　　。　　　　•　 　ﾟ　　。 　　.`)
    }
})
}

export const config = {
    displayName: 'Prefix-less Commands',
    dbName: 'PREFIXLESS',
}