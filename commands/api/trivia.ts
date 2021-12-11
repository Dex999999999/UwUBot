import { MessageEmbed, MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    
    category: 'Random',
    description: 'Gets a Trivia Question from Open Trivia DB',
    aliases: ['start', 'quiz', 'begin', 'catagories', 'categories'],

    slash: false,
    testOnly: false,

    callback: async ({ message, client, args }) => {
		if(message.content.toLowerCase().includes('categories')) {
            await axios.get('https://opentdb.com/api_category.php')
            .then((res) => {
                const embed = new MessageEmbed()
                    .setTitle('Categories')
                    .setColor('PURPLE')
                for (var _i = 0; _i < res.data.trivia_categories.length; _i++) {
                    var id = res.data.trivia_categories[_i].id
                    var name = res.data.trivia_categories[_i].name
                    embed.addField(name, 'Id: '+id)
                    
                }
                message.reply({
                    embeds:  [embed]
                })
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
        }
        message.channel.send(`Trivia`)
        
    }
} as ICommand

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function similarity(s1: any, s2: any) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1: any, s2: any) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }