import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Random',
    description: 'Shows information about the server',

    slash: false,
    testOnly: false,
    

    callback: async ({message, client, guild}) => {
        if (message.channel.type == 'DM') return "you cant use this command in a dm"
        let owner = await message.guild!.fetchOwner()
            const ServerInfoEmbed = new MessageEmbed()
                .setColor('PURPLE')
                .setTitle("Server Info")
                .setImage(message.guild!.iconURL({dynamic: true})!)
                .setDescription(`About **${message.guild!.name}**`)
                .addField("**Owner**", `Server Owned by **<@${owner}>**`)
                .addField("**Date Created**", `Server Created on **${message.guild!.createdAt.toLocaleString()}**`)
                .addField("**Region**", `${message.guild!.preferredLocale}`)
                .addField("**Member Count**", "This Server Has ` " + `${message.guild!.memberCount}` + " ` **Members**")
                .addField("**Emoji Count**", "This Server Has ` " + `${message.guild!.emojis.cache.size}` + " ` **Emojis**")
                .addField("**Roles Count**", "This Server Has ` " + `${message.guild!.roles.cache.size}` + " ` **Roles**")
                .addField("**Channels Count**", "This Server Has ` " + `${message.guild!.channels.cache.size}` + " ` **Channels**")
            message.channel.send({ embeds: [ServerInfoEmbed], allowedMentions: { users: []}})
    }, 
} as ICommand