import { ICommand } from "wokcommands";
import mongoose from 'mongoose'
import leaderSchema from '../models/leader-schema'

export default {
    
    category: 'Random',
    description: 'Cookie Currency Add',
    aliases: ['c'],

    slash: false,
    testOnly: false,

    callback: async ({ message }) => {
        var filter = { userID: message.author.id }
        if(message.content.includes('new')){
            let doc = await leaderSchema.findOne( filter ).exec()
            if(doc != null){
                return 'You have an account already.'
            }
            else{
            await new leaderSchema({
                userID: message.author.id,
                nickname: message.member?.displayName,
                pfp: message.author.avatarURL()!,
                cookies: '1', 
            }).save()
            console.log('NEW DOC!!!','name: ' + message.member?.displayName, 'authorID: ' + message.author.id, 'cookies: 1');
            return "Congrats on opening an account! You now have 1 cookie 🍪 " + "<@" + message.author.id + ">"
            }
        } else{
        if(message.content.includes("help")){
            return 'run !cookie to gain cookies, can can also mention someone to get their cookie count\n when using the give command format like this !give {amount} {mention}'
        }
        //if there is a mention in the message
        if(message.content.includes("<@")){
            //get the userID of the mentioned person
            var filter = { userID: message.content.slice(11, -1) }
            var num = 0
            console.log(filter)
            let doc = await leaderSchema.findOne( filter ).exec()
            if(doc != null){
                return ("<@" + message.content.slice(11, -1) + "> has " + doc.cookies + " cookies 🍪 ")

            } else { return 'mentioned user doesnt have a cookie account'}
        }
        else{
            let doc = await leaderSchema.findOne( filter ).exec()
            if(doc != null){
            const update = { cookies: (doc.cookies + 1) }
            let doc2 = await leaderSchema.findOneAndUpdate({ filter, cookies: (doc.cookies + 1) })
            console.log('name: ' + message.member?.displayName, 'authorID: ' + message.author.id, update);
            return ("You have " + (doc.cookies + 1) + " cookies 🍪 " + "<@" + message.author.id + ">")
            }
            else{
                return "You dont have a cookie account or yours wasn't found. Create a one with !cookie new"
            }
        }
        
    //cookie new
    }
    }
} as ICommand