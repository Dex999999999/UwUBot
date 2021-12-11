import { Client, TextChannel } from "discord.js";

const deleteData = {} as {

    //guild id: channel it was sent in, deleted message

    [key: string]: [TextChannel, string]

}

export default (client: Client) => {

    client.on('messageDelete', async message =>{
        if (message){
        if (message.content){
        if(!message.content!.includes('<@')) return
 var channel = (message.channel) as TextChannel
 var author = '<@' + message.author!.id + '>'
 var content = message.content
 
        
 
        if(channel) channel.send({content: 'Deleted Message by ' + author + '\n "' + content + '"', "allowedMentions": { "users" : []}})
            }}
        })
}

export const config = {

    displayName: 'Retrieve Deleted Message',

    dbName: 'DELETED_MESSAGES',

}
