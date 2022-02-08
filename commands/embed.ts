import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    
    category: 'Random',
    description: 'Sends an embed',

    slash: false,
    testOnly: false,

    //permissions: ['ADMINISTRATOR'],

    callback: async ({ message, text }) => {
        const embed = new MessageEmbed()
            .setDescription("Hi there :)")
            .setTitle("Title")
            .setThumbnail(message.author.avatarURL()!)
            .setColor('RED')
            .setAuthor(message.member?.displayName! || '')
            .setFooter('Stinky Foot(er)')
            .addFields([
                {
                name: 'name',
                value: 'value'
            }, 
            {
                name: 'name 2',
                value: 'value 2'
            },
        ])
        .addField('name 3', 'value 3')

        const newMessage = await message.reply({
            embeds:  [embed]
        })

        //await new Promise(resolve => setTimeout(resolve, 1000))
        
        const newEmbed = newMessage.embeds[0]
        
        newEmbed.setColor('ORANGE')
        newMessage.edit({
            embeds: [newEmbed],
        })
         
        newEmbed.setColor('YELLOW')
        newMessage.edit({
            embeds: [newEmbed],
        })
                
        newEmbed.setColor('GREEN')
        newMessage.edit({
            embeds: [newEmbed],
        })
                   
        newEmbed.setColor('BLUE')
        newMessage.edit({
            embeds: [newEmbed],
        })
                        
        newEmbed.setColor('PURPLE')
        newMessage.edit({
            embeds: [newEmbed],
        })
                            

        
    }
} as ICommand
