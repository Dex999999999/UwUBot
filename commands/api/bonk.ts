// import { MessageEmbed } from "discord.js";
// import { ICommand } from "wokcommands";
// import axios from "axios";

// export default {
    
//     category: 'Random',
//     description: 'Bonks',

//     slash: false,
//     testOnly: true,

//     callback: async ({ message, args }) => {
//         let config = {
//             params: {
//                 'template_id': '309868304',
//                 'username': 'uwuowo3',
//                 'password': 'sussussus',
//                 'text0': args[0],
//                 'text1': args[0],
//               }
//           }

//         await axios.get('https://api.imgflip.com/get_memes', config)
//             .then((res) => {
//                 console.log('RES:', res.data[0].joke)
//                 const embed = new MessageEmbed()
//                     .setTitle('funny haha:')
//                     .setDescription(res.data[0].joke)
//                     .setColor('PURPLE')
//                     //.setFooter(message.member?.displayName!)
//                 message.reply({
//                     embeds:  [embed]
//                 })
//             })
//             .catch((err) => {
//                 console.error('ERR:', err)
//             })
//     }
// } as ICommand
