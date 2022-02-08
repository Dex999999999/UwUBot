import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Deletes many messages at once',
    aliases: ['clear'],

    slash: 'both',
    testOnly: false,

    permissions: ['MANAGE_MESSAGES'],

    maxArgs: 1,
    expectedArgs: '[amount]',
    

    callback: async ({ message, interaction, args, channel }) => {
        const amount = args.length ? parseInt(args.shift()!) : 5

        if(message){
            await message.delete()
        }

        const { size } = await channel.bulkDelete(amount, true)

        const reply = `deleted ${size} message(s)`

        if(interaction){
            return {
                custom: true,
                content: reply,
                ephemeral: true
            }
        }
    }, 
} as ICommand