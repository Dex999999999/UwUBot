import { ICommand } from "wokcommands";

export default {
    category: 'Random',
    description: '😎',

    slash: false,
    testOnly: true,
    

    callback: ({message}) => {
        const filter = (message: { content: string }) => message.content !== "hi";
        if (message.content.toLowerCase() === '!fortnite') {
            message.channel.send('Do you eat your vegetables?')
            message.channel.awaitMessages({ filter, max: 2, time: 20_000, errors: ['max'] })
            .then((collected) => {
                const collect = collected.last()!;
                console.log(collected.size)
                if (collect.content.toLowerCase() === 'no'){
                    message.channel.send('Go back to fortnite!')
                    console.log("Sent: Go back to fortnite!");
                } else {
                    message.channel.send('Good Boi')
                    console.log("Sent: Good Boi");
                }
                })
            .catch();
            
        }
    }, 
} as ICommand
