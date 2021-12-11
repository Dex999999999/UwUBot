import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks the mentioned user',
    requireRoles: true,

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({message, args, interaction}) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if(!target) {
            return 'please mention someone to kick'
        }

        if(!target.kickable) {
            return {
                custom: true,
                content: "you don't have permission to kick that user",
                ephemeral: true,
            }
        }

        args.shift()
        const reason = args.join(' ')
        target.kick(reason)

        return `kicked <@${target.id}>`
    }, 
} as ICommand