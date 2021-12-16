import { MessageEmbed, TextChannel, User } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

const emojiList = ['◀', '▶'],
	timeout = 120000;

const key = '3df74618-3702-4e96-a681-36ecf0cf047c'
//data.featured.entries[0].name

export default {
    category: 'Random',
    description: 'Fortnite stats',

    slash: false,
    testOnly: true,
    

    callback: async ({message, args, client, channel}) => {
        await axios.get('https://fortnite-api.com/v2/shop/br/combined')
            .then(async (res) => {
                let page = 0;
                const pages: any = [];
                console.log(res.data.data.featured.entries[0].newDisplayAsset.materialInstances[0].images)
                //console.log(DumpObjectIndented(res.data.data.featured.entries, ""))

                    // for (let i = 0; i < pagesNum; i++) {
                    //     const embed = new MessageEmbed()
                    //         .setTitle(res.data.data.featured.entries[0].bundle.name)
                    //         .setColor('PURPLE')
                    //         .setImage(res.data.data.featured.entries[0].bundle.image)
                    //         .setTimestamp()
                    //     pages.push(embed);
                    // }
                
                const embed = new MessageEmbed()
                    .setTitle(res.data.data.featured.entries[0].bundle.name)
                    .setColor('PURPLE')
                    .setImage(res.data.data.featured.entries[0].newDisplayAsset.materialInstances[0].images.Background)
                    .setTimestamp()
                pages.push(embed)

                
                const curPage = await channel.send({ embeds: [pages[page]] });

	            // react to embed with all emojis
	            for (const emoji of emojiList) {
		        await curPage.react(emoji);
	            }

	            // create reactionCollector to update page in embed
	            const filter = (reaction: any, user: any) => emojiList.includes(reaction.emoji.name) && !user.bot;
	            const reactionCollector = await curPage.createReactionCollector({ filter, time: timeout });

                // find out what emoji was reacted on to update pages
                reactionCollector.on('collect', (reaction, user) => {
        
            if (!user.bot && channel.guild.me!.permissions.has('MANAGE_MESSAGES')) reaction.users.remove(user.id);
                switch (reaction.emoji.name) {
                case emojiList[0]:
                    page = page > 0 ? --page : 0;
                    break;
                case emojiList[1]:
                    page = page + 1 < pages.length ? ++page : (pages.length - 1);
                    break;
                default:
                    break;
                }
                curPage.edit({ embeds: [pages[page]] });
            });

	// when timer runs out remove all reactions to show end of pageinator
	reactionCollector.on('end', () => curPage.reactions.removeAll());
	return curPage;

            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }, 
} as ICommand
function DumpObjectIndented(obj: any, indent: any)
{
  var result = "";
  if (indent == null) indent = "";

  for (var property in obj)
  {
    var value = obj[property];
    if (typeof value == 'string')
      value = "'" + value + "'";
    else if (typeof value == 'object')
    {
      if (value instanceof Array)
      {
        // Just let JS convert the Array to a string!
        value = "[ " + value + " ]";
      }
      else
      {
        // Recursive dump
        // (replace "  " by "\t" or something else if you prefer)
        var od = DumpObjectIndented(value, indent + "  ");
        // If you like { on the same line as the key
        //value = "{\n" + od + "\n" + indent + "}";
        // If you prefer { and } to be aligned
        value = "\n" + indent + "{\n" + od + "\n" + indent + "}";
      }
    }
    result += indent + "'" + property + "' : " + value + ",\n";
  }
  return result.replace(/,\n$/, "");
}