import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Pretends like there is a join',
    
    slash: 'both',
    testOnly: false,
    
    callback: ({ member, client }) => {
        client.emit('guildMemberAdd', member)
        return 'simulated join!'
    }
    
} as ICommand