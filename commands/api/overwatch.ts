import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Gets the overwatch stats of a user, you can also add best and endorsements for other data',
    aliases: ['ow'],

    slash: false,
    testOnly: true,

    callback: async ({ message, args }) => {
        console.log(args)
        if(args.length < 2){return 'please provide the platform and battle tag of the player (you can also look for heroes) (platforms: pc, xbl, psn, nintendo-switch)'}
        var battletag = args[1].replace(/#/g, '-');

        

        await axios.get('https://ow-api.com/v1/stats/' + args[0] + '/us/' + battletag + '/profile')
            .then(async (res) => {
                var prestige = parseInt(res.data.prestige)
                if(res.data.private != true){
                var won = '\n Games Won: ' + res.data.quickPlayStats.games.won
                var played = '\n Games Played: ' + res.data.quickPlayStats.games.played
                } else{
                var won = ''
                var played = ''
                }
                const embed = new MessageEmbed()
                    .setAuthor(args[1] + "'s Stats", res.data.levelIcon)
                    .setDescription('Level: ' + res.data.level + '\n Pristige: ' + prestige + won + played)
                    .setThumbnail(res.data.icon)
                    .setColor('#f99e1a')
                    //.setFooter(message.member?.displayName!)
                if(res.data.private != true){
                    embed.addFields(
                        { name: 'Gold Medals: ', value: res.data.quickPlayStats.awards.medalsGold.toString(), inline: true },
                        { name: 'Silver Medals:', value: res.data.quickPlayStats.awards.medalsSilver.toString(), inline: true },
                        { name: 'Bronze Medals:', value: res.data.quickPlayStats.awards.medalsBronze.toString(), inline: true }
                    )}else{
                    embed.addField('Your profile is private', 'Blizzard does this automatically, for me to get all your stats you need to make it public. See the gif below')
                    embed.setImage("https://media.giphy.com/media/UuebprKAqlhRuI9M5z/giphy.gif")  
                }
                await axios.get('https://owapi.io/profile/' + args[0] + '/us/' + battletag)
                    .then((res) => {
                        if(res.data.private != true){
                        if(res.data.playtime.competitive == undefined){var ptimecomp = 0} else {var ptimecomp: number = res.data.playtime.competitive}
                        embed.addFields(
                        { name: 'Sportsmanship: ', value: 'Recieved: ' + res.data.endorsement.sportsmanship.rate.toString() + ' times', inline: true },
                        { name: 'Shot Caller:', value: 'Recieved: ' + res.data.endorsement.shotcaller.rate.toString() + ' times', inline: true },
                        { name: 'Good Teammate:', value: 'Recieved: ' + res.data.endorsement.teammate.rate.toString() + ' times', inline: true },
                        { name: 'Time Played', value: 'Quickplay: ' + res.data.playtime.quickplay + '\nCompetitive: ' +  ptimecomp},
                        )}
                        message.reply({
                            embeds:  [embed]
                        }, ) 
                    })
                
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
        
    }
} as ICommand
