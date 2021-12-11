import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";
const fs = require('fs');


export default {
    
    category: 'Random',
    description: 'Gets minecraft stats for a player',
    aliases: ['mc'],

    slash: false,
    testOnly: true,

    callback: async ({ message, args }) => {
        if(args.length < 1) return "you need to specify a player's name"

        const player = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`)
        const skin = await axios.get(`https://minecraft-api.com/api/skins/${args[0]}/body/10.5/10/json`)
        
        //Note base64ToImage function returns imageInfo which is an object with imageType and fileName.
        //var imageInfo = base64ToImage(base64Str,path,optionalObj)
        //console.log(imageInfo)
        let buff = new Buffer(skin.data.skin, 'base64');
        await fs.writeFileSync('image/mchead.png', buff);


        const embed = new MessageEmbed()
            .setTitle(player.data.name)
            .setThumbnail('attachment://mchead.png')
            .setFooter('UUID: ' + player.data.id)
            .setColor('PURPLE')

        message.reply({
            files: [{ attachment: 'image/mchead.png', name: 'mchead.png' }],
            embeds:  [embed],
        })

        // await axios.get('https://minecraft-api.com/api/uuid/45GD')
        //     .then((res) => {
        //         console.log('RES:', res.data)
                    
                
        //     })
        //     .catch((err) => {
        //         console.error('ERR:', err)
        //     })
    }
} as ICommand