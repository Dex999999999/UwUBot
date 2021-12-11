import { Client } from "discord.js";

export default (client: Client) => {
    const statusOptions = [
        'uwu',
        ':)',
        'heyo',
        'smash bros ultimate :0',
        "getting combo'd by dedede"
    ]
    let counter = 0
    
    const updateStatus = () => {
        client.user?.setPresence({
            status: 'online',
            activities: [{
                name: statusOptions[counter]
            }]
        })
        
        if(++counter >= statusOptions.length){
            counter = 0
        }
        setTimeout(updateStatus, 1000 * 60)
    }
    updateStatus()
}

export const config = {
    dbName: 'AUTO_STATUS',
    displayName: 'Status Changer'
}