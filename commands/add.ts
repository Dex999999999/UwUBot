import { ICommand } from 'wokcommands'

export default {
  category: 'Math', 
  description: 'Finds the sum of two numbers', 

  slash: 'both', 
  testOnly: true, 

  options: [
    {
      name: 'num1', // Must be lower case
      description: 'First number',
      required: true,
      type: 3, // This argument is a string
    },
    {
      name: 'num2', // Must be lower case
      description: 'Second number.',
      required: true,
      type: 3, // This argument is a string
    },
  ],
  callback: ({ message, interaction, args }) => {
    
    if (interaction) {
      const num1 = parseInt(args[0])
      const num2 = parseInt(args[1])
      interaction.reply({
        content: String(num1 + num2),
      })
    }

    if (message) {
      
      let sum = 0
      for (const arg of args){
        if(parseInt(arg) == NaN) return 'please input numbers'
        sum += parseInt(arg)
      }
      return `${sum}`
    }
  },
} as ICommand