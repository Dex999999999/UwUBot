import { MessageEmbed, TextChannel, Collection } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";


export default {
    category: 'Random',
    description: 'Fetch',

    slash: false,
    testOnly: true,
    

    callback: async ({message, args, client}) => {
        const channel = client.channels.cache.get(args[0]) as TextChannel

        fetchMore(channel!, 1000).then(async Collection => {
            console.log(`Received ${Collection.size} messages`)

            var msgs = new Array
            var embs = new Array

            Collection.forEach((message: any) => {
                
                var embedtxt = ''
                var fieldstxt = ''
                
                if(message.embeds.length != undefined)
                {for (let embed of message.embeds) { // these are some of the properties
				embedtxt = `Title: ${embed.title}\nAuthor: ${embed.author}\nDescription: ${embed.description}`
                    if(embed != undefined)
                {
						for (let field of embed.fields) {
    						fieldstxt = fieldstxt + '\n' + `Field title: ${field.name}\n Field value: ${field.value}`
                        }
                }
                embs.push(embed)
  }}
                
                msgs.push(message.createdAt + ' ' + message.author.username + ' > \n{' + message.content + '}\nMentions: '+ message.mentions?.members?.first()?.displayName+'\n Embeds: ' + embedtxt + fieldstxt)
                embs.push('')
            })
            msgs.reverse()
            embs.reverse()
            const logthread = await message.startThread({

	name: channel!.name,

	autoArchiveDuration: 60,

	reason: 'Message Log From Request',

})
            msgs.forEach(msg => {
                console.log(msg)
                console.log(msgs.indexOf(msg))
                let emb = embs[msgs.indexOf(msg)]
                
                if(emb != ''){
                logthread.send({content: msg, embeds: [emb]})
                } else {logthread.send(msg)}

            })
            message.channel.send('Done')
          })
          .catch(console.error)
    }, 
} as ICommand

async function fetchMore(channel: TextChannel, limit = 250) {
    if (!channel) {
      throw new Error(`Expected channel, got ${typeof channel}.`);
    }
    if (limit <= 100) {
      return channel.messages.fetch({ limit });
    }
  
    let collection: any = new Collection();
    let lastId = null;
    let options = {};
    let remaining = limit;
    let check 
  
    while (remaining > 0) {
      
      if (lastId) {
        check = remaining > 100 ? 100 : remaining;
        if(check < 1) check = 1

        remaining = remaining > 100 ? remaining - 100 : 0;
        options = {limit: check, before: lastId}
      } else {
        check = remaining > 100 ? 100 : remaining;
        if(check < 1) check = 1
        remaining = remaining > 100 ? remaining - 100 : 0;
        options = {limit: check}
      }
  
      let messages = await channel.messages.fetch(options);
      console.log('fetched!')
  
      if (!messages.last()) {
          console.log('no more messages to fetch')
        break;
      }
  
      collection = collection.concat(messages);
      lastId = messages.last()!.id;
    }
  
    return collection;
  }