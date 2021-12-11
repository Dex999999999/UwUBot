import {  ButtonInteraction, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";

export default { 
    category: 'Random',
    description: 'Test your CPS with a button',

    slash: 'both',
    testOnly: true,

    callback: async ({ interaction: msgInt, channel }) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('clicker')
                    .setEmoji('🖱')
                    .setLabel('Click Here!')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('cancel')
                    .setLabel('Cancel')
                    .setStyle('DANGER')
            )

        const linkRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                    .setLabel('I wonder what this does...')
                    .setStyle('LINK')
            )

        await msgInt.reply({
            content: 'You clicked :)',
            components: [row, linkRow],
            ephemeral: false, //true if only sender sees
        })

        //const filter = (btnInt: ButtonInteraction) => { return msgInt.user.id === btnInt.user.id }

        const collector = channel.createMessageComponentCollector({
            max: 1,
            time: 1000 * 15,
        })
        
        //if you want to reply after the button is clicked
        
        // collector.on('collect', (i:ButtonInteraction) => {
        //     i.reply({
        //         content: 'You clicked a button',
        //         ephemeral: false, //true if only sender sees
        //     })
        // })

        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })

            if(collection.first()?.customId === 'clicker') {
                //function logic for yes button
            }

            await msgInt.editReply({
                content: 'An action has been already taken bozo',
                components: [],
            })
        })
    }
} as ICommand