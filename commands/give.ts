//fix breaking it by not using number or doing a2
import DiscordJS, { Intents } from 'discord.js'
import { ICommand } from "wokcommands";
import leaderSchema from '../models/leader-schema'

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
  })

export default {
    
    category: 'Random',
    description: 'Give Another User a Cookie',

    slash: false,
    testOnly: true,

    callback: async ({ message, args }) => {
        //if there is a mention in the message
        if(message.content.includes("<@")){
            //get the userID of the mentioned person
            const mentionid = args[0].slice(2, -1)
            //return "<@" + mentionid + ">"
            const filter2 = { userID: message.author.id }
            const filter3 = { userID: mentionid }
            //check that they aren't trying to give cookies to themself
            if(message.author.id == mentionid){ return "you can't give cookies to yourself!"}
            
            //ask them how many cookies they want to give
            const filter = (message: { content: string }) => message.content !== "-^/3hi";
            message.channel.send('How many cookies would you like to give?')
            await message.channel.awaitMessages({ filter, max: 2, time: 10_000, errors: ['max'] })
            .then(async (collected) => {
                const collect = collected.last()!
                var letterCheck = /^[a-zA-Z]+$/
                if(message.content.match(letterCheck)){
                    message.channel.send('you need a number')
                } else{
                var amount = parseInt(collect.content)
                console.log(amount)
                if(isNaN(amount)){var amount = 1}
                if(amount < 0){ message.channel.send("you can't give a negative number! that would be stealing 🙄"); return}
                let docGiver = await leaderSchema.findOne( filter2 ).exec()
                //make sure the giver has an account
                if(docGiver != null){
                if(docGiver.cookies < amount){ 
                    message.channel.send("you're too poor to give that many cookies")
                } else{
                let docReciever = await leaderSchema.findOne( filter3 ).exec()
                //make sure the reciever has an account
                if(docReciever != null){
                //update the givers account
                await leaderSchema.findOneAndUpdate({ filter2, cookies: (docGiver.cookies - amount) })
                console.log('name: ' + message.member?.displayName, 'userID: ' + message.author.id, 'gave a cookie', ' giverCookies: ' + (docGiver.cookies - amount) + ' reciever cookies: ' + (docReciever.cookies + amount));
                //update the recievers account
                await leaderSchema.findOneAndUpdate({ userID: mentionid }, { cookies: (docReciever.cookies + amount) })
                console.log(mentionid + ` (${docReciever.nickname}) got cookies`);
                message.channel.send("You gave " + amount + " cookies to " + "<@" + mentionid + "> 🍪")
                }
                else{
                //reciever doesn't have an account
                console.log(mentionid);
                message.channel.send('mentioned user doesnt have a cookie account')
                }
                }
                } else {
                //giver doesn't have an account
                message.channel.send("you dont have a cookie account 😕. make one with !cookie new")
            }
            //not number end bracket
                }
            })
            .catch();
            return
        }
        else{
            //there isn't a mention in the message
            return "no mentions in message"
        }
    }
} as ICommand