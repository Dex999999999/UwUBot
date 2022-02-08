import { DMChannel, PartialGroupDMChannel, TextChannel, ThreadChannel, User } from "discord.js";
import { ICommand } from "wokcommands";
import punishmentSchema from '../models/punishment-schema'

export default {
    category: 'Moderation',
    description: 'Mutes the mentioned user',
    permissions: ['ADMINISTRATOR'],
    requireRoles: true,

    slash: 'both',
    testOnly: false,
    guildOnly: true,

    minArgs: 3,
    expectedArgs: '<user> <duration> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],

    callback: async ({ args, member: staff, guild, client, message, interaction }) => {
        if(!guild) {
            return 'you need to use this in a server'
        }
        
        let userId = args.shift()!
        const duration = args.shift()!
        const reason = args.join(' ')
        let user: User | undefined
        
        if(message){
            user = message.mentions.users?.first()
        } else {
            user = interaction.options.getUser('user') as User
        }
        
        if(!user){
            userId = userId.replace(/[<@!>]/g, ``)
            user = await client.users.fetch(userId)
            
            if(!user) {
                return `couldn't find the user with an id of "${userId}"`
            }
            
        }
        
        userId = user.id
        let time
        let type
        try {
            const split = duration.match(/\d+|\D+/g)
            time = parseInt(split![0])
            type = split![1].toLowerCase()
        } catch (e) {
            return 'invalid time format, examples: "5d" "2h" "4m" (d is days, h is hours, m is minutes)'
        }
        
        if (type === 'h') {
            time *= 60
        } else if (type === 'd') {
            time *= 60 * 24
        } else if (type !== 'm') {
            return 'please specify the amount of days hours or minutes like this: "5d" "2h" "4m"'
        }
        
        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + time)
        
        const result = await punishmentSchema.findOne({
            guildId: guild.id,
            userId,
            type: 'mute',
        })
        
        if(result) {
            return {
                custom: true,
                content: `<@${userId}> is already muted 🔇`,
                allowedMentions: { users: [] }
            }
        }
        
        try {
            const member = await guild.members.fetch(userId)
            if(member) { 
                const muteRole = guild.roles.cache.find((role) => role.name.toLowerCase() === 'muted') 
                if(!muteRole) {
                    try {
                        var newMuteRole = await guild.roles.create({
                                name: "muted",
                                color: "#514f48",
                                permissions: []
                        })
                        guild.channels.cache.forEach(async (channel) => {

                        if(channel instanceof TextChannel){
                            await channel.permissionOverwrites.edit(newMuteRole, { SEND_MESSAGES: false });
                        }})
                        
                        if (newMuteRole.editable){
                            member.roles.add(newMuteRole)
                            } else {
                                return `I don't have permission to add the mute role\nis it higher than me?`
                            }
                            
                    } catch (e) {
                        console.log(e);
                        return `something went wrong while creating a muted role`
                    }
                } else {
                if (muteRole.editable){
                member.roles.add(muteRole)
                } else {
                    return `I don't have permission to add the mute role\nis it higher than me?`
                }
                }
            }
            
        await new punishmentSchema({
            userId,
            guildId: guild.id,
            staffId: staff.id,
            reason,
            expires,
            type: 'mute',
        }).save()
        } catch (ignored) {
            return "can't mute that user"
        }

        try{
        message.member!.send(`You have been muted for ${duration} in ${guild.name} 🔇\nReason: ${reason}`)
        } catch (e) {console.log(e)}

        return {
                custom: true,
                content: `<@${userId}> has been muted for ${duration} 🔇\nReason: ${reason}`,
                allowedMentions: { users: [] }
            }
    }, 
} as ICommand