// import { MessageActionRow, MessageButton } from 'discord.js'
// import { ICommand } from "wokcommands"

// export default {
//     category: 'Random',
//     description: 'Plays a tic-tac-toe game',

//     slash: true,
//     testOnly: true,
    

//     callback: async ({interaction}) => {
//     let xTurn = true

//     let tttGame = [
//         ['⬛', '⬛', '⬛'],
//         ['⬛', '⬛', '⬛'],
//         ['⬛', '⬛', '⬛'],
//     ]

//     const defaulttttGame = [
//         ['⬛', '⬛', '⬛'],
//         ['⬛', '⬛', '⬛'],
//         ['⬛', '⬛', '⬛'],
//     ]
            
//     if (interaction.isMessageComponent()) {
//         console.log(interaction.message.content);
//         if (interaction.message.content.match(/(X|O) wins!/)) {
//             interaction.update(`Game Over! ${xTurn ? "X's Turn" : "O's Turn"} wins!`);
//             tttGame = defaulttttGame;
//             return;
//         }

//         if (xTurn) {
//             let splitID = interaction.customId.split(',');
//             if (tttGame[parseInt(splitID[0])][parseInt(splitID[1])] === '⬛') {
//                 tttGame[parseInt(splitID[0])][parseInt(splitID[1])] = '❌';
//                 xTurn = false;
//             }
//         } else {
//             let splitID = interaction.customId.split(',');
//             if (tttGame[parseInt(splitID[0])][parseInt(splitID[1])] === '⬛') {
//                 tttGame[parseInt(splitID[0])][parseInt(splitID[1])] = '⭕';
//                 xTurn = true;
//             }
//         }
//         const row1 = new MessageActionRow().addComponents([
//             new MessageButton().setCustomId('0,0').setEmoji(tttGame[0][0]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('0,1').setEmoji(tttGame[0][1]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('0,2').setEmoji(tttGame[0][2]).setStyle('PRIMARY'),
//         ]);

//         const row2 = new MessageActionRow().addComponents([
//             new MessageButton().setCustomId('1,0').setEmoji(tttGame[1][0]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('1,1').setEmoji(tttGame[1][1]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('1,2').setEmoji(tttGame[1][2]).setStyle('PRIMARY'),
//         ]);

//         const row3 = new MessageActionRow().addComponents([
//             new MessageButton().setCustomId('2,0').setEmoji(tttGame[2][0]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('2,1').setEmoji(tttGame[2][1]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('2,2').setEmoji(tttGame[2][2]).setStyle('PRIMARY'),
//         ]);

//         // win check
//         if (tttGame[0][0] === '❌' && tttGame[0][1] === '❌' && tttGame[0][2] === '❌') {
//             // ﹉
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[1][0] === '❌' && tttGame[1][1] === '❌' && tttGame[1][2] === '❌') {
//             // -
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[2][0] === '❌' && tttGame[2][1] === '❌' && tttGame[2][2] === '❌') {
//             // _
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[0][0] === '❌' && tttGame[1][0] === '❌' && tttGame[2][0] === '❌') {
//             // |..
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[0][1] === '❌' && tttGame[1][1] === '❌' && tttGame[2][1] === '❌') {
//             // .|.
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[0][2] === '❌' && tttGame[1][2] === '❌' && tttGame[2][2] === '❌') {
//             // ..|
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[2][0] === '❌' && tttGame[1][1] === '❌' && tttGame[0][2] === '❌') {
//             // /
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[0][0] === '❌' && tttGame[1][1] === '❌' && tttGame[2][2] === '❌') {
//             // \
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[0][0] === '⭕' && tttGame[0][1] === '⭕' && tttGame[0][2] === '⭕') {
//             // ﹉
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[1][0] === '⭕' && tttGame[1][1] === '⭕' && tttGame[1][2] === '⭕') {
//             // -
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[2][0] === '⭕' && tttGame[2][1] === '⭕' && tttGame[2][2] === '⭕') {
//             // _
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[0][0] === '⭕' && tttGame[1][0] === '⭕' && tttGame[2][0] === '⭕') {
//             // |..
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[0][1] === '⭕' && tttGame[1][1] === '⭕' && tttGame[2][1] === '⭕') {
//             // .|.
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[0][2] === '⭕' && tttGame[1][2] === '⭕' && tttGame[2][2] === '⭕') {
//             // ..|
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[2][0] === '⭕' && tttGame[1][1] === '⭕' && tttGame[0][2] === '⭕') {
//             // /
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else if (tttGame[0][0] === '⭕' && tttGame[1][1] === '⭕' && tttGame[2][2] === '⭕') {
//             // \
//             tttGame = defaulttttGame;
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         } else {
//             await interaction.update({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//         }
//     } else {
//         const row1 = new MessageActionRow().addComponents([
//             new MessageButton().setCustomId('0,0').setEmoji(tttGame[0][0]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('0,1').setEmoji(tttGame[0][1]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('0,2').setEmoji(tttGame[0][2]).setStyle('PRIMARY'),
//         ]);

//         const row2 = new MessageActionRow().addComponents([
//             new MessageButton().setCustomId('1,0').setEmoji(tttGame[1][0]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('1,1').setEmoji(tttGame[1][1]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('1,2').setEmoji(tttGame[1][2]).setStyle('PRIMARY'),
//         ]);

//         const row3 = new MessageActionRow().addComponents([
//             new MessageButton().setCustomId('2,0').setEmoji(tttGame[2][0]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('2,1').setEmoji(tttGame[2][1]).setStyle('PRIMARY'),
//             new MessageButton().setCustomId('2,2').setEmoji(tttGame[2][2]).setStyle('PRIMARY'),
//         ]);

//         interaction.reply({content: `${xTurn ? "X's Turn" : "O's Turn"}`, components: [row1, row2, row3] } )
//     }

//     }, 
// } as ICommand