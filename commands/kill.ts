import { ICommand } from "wokcommands";

export default {
    category: 'Random',
    description: 'Kills the bot',

    slash: false,
    testOnly: true,
    hidden: true,
    

    callback: ({message, client}) => {
        message.channel.send('killing...')
        process.exit()
        
    }, 
} as ICommand