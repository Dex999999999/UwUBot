import { DMChannel, PartialGroupDMChannel, TextChannel, ThreadChannel, User } from "discord.js";
import { ICommand } from "wokcommands";
import punishmentSchema from '../models/punishment-schema'

export default {
    category: 'Moderation',
    description: 'Mutes the mentioned user',
    permissions: ['ADMINISTRATOR'],
    requireRoles: true,

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ args, member: staff, guild, client, message, interaction }) => {
        if(!guild) {
            return 'you need to use this in a server'
        }
        
        let userId = args.shift()!
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
        
        
        try {
            const query = {
                guildId: guild.id,
                userId,
                type: 'mute',
            }
            const member = await guild.members.fetch(userId)
            if(member) { 
                const muteRole = guild.roles.cache.find(
                    role => role.name.toLowerCase() === 'muted'
                )
                if(!muteRole){
                    return `this server doesn't have a muted role`
                } else {
                if (muteRole.editable){
                if(!(member.roles.cache.some((role => role.name.toLowerCase() === 'muted')))){
                    return {
                        custom: true,
                        content: `<@${userId}> isn't muted`,
                        allowedMentions: { users: [] }
                    }
                }
                member.roles.remove(muteRole)
                } else {
                    return `I don't have permission to remove the mute role\nis it higher than me?`
                }
                }

                await punishmentSchema.deleteOne(query)
                
                try{member.send(`You have been unmuted in ${guild.name} 🔇`)
                } catch (e) {console.log(e)}

                return {
                    custom: true,
                    content: `<@${userId}> has been unmuted 🔈`,
                    allowedMentions: { users: [] }
                }
            }

            
        } catch (e) {console.log(e)}

    }, 
} as ICommand