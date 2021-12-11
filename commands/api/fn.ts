import { MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

const key = '3df74618-3702-4e96-a681-36ecf0cf047c'
//data.featured.entries[0].name

export default {
    category: 'Random',
    description: 'Fortnite stats',

    slash: false,
    testOnly: true,
    

    callback: async ({message, args, client}) => {
        await axios.get('https://fortnite-api.com/v2/shop/br/combined')
            .then(async (res) => {
                const embed = new MessageEmbed()
                    .setTitle(res.data.data.featured.entries[0].bundle.name)
                    .setColor('PURPLE')
                    .setImage(res.data.data.featured.entries[0].bundle.image)
                    .setTimestamp()

                const shop = await message.reply({
                    embeds:  [embed]
                })
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }, 
} as ICommand