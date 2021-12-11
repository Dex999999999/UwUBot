import { ICommand } from "wokcommands";

export default {
    category: 'Random',
    description: 'Gets the bots uptime',

    slash: 'both',
    testOnly: true,
    ownerOnly: true,
    

    callback: ({message, client}) => {
        let totalSeconds = (client.uptime! / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`
        return uptime
        
    }, 
} as ICommand