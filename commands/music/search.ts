//add click button to automatically play
import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import { DISTUBE } from "../../index"

export default {
    category: 'Music',
    description: 'Searches for a song',
    name: 'search',
    aliases: ['find'],

    slash: false,
    testOnly: false,
    

    callback: async ({client, message, args}) => {
        if(!message.member!.voice.channel) return message.reply('you need to be in a vc bozo')
        
        let music = args.join(' ')
        if(!music){ return "you need to search for something buddy" }

        let results = await DISTUBE.search(music, { limit: 10, type: 'video' })
        let i = 1
        let embed = new MessageEmbed()
        .setTitle('Results:')
        
        for (const result of results) {
            embed.addFields({
                name: i + '. ' + result.name + ' - `' + result.formattedDuration + '`', 
                value: `${result.url}`})
            i++
          }
        message.reply({embeds: [embed]})

        const filter = (message: { content: string }) => message.content !== "1hi@3/"
        await message.channel.awaitMessages({ filter, max: 2, time: 20_000, errors: ['max'] })
            .then((collected) => {
                const collect = parseInt(collected.last()!.toString())
                if (isNaN(collect)) return message.channel.send(`enter an actual number!`)
                DISTUBE.play(message, results[collect - 1].url)
                return
                })
            .catch();
        
    }, 
} as ICommand