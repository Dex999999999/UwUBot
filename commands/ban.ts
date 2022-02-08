import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Bans the mentioned user',
    requireRoles: true,

    slash: 'both',
    testOnly: false,
    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({message, args, interaction}) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if(!target) {
            return 'please mention someone to bam'
        }

        if(!target.bannable) {
            return {
                custom: true,
                content: "you don't have permission to ban that user",
                ephemeral: true,
            }
        }

        args.shift()
        const reason = args.join(' ')
        target.ban({
            reason, 
            days: 7
        })

        return `banned <@${target.id}>`
    }, 
} as ICommand
//on message delete check if includes <@ then message.channel.send('ghost ping by @ message:')