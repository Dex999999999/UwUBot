import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import { DISTUBE } from "../../index"
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Fetches lyrics to playing song',
    aliases: ['lyric', 'l'],

    slash: false,
    testOnly: false,

    callback: async ({ message, args }) => {
        const queue = DISTUBE.getQueue(message)
        if(!queue) return 'there is no queue right now'
        if(args.length > 0){
            var search = args.join(' ')
        } else{var search = queue?.songs[0].name!}
        
        
        
        await axios.get('https://some-random-api.ml/lyrics?title=' + search)
            .then(async (res) => {
                
                console.log('Searched for: ' + search)
                console.log(res.data.lyrics)
                var length = res.data.lyrics.length
                if (length > 4095) { 
                    var lyrics = res.data.lyrics.slice(0, 4095 - length); 
                    var lyrics2 = res.data.lyrics.slice(4095); 
                } else {var lyrics = res.data.lyrics; var lyrics2: any =  ''}
                if(res.data.error == "Sorry I couldn't find that song's lyrics"){ return "couldn't find the song's lyrics" }
                
                const embed = new MessageEmbed()
                    .setTitle(res.data.title + ' By: ' + res.data.author)
                    .setDescription(lyrics)
                    .setColor('DEFAULT')
                    .setThumbnail(res.data.thumbnail.genius)
                    .setFooter(message.member?.displayName!, message.author.avatarURL()!)
                if(length > 4095){
                    embed.setFooter('')
                }
                message.channel.send({
                        embeds:  [embed]
                })
                if(lyrics2.length > 0){
                var embed2 = new MessageEmbed()
                    .setDescription(lyrics2)
                    .setColor('DEFAULT')
                    .setFooter(message.member?.displayName!, message.author.avatarURL()!)
                message.channel.send({
                    embeds:  [embed2]
                    })
                }
               
               
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }
} as ICommand
