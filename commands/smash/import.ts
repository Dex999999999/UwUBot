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
    description: 'Import csv from braacket',

    slash: false,
    testOnly: false,

    callback: async ({ message, args }) => {
        const filter = (m: { author: { id: string; }; }) => m.author.id === message.author.id;
        await message.channel.send('csv rankings to import?')
        message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
			.then(async collected => {
                const collect = collected.first()!
                const rankings = csvToArray( collect.content, "," )
                console.log(rankings)
                console.log(rankings.length)
                //message.channel.send();
                for (var _i = 0; _i < rankings.length; _i++) {
                    let exists = await smashSchema.findOne( { challongeNick: rankings[_i].Player.slice(1,-1) } )
                    if(exists == null){
                        message.channel.send(rankings[_i].Player+" doesnt exist" )
                    } else {
                        //make theif(exists.heroes == null){

                        //} else{
                        smashSchema.findOneAndUpdate( { challongeNick: rankings[_i].Player.slice(1,-1) } , 
                            { heroes: rankings[_i].Characters.slice(1,-1) },
                            function (error: any, success: any) {
                                if (error) {
                                    message.channel.send("failed to add characters")
                                    console.log(error);
                                } else {
                                    if(rankings[_i] != null){
                                    if(rankings[_i].Player != null){
                                    message.channel.send("added the characters for " + rankings[_i].Player.slice(1,-1))}}
                                    console.log('success' + success);
                                }
                            }
                            )
                        //}
                    }
                }
				message.channel.send(`Rankings and Mains Added!`);
			})
			.catch(collected => {
				message.channel.send('please give the rankings you want to import');
			});
        
    }
} as ICommand

function csvToArray(str: any, delimiter = ",") {

    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row: any) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object: any, header: any, index: any) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  }