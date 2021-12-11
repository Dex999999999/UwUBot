import { Client, TextChannel } from "discord.js";
import welcomeSchema from "../models/welcome-schema";

const leaveData = {} as {
    //guild id: channel to send in, message
    [key: string]: [TextChannel, string]
}

export default (client: Client) => {
    client.on('guildMemberRemove', async member =>{
        const { guild, id } = member
        
        let data = leaveData[guild.id]
        
        if(!data){
            const results = await welcomeSchema.findById(guild.id)
            if(!results){
                return
            }
            
            const { LchannelId, Ltext} = results
            const Lchannel = guild.channels.cache.get(LchannelId) as TextChannel
            data = leaveData[guild.id] = [Lchannel, Ltext]
        }
        
        data[0].send({
            content: data[1].replace(/@/g, `<@${id}>`)
        })
    })
}

export const config = {
    displayName: 'Leave Channel',
    dbName: 'LEAVE_CHANNEL',
}