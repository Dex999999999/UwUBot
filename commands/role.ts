import { ICommand } from "wokcommands";

export default {
    category: 'Random',
    description: 'Finds all users with a role',

    slash: 'both',
    testOnly: false,
    

    callback: ({message, client, args}) => {
        //check who has role 
        if (args[0].startsWith('<@&') && args[0].endsWith('>')) {
            var mention = args[0].slice(3, -1)
        } else{ var mention = 'sus'; return 'you need to include a role'}
        let role = message.guild!.roles.cache.get(mention)!.members.map(m=>'<@'+m.user.id+'>');

        if(role.length > 0) message.channel.send(`${role}`)
        else message.channel.send(`no users have that role!`)
    }, 
} as ICommand