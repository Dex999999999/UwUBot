import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Pretends like someone left',
    
    slash: 'both',
    testOnly: true,
    
    callback: ({ member, client }) => {
        client.emit('guildMemberRemove', member)
        return 'simulated leave!'
    }
    
} as ICommand