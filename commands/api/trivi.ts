import { MessageEmbed, MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Gets a Trivia Question from Random Trivia Generator',

    slash: false,
    testOnly: true,

    callback: async ({ message, client, args }) => {
        
        var rndInt = randomIntFromInterval(1, 100)
        var rndApi = randomIntFromInterval(1, 2)
        if(rndApi === 1)var rndId = 'gn13LW'
        else if(rndApi === 2)var rndId = '8HhZuB'
        else var rndId = '8HhZuB'
        if(args.length > 0){
            if (args[0].toUpperCase().match(/^(HISTORY|GEOGRAPHY|ENTERTAINMENT|SCIENCE|ARTS|GENERAL)$/)) {
                var cat = '?Catagory='+args[0].toUpperCase()
                var end = `${cat}`
            } else{
                return 'invalid catagory'
            }
            } else {
                var cat = ''
                var end = `${rndInt}`
            }

        console.log(`https://retoolapi.dev/${rndId}/trivia${rndApi}/${end}`)
        await axios.get(`https://retoolapi.dev/${rndId}/trivia${rndApi}/${end}`)
            .then(async (res) => {
                if(args.length > 0){
                if(res.data[0].Catagory == "ENTERTAINMENT") var cataimg = 'https://i.ibb.co/9rg1vRS/msedge-I5fn7-Pbjw-B-removebg-preview.png'
                else if(res.data[0].Catagory == "GEOGRAPHY") var cataimg = 'https://i.ibb.co/D7ZLnNc/msedge-YYr-PIzfwp-B-removebg-preview.png'
                else if(res.data[0].Catagory == "HISTORY") var cataimg = 'https://i.ibb.co/7JkB74R/msedge-XNWtq-Mj-QSZ-removebg-preview.png'
                else if(res.data[0].Catagory == "SCIENCE") var cataimg = 'https://i.ibb.co/k8qcgPc/msedge-0-Ygrkytvi-G-removebg-preview-2.png'
                else if(res.data[0].Catagory == "ARTS") var cataimg = 'https://i.ibb.co/WGRFNjF/msedge-0-Ygrkytvi-G-removebg-preview-3.png'
                else var cataimg = 'https://i.ibb.co/JqF9Gvm/msedge-0-Ygrkytvi-G-removebg-preview-1.png'
                } else {
                if(res.data.Catagory == "ENTERTAINMENT") var cataimg = 'https://i.ibb.co/9rg1vRS/msedge-I5fn7-Pbjw-B-removebg-preview.png'
                else if(res.data.Catagory == "GEOGRAPHY") var cataimg = 'https://i.ibb.co/D7ZLnNc/msedge-YYr-PIzfwp-B-removebg-preview.png'
                else if(res.data.Catagory == "HISTORY") var cataimg = 'https://i.ibb.co/7JkB74R/msedge-XNWtq-Mj-QSZ-removebg-preview.png'
                else if(res.data.Catagory == "SCIENCE") var cataimg = 'https://i.ibb.co/k8qcgPc/msedge-0-Ygrkytvi-G-removebg-preview-2.png'
                else if(res.data.Catagory == "ARTS") var cataimg = 'https://i.ibb.co/WGRFNjF/msedge-0-Ygrkytvi-G-removebg-preview-3.png'
                else var cataimg = 'https://i.ibb.co/JqF9Gvm/msedge-0-Ygrkytvi-G-removebg-preview-1.png'
                }
                

                console.log('RES:', res.data[0])
                if(args.length > 0){
                var embed = new MessageEmbed()
                    .setTitle(res.data[0].Question)
                    .setFooter(res.data[0].Catagory, cataimg)
                    .setColor('PURPLE')
                } else {
                    var embed = new MessageEmbed()
                    .setTitle(res.data.Question)
                    .setFooter(res.data.Catagory, cataimg)
                    .setColor('PURPLE')
                }
                const newMessage = await message.reply({
                    embeds:  [embed]
                })
                newMessage.react('🤷')
        
                // const filter = (reaction: MessageReaction, user: User) => { return user.id === message.author.id }
                // const collector = message.createReactionCollector({ 
                // filter, 
                // max: 1, 
                // time: 1000 * 30
                // })
                
                // collector.on('collect', (reaction) => { 
                //     console.log(reaction.emoji)
                // })
                
                // collector.on('end', (collected) => {
                //     embed.addField('**Answer**', '||' + res.data.Answer + '||')
                //     newMessage.edit({
                //         embeds:  [embed]
                //     })
                // })
                
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
                    if(reaction.emoji.name === '🤷'){

                        if(embed.fields.length === 0 ){
                        if(args.length > 0){
                        embed.addField('**Answer**', '||' + res.data[0].Answer + '||')
                        } else{
                            embed.addField('**Answer**', '||' + res.data.Answer + '||')
                        }
                        newMessage.edit({
                            embeds:  [embed]
                        })
                        } else {}
                    } else {
                            await new Promise(resolve => setTimeout(resolve, 5000))
                            if(args.length > 0){
                                embed.addField('**Answer**', '||' + res.data[0].Answer + '||')
                                } else{
                                    embed.addField('**Answer**', '||' + res.data.Answer + '||')
                                }
                            newMessage.edit({
                            embeds:  [embed]
                        })
                        }
                    
                });
                    
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }
} as ICommand

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  