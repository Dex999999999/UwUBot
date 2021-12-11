import { ICommand } from "wokcommands";
import { MessageEmbed } from 'discord.js'
import mongoose from 'mongoose'
import leaderSchema from '../models/leader-schema'

export default {
    
    category: 'Random',
    description: 'Cookie Currency Check Balance',
    aliases: ['bal'],

    slash: false,
    testOnly: true,

    callback: async ({ message }) => {
        if(message.content.includes("help")){
            return "run !cookie to gain cookies, can can also mention someone to get their cookie count\n when using the give command format like this !give {amount} {mention}\n run !balance to check your or someone else's balance"
        }
        var filter = { userID: message.author.id }
        console.log(message.author.avatarURL()!)
        //if there is a mention in the message
        if(message.content.includes("<@")){
            //get the userID of the mentioned person
            if(message.content.includes("bal ")){var filter = { userID: message.content.slice(8, -1) }}
            else{var filter = { userID: message.content.slice(12, -1) }}
            var num = 0
            console.log(filter)
            let doc = await leaderSchema.findOne( filter ).exec()
            if(doc != null){
                const embed = new MessageEmbed()
            .setTitle(doc.nickname + "'s Balance")
            .setColor('YELLOW')
            .setDescription("Cookies: " + doc.cookies + " 🍪")
            .setThumbnail(doc.pfp)
                return embed

            } else { return 'mentioned user doesnt have a cookie account'}
        }
        else{
        let doc = await leaderSchema.findOne( filter ).exec()
            if(doc != null){
                const embed = new MessageEmbed()
            .setTitle(doc.nickname + "'s Balance")
            .setColor('RED')
            .setDescription("Cookies: " + doc.cookies + " 🍪")
            .setThumbnail(message.author.avatarURL()!)
                console.log(message.author.avatarURL()!)
                return embed
        }
        else{
            return "You dont have a cookie account or yours wasn't found. Create a one with !cookie new"
        }
        }
    
    }
} as ICommand