import { ICommand } from 'wokcommands'

export default {
  category: 'Random',
  description: 'Makes catbot ponder the meaning of life',

  slash: 'both',
  testOnly: true,

  options: [
    {
      name: 'time', // Must be lower case
      description: 'How long should catbot have an existential crisis?',
      required: true,
      type: 3, // This argument is a string
    },
  ],
  callback: async ({ interaction, args }) => {
    const time = parseInt(args[0])
    let content = 'Brain goes brrrrrr'
    if (time === 42){
      content = 'I now understand everything :eyes:'
    }

    await interaction.deferReply({
      ephemeral: false, //make this true if you want only sender to see it
    })

    await new Promise(resolve => setTimeout(resolve, time * 1000))

    if (interaction) {
      interaction.editReply({
        content: content,
      })
    }
  },
} as ICommand