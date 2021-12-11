import { ICommand } from "wokcommands";

export default {
    category: 'Random',
    description: 'Replies with pong',

    slash: 'both',
    testOnly: false,
    

    callback: ({message, client}) => {
        return `pong  🏓  ${Math.round(client.ws.ping)} ms`
    }, 
} as ICommand