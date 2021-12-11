//bot inv link: https://discord.com/api/oauth2/authorize?client_id=897718800974225450&permissions=8&scope=bot%20applications.commands
import DiscordJS, { Intents, Message, TextChannel } from 'discord.js'
import DisTube from 'distube'
import WOKCommands from 'wokcommands'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import SoundCloudPlugin from '@distube/soundcloud'
import SpotifyPlugin from '@distube/spotify'

dotenv.config()


//mongoDB declarations from other files
// import testSchema from './models/test-schema'

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

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === 'ping') {
        message.channel.send('pong')
        .then(message => console.log(`sent: ${message.content}`))

    } else if (message.content.toLowerCase() === 'uwu') {
        if(message.author.id != '529447848438398986'){
        message.channel.send('owo')
        } else {message.channel.send("you're so weird <@529447848438398986>")}
    } else if (message.content.toLowerCase() === 'nuke'){
        message.channel.send('kaboooooooooooooooooooooooooooooooooooooooooooooom')
        message.channel.send('https://images-ext-2.discordapp.net/external/15xt6pC04tDay-mSvA5CWcBEOUtpB1tfjdUApFKJ3SQ/https/c.tenor.com/Ms3zVqn7qcUAAAAM/nuke-press-the-button.gif')
    }
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