//problems: not updating and adding the ids, make it so you cant add the same id twice
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
    description: 'Loads in Participant Challonge IDs and nicknames in database so we have the right IDs',
    aliases:['current', 'load'],

    slash: false,
    testOnly: false,

    callback: async ({ message, args }) => {
        const embed = new MessageEmbed()
                    .setColor('ORANGE')
                    
        await axios.get(`https://${username}:${key}@api.challonge.com/v1/tournaments.json`)
            .then(async (t_res) => {
                
                let doc = await smashSchema.findOne( { discNick: 'current tourney' } ).exec()
                //if the data for the tourney doesnt exist
                if(doc == null){
                    //make the data
                    await new smashSchema({
                        challongeID: {"id": '0' },
                        challongeNick: 'current tourney',
                        discNick: 'current tourney',
                        discordID: '-1', 
                    }).save()
                    message.channel.send("the current tournament data point was made")
                
                } else{
                    //if there is a tournament number given to set to 
                    if(args.length > 0){
                        //make sure it really is a valid number
                        const id = parseInt(args[0])
                        if (isNaN(id) || id < 0) { message.channel.send(`enter an actual number to set it to!`) } 
                        else{var tourneyid = t_res.data[id].tournament.id}
                        //if there is a tournament in progress make sure they want to change it
                        if(parseInt(doc.discordId) > -1){
                            message.channel.send(`are you sure you want to change the current tournament from ${t_res.data[doc.discordId].tournament.name} to ${t_res.data[id].tournament.name} y/n`)
                            const filter = (message: { content: string }) => message.content !== "24#hi";
                            message.channel.awaitMessages({ filter, max: 2, time: 20_000, errors: ['max'] })
                                .then(async (collected) => {
                                const collect = collected.last()!
                                if (collect.content.toLowerCase() === 'y'){
                                //leave this blank so it skips to the updating
                                } else {
                                message.channel.send('canceled?')
                                return 
                                }
                        })
                        }
                        console.log('Changing current tournament')
                        //update the current tourney info
                        //basically I have this one data point that holds the current tourney and its index number and id instead of player stuff
                        //set challonge id to the actual challonge long number id so I can pull it easier in the future
                        await smashSchema.findOneAndUpdate( { discNick: 'current tourney' }, { challongeID: [tourneyid] } ).exec()
                        await smashSchema.findOneAndUpdate( { discNick: 'current tourney' }, { discordID: id } ).exec()
                        console.log('updated the current tournament')
                        embed.setTitle(`Current tournament: ${t_res.data[id].tournament.name}`)

                        console.log('adding participant ids and nicknames')
                        await axios.get(`https://${username}:${key}@api.challonge.com/v1/tournaments/${tourneyid}/participants.json`)
                        .then(async (p_res) => {
                            //do this for every player
                            for (var _i = 0; _i < p_res.data.length; _i++) {
                                //find if there is an existing one with their nickname and add the id to an array else make one and give it the id
                                //ifvar filter = { challongeNick: p_res.data[_i].participant.name }
                                let exists = await smashSchema.findOne( { challongeNick: p_res.data[_i].participant.name } )
                                if(exists == null){
                                    //make the data
                                    await new smashSchema({
                                    // challongeID: {"id": p_res.data[_i].participant.id },
                                    challongeID: [p_res.data[_i].participant.id],
                                    challongeNick: p_res.data[_i].participant.name,
                                    discNick: '0',
                                    discordID: '0', 
                                    }).save()
                                    message.channel.send("made the data point for " + p_res.data[_i].participant.name)
                                } else{
                                smashSchema.findOneAndUpdate( { challongeNick: p_res.data[_i].participant.name } , 
                                    { $addToSet: {challongeID: [p_res.data[_i].participant.id] } },
                                    // { $push: {challongeID: {"id": p_res.data[_i].participant.id } } },
                                    function (error: any, success: any) {
                                        if (error) {
                                            message.channel.send("failed to add id")
                                            console.log(error);
                                        } else {
                                            if(p_res.data[_i] != null){
                                            message.channel.send("added the id for " + p_res.data[_i].participant.name)}
                                            console.log('success' + success);
                                        }
                                    }
                                    )
                                
                                }

                                embed.addField(_i + '. challonge nickname: ' + p_res.data[_i].participant.name, 'ID added: ' + p_res.data[_i].participant.id)
                            }
                            //after the updating is done tell the person who ran the command
                            embed.setDescription('Updated the tournament and added everyones current ids')
                            message.channel.send( {embeds:  [embed]} )
                        })
                        .catch((err) => {
                            console.error('ERR:', err)
                        })

                    //if the bot isnt told to set it to something
                    //show if there is a current tournament or not and how to set one
                    } else{
                        //if the tourney was manually ended
                        if(doc.discordID == -1){message.channel.send("There aren't any tournaments going on right now\n To set one as current run this command with the id of the current tournament\n Example: !current 1")}
                        else{
                            //print the ongoing tournament
                            message.channel.send(`The current tournament is ${t_res.data[doc.discordID].tournament.name}\n To set a different one as current run this command with the id of the current tournament\n Example: !current 1`)
                        }
                    }
                }

            })
            .catch((err) => {
                console.error('ERR:', err)
            })
            
        
    }
} as ICommand
