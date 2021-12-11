// import { MessageEmbed } from "discord.js";
// import { ICommand } from "wokcommands";
// import axios from "axios";
// import mongoose from 'mongoose'
// import mineSchema from '../mine-schema'

// export default {
    
//     category: 'Random',
//     description: 'Play Minesweeper',

//     slash: false,
//     testOnly: true,

//     callback: async ({ message }) => {
//         let doc = await mineSchema.findOne( { userID: message.author.id } ).exec()
//         if (doc == null){
//             await axios.post('https://minesweeper-api.herokuapp.com/games', {difficulty: 0})
//               .then(async (res) => {
//                 await new mineSchema({
//                     userID: message.author.id,
//                     gameID: res.data.id
//                 }).save()
//                 console.log('RES:', res.data)
//                 const embed = new MessageEmbed()
//                     .setDescription(res.data.board[0]+res.data.board[1]+res.data.board[2]+res.data.board[3]+res.data.board[4]+res.data.board[5]+res.data.board[6]+res.data.board[7])
//                     .setColor('PURPLE')
//                 message.reply({
//                     embeds:  [embed]
//                 })
//             })
//             .catch((err) => {
//                 console.error('ERR:', err)
//             })
//         } else {
//             await axios.get('https://minesweeper-api.herokuapp.com/games/' + doc.gameID)
//                 .then((res) => {
//                     console.log(res.data)
//                     const embed = new MessageEmbed()
//                     .setTitle('Partcipants: ')
//                     .setColor('ORANGE')
//                     //.setFooter(message.member?.displayName!)
//                     for (var _i = 0; _i < res.data.board.length; _i++) {
//                         embed.addField(
//                             'part' + _i.toString(), 
//                             res.data.board[_i]
//                         )
//                     }
                

//                 message.reply({
//                     embeds:  [embed]
//                 })
//                 })
//             console.log(doc.gameID)
//         }
//     }
// } as ICommand
