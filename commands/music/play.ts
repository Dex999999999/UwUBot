import { ICommand } from "wokcommands"
import { DISTUBE } from "../../index"
const appleMusicPlaylist = require("apple-music-playlist");

export default {
    category: 'Music',
    description: 'Plays a song',
    name: 'play',
    aliases: ['p'],

    slash: false,
    testOnly: false,
    

    callback: async ({client, message, args}) => {
        if(!message.member!.voice.channel) {return message.reply('you need to be in a vc bozo')}
        
        let music = args.join(' ')
        if(!music){ return "you need to send a song" }

        if(message.content.includes('https://music.apple.com/')){
            let sUrl = args[0];
            appleMusicPlaylist.getPlaylist(sUrl).then(async (aResult: any) => {
                console.log(aResult);
                for (var _i = 0; _i < aResult.length; _i++) {
                    let music = aResult[_i].title + aResult[_i].artist
                    await DISTUBE.play(message, music.toString())
                }
                
            }).catch((err: any) => {
                throw err;
            });
        }else{await DISTUBE.play(message, music)}
    }, 
} as ICommand