import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Shows information on a colour',
    aliases: ['colour', 'hex', 'rgb'],

    slash: false,
    testOnly: false,

    callback: async ({ message, args }) => {
        if(args.length < 1) return 'you need to input a hex or rgb code'
     	if(args.length == 1 || args.length == 2){
            var query = 'hex'
        if(args[0].includes('#')) {var colour = args[0].slice(1)
        } else {var colour = args[0]}
        } else {var query = 'rgb'
        	var combine = args[0].replace(/[^a-zA-Z]/g, "") + ',' + args[1].replace(/[^a-zA-Z]/g, "") + ',' + args[2].replace(/[^a-zA-Z]/g, "")
            var colour = `rgb(`+combine+`)`
        }
        console.log(colour, query)
        
        await axios.get(`https://www.thecolorapi.com/id?${query}=${colour}`)
            .then((res) => {
                const embed = new MessageEmbed()
                    .setTitle(res.data.name.value)
                    .setColor(res.data.hex.value)
                    .setImage(`https://singlecolorimage.com/get/${res.data.hex.clean}/175x175`)
                    .addField('Hex:', res.data.hex.value)
                    .addField('HSL:', res.data.hsl.value, true)
                    .addField('RGB:', res.data.rgb.value)
                    .addField('HSV:', res.data.hsv.value, true)
                message.reply({
                    embeds:  [embed]
                })
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }
} as ICommand