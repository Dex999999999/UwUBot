import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import smashSchema from '../../models/smash-schema';
import axios from "axios";

const username = 'MDZH231'
const key = 'nGtb7EGLXq3xAG6Y2VYNYCLwfTWDeYR0VsPWJYQ3'

// const username = 'Dex999999999'
// const key = 'HweiPosMkFdwlcXLLaVEMgd5z3zqPevM7ZBvGp2K'

export default {
    
    category: 'Smash',
    description: 'Link your discord id to your challonge nickname (case-sensitive)',

    slash: false,
    testOnly: false,

    callback: async ({ message, args }) => {
        
        if(args.length == 0){
            return 'you need to say the nickname you want to link to'
        } else{
            var test = await smashSchema.findOne( { challongeNick: args[0] } )
            if(test == null){
                message.reply("that user doesn't exist (remember it's case-sensitive)")
            }else{
            if(test.discNick == message.member?.displayName!){
            } else{
            await smashSchema.findOneAndUpdate( { challongeNick: args[0] }, { $set: { discordID: message.author.id, discNick: message.member?.displayName!}}).exec
            }
            const embed = new MessageEmbed()
            .setDescription("Challonge Nickname: " + test.challongeNick + '\n Discord Nickname: ' + message.member?.displayName! + '\n Discord ID: ' + message.author.id)
            .setThumbnail(message.author.avatarURL()!)
            .setColor('ORANGE')
            .setAuthor(message.member?.displayName!)
            
            message.reply({embeds: [embed]})
            }
        }
        
    }
} as ICommand
