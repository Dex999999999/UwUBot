import { Client, TextChannel, MessageEmbed, MessageAttachment} from "discord.js";
import welcomeSchema from "../models/welcome-schema";

const welcomeData = {} as {
    //guild id: channel to send in, message
    [key: string]: [TextChannel, string]
}

export default (client: Client) => {
    client.on('guildMemberAdd', async member =>{
        const { guild, id } = member
        
        let data = welcomeData[guild.id]
        let link = `https://some-random-api.ml/welcome/img/1/stars?key=mfE0lwciP2se8WTcBL7Jbe6yB&username=${member.displayName}&discriminator=${member.user.discriminator}&avatar=${member.user.displayAvatarURL({ format: 'png' })}&type=join&guildName=${guild.name}&textcolor=red&memberCount=${guild.memberCount}`

        if(!data){
            
            const results = await welcomeSchema.findById(guild.id)
            if(!results){
                return
            }
            
            const { channelId, text} = results
            const channel = guild.channels.cache.get(channelId) as TextChannel
            data = welcomeData[guild.id] = [channel, text]
        }

        const embed = new MessageEmbed()
        .setImage(link.replace(/ /g, `%20`))
        
        data[0].send({
            content: data[1].replace(/@/g, `<@${id}>`),
            embeds: [embed], 
            //files: attachment
        })
    })
}

export const config = {
    displayName: 'Welcome Channel',
    dbName: 'WELCOME_CHANNEL',
}