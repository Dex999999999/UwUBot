import { Client, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Adds a role',

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    permissions: ['ADMINISTRATOR'],

    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],
    //search channel specified for message by bot todo

    init: (client: Client) => {
        client.on('interactionCreate', interaction => {
            if(!interaction.isSelectMenu()) {
                return
            }
            
            const { customId, values, member } = interaction
            
            if(customId === 'auto-roles' && member instanceof GuildMember) {
                const component = interaction.component as MessageSelectMenu
                
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })
                
                for (const id of removed) {
                    member.roles.remove(id.value)
                }
                
                for (const id of values) {
                    member.roles.add(id)
                }
                
                interaction.reply({
                    content: 'updated your roles!',
                    ephemeral: true
                })
            }
        })
    },
    
    callback: async ({message, interaction, args, client}) => {
        const channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel')) as TextChannel
        if(!channel || channel.type !== 'GUILD_TEXT') {
            return 'please input a text channel'
        }

        const msgId = args[1]
        const role = (message ? message.mentions.roles.first() : interaction.options.getRole('role')) as Role
        if(!role) {
            return 'please input a valid role'
        }
        if(!role.editable) return "I can't access that role"
        console.log('role' + role.hexColor)
        const hexcolor = getSimilarColors(role.hexColor)
        console.log(hexcolor)
        //red purple blue green yellow orange brown black white
        //cc0000,"663399","0066cc","77cc33","ffff00","ff9900","663300","000000",ffffff

        
        if(hexcolor == 'cc0000') {var color = '🟥'}
        else if(hexcolor == '663399') {var color = '🟪'}
        else if(hexcolor == '0066cc') {var color = '🟦'}
        else if(hexcolor == '77cc33') {var color = '🟩'}
        else if(hexcolor == 'ffff00') {var color = '🟨'}
        else if(hexcolor == 'ff9900') {var color = '🟧'}
        else if(hexcolor == '663300') {var color = '🟫'}
        else if(hexcolor == '000000') {var color = '⬛'}
        else {var color = '⬜'}

        const targetMessage = await channel.messages.fetch(msgId, {
            cache: true,
            force: true
        })

        if(!targetMessage){
            return 'unknown message ID'
        }

        if(targetMessage.author.id !== client.user?.id) {
            return `please input a message ID sent by <@${client.user?.id}>`
        }

        let row = targetMessage.components[0] as MessageActionRow
        if(!row) {
            row = new MessageActionRow()
        }

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id,
            emoji: color
        }]

        let menu = row.components[0] as MessageSelectMenu

        if(menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value){
                    return {
                        custom: true,
                        content: `<@&${o.value}> is already in this menu`,
                        allowedMentions: {
                            roles: [],
                        },
                        ephemeral: true
                    }
                }
            }

            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                    .setCustomId('auto-roles')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder('choose your roles')
                    .addOptions(option)
                )
        }

        targetMessage.edit({
            components: [row]
        })

        return { 
            custom: true,
            content: `added <@&${role.id}> to the auto roles`,
            allowedMentions: {
                roles: []
            },
            ephemeral: true,
        }

    }, 
} as ICommand


//red purple blue green yellow orange brown black white
function getSimilarColors (color: string) {
    var base_colors=["cc0000","663399","0066cc","77cc33","ffff00","ff9900","663300","000000","ffffff"];
    
    //Convert to RGB, then R, G, B
    var color_rgb = hex2rgb(color);
    var color_r: any = color_rgb.split(',')[0];
    var color_g: any = color_rgb.split(',')[1];
    var color_b: any = color_rgb.split(',')[2];

    //Create an emtyp array for the difference betwwen the colors
    var differenceArray: number[]=[];

    //Function to find the smallest value in an array
    // Math.min = function( array ){
    //        return Math.min.apply( Math, array );
    // };


    //Convert the HEX color in the array to RGB colors, split them up to R-G-B, then find out the difference between the "color" and the colors in the array
    var i
    for(i = 0; i < base_colors.length; i++  ){ 
        var value = base_colors[i]
        var base_color_rgb = hex2rgb(value);
        var base_colors_r: any = base_color_rgb.split(',')[0];
        var base_colors_g: any = base_color_rgb.split(',')[1];
        var base_colors_b: any = base_color_rgb.split(',')[2];

        //Add the difference to the differenceArray
        differenceArray.push(Math.sqrt((color_r-base_colors_r)*(color_r-base_colors_r)+(color_g-base_colors_g)*(color_g-base_colors_g)+(color_b-base_colors_b)*(color_b-base_colors_b)));
    }

    //Get the lowest number from the differenceArray
    var lowest = differenceArray.reduce((a, b) => Math.min(a, b))

    //Get the index for that lowest number
    var index = differenceArray.indexOf(lowest);

    //Function to convert HEX to RGB
    function hex2rgb( colour: string ) {
        var r,g,b;
        if ( colour.charAt(0) == '#' ) {
            colour = colour.substr(1);
        }

        r = colour.charAt(0) + colour.charAt(1);
        g = colour.charAt(2) + colour.charAt(3);
        b = colour.charAt(4) + colour.charAt(5);

        r = parseInt( r,16 );
        g = parseInt( g,16 );
        b = parseInt( b ,16);
        return r+','+g+','+b;
    }

    //Return the HEX code
    return base_colors[index];
}