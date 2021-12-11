//bot inv link: https://discord.com/api/oauth2/authorize?client_id=897718800974225450&permissions=8&scope=bot%20applications.commands
//HkGS3qMsZGsAULnVekgacCM5nK59ZOLnPY45F01MX5DGEx6Z pterodactyl
import DiscordJS, { Intents, Message, TextChannel } from 'discord.js'
import DisTube from 'distube'
import WOKCommands from 'wokcommands'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import SoundCloudPlugin from '@distube/soundcloud'
import SpotifyPlugin from '@distube/spotify'

import DBD, { Dashboard } from 'discord-dashboard';
const CaprihamTheme = require('dbd-capriham-theme')

dotenv.config()

//mongoDB declarations from other files
//import testSchema from './test-schema'
let langsSettings = {};

let currencyNames = {};

let botNicknames = {};

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})
// Create a new DisTube
const distube = new DisTube(client, {

	searchSongs: 10,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 0,
	leaveOnFinish: true,
	leaveOnStop: true,
    plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],

})

export const DISTUBE = distube

client.on('ready', async () => {
    console.log('Bot is ready');
    console.log(`Currently in ${client.guilds.cache.size} servers`)
    
    
distube.on('error', (channel, error) => {
		console.error(error)
		channel.send(`An error encoutered: `)
	})
    
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['774133192536883201'],
        mongoUri: process.env.MONGOURI,
        botOwners: ['616981104011771904', '722845725188423743']
        // dbOptions: {
        //     keepAlive: true
        // }
        
    })
    .setDefaultPrefix('!') // Set your prefix here
    .setCategorySettings([
        {
            name: 'Random',
            emoji: '🎱'
        },
        {
            name: 'Math',
            emoji: '✏'
        },
        {
            name: 'Music',
            emoji: '🎵'
        },
        {
            name: 'Smash',
            emoji: '🎮'
        },
        {
            name: 'Testing',
            emoji: '👨‍💻'
        },
        {
            name: 'Moderation',
            emoji: '🔨'
        },
    ])
    
    console.log('Connected to Mongo DB :)')

    //setTimeout(async () => {
     //   await new testSchema({
       //     message: 'hello there',
       // }).save()
   // }, 1000)

    const guildId = '774133192536883201'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }
    (client.channels.cache.get('906711559118667777') as TextChannel).send('bot is ready :)')
})

// Queue status template
const status = (queue: { volume: any; filters: any[]; repeatMode: number; autoplay: any }) =>
	`Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ')
		|| 'Off'}\` | Loop: \`${
		queue.repeatMode
			? queue.repeatMode === 2
				? 'All Queue'
				: 'This Song'
			: 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``



distube
    .on('playSong', (queue, song) =>
        {
            queue.textChannel!.send(
                `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: <@${song.user}> ${status(queue)}`,
            )
            
        	return
		}
		)
    .on('addSong', (queue, song) =>
        {       
            if(queue.songs.length === 1){ } else {
            queue.textChannel!.send(
                `Added \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: <@${song.user}>`,
            )
            }
    		return
		}
        )
    .on('searchResult', (message, result) => {
		let i = 0
		message.channel.send(
			`**Choose an option from below**\n${result
				.map(
					song =>
						`**${++i}**. ${song.name} - \`${
							song.formattedDuration
						}\``,
				)
				.join(
					'\n',
				)}\n*Enter anything else or wait 30 seconds to cancel*`,
		)
	})
    // DisTubeOptions.searchSongs = true
	.on('searchCancel', message => {message.channel.send(`search canceled`)})
	.on('searchInvalidAnswer', message => {message.channel.send(`invalid answer`)})
	.on('searchNoResult', message => {message.channel.send(`didn't find anything`)})
    .on('finish', queue => {
    queue.textChannel!.send('finished queue!')
    return
    }
    )
    // .on('finishSong', queue => {
    // queue.textChannel!.send('finished song!')
    // return
    // }
    // )
    .on('disconnect', queue => {
    queue.textChannel!.send('byeeeeeeeeee')
    return
    }
    )
    .on('empty', queue => {
        queue.textChannel!.send("Why'd u leave me")
        return
    })
    .on('error', (textChannel, e) => {
        console.error(e)
        textChannel.send(`An error encountered: ${e.toString().slice(0, 2000)}`)
    })

client.login(process.env.TOKEN)

// const DD = new Dashboard({
//     port: 80,
//     client: {
//         id: 'clientId',
//         secret: 'clientSecret'
//     },
//     redirectUri: 'http://localhost/discord/callback',
//     domain: 'http://localhost',
//     bot: client,
//     acceptPrivacyPolicy: true,
//     ownerIDs: ['616981104011771904'],
//     sessionFileStore: true,
//     theme: CaprihamTheme({
//         websiteName: "Assistants",
//         iconURL: 'https://assistants.ga/ac_logo_v6.png',
//         index: {
//             card:{
//                 title: "Assistants - The center of everything",
//                 description: "Assistants Discord Bot management panel. Assistants Bot was created to give others the ability to do what they want. Just.<br>That's an example text.<br><br><b><i>Feel free to use HTML</i></b>",
//                 image: "https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile-656x369.png",
//             },
//             information: {
//                 title: "Information",
//                 description: "To manage your bot, go to the <a href='/manage'>Server Management page</a>.<br><br>For a list of commands, go to the <a href='/commands'>Commands page</a>.<br><br><b><i>You can use HTML there</i></b>"
//             },
//             feeds: {
//                 title: "Feeds",
//                 list: [
//                     {
//                         icon: "fa fa-user",
//                         text: "New user registered",
//                         timeText: "Just now",
//                         bg: "bg-light-info"
//                     },
//                     {
//                         icon: "fa fa-server",
//                         text: "Server issues",
//                         timeText: "3 minutes ago",
//                         bg: "bg-light-danger"
//                     }
//                 ]
//             }
//         },
//         commands: {
//             pageTitle: "Commands",
//             table: {
//                 title: "List",
//                 subTitle: "All Assistants' commands",
//                 list: 
//                 [
//                     {
//                         commandName: "Test command",
//                         commandUsage: "prefix.test <arg> [op]",
//                         commandDescription: "Lorem ipsum dolor sth"
//                     },
//                     {
//                         commandName: "2nd command",
//                         commandUsage: "oto.nd <arg> <arg2> [op]",
//                         commandDescription: "Lorem ipsum dolor sth, arg sth arg2 stuff"
//                     }
//                 ]
//             }
//         }
//     }),
//     settings: [
//         {
//             categoryId: 'setup',
//             categoryName: "Setup",
//             categoryDescription: "Setup your bot with default settings!",
//             categoryOptionsList: [
//                 {
//                     optionId: 'nickname',
//                     optionName: "Nickname",
//                     optionDescription: "Bot's nickname on the guild",
//                     optionType: DBD.formTypes.input("Bot username", 1, 16, false, true),
//                     setNew: async ({guild,newData}: any) => {
//                         botNicknames[guild.id] = newData;
//                         return;
//                     },
//                     getActualSet: async ({guild}: any) => {
//                         return botNicknames[guild.id] || false;
//                     },
                    
//                 },
//             ]
//         },
//     ]
// });

// DD.init();
