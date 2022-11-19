const { Client, Intents, MessageEmbed } = require('discord.js');

const prefix = '!';
const modLogChannel = 'CHANNEL ID';

///CHANNEL ID IS REQUIRED///

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

client.on('ready', () => console.log('Logged in'))

client.on('messageCreate', async (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (command === 'delete') {
        if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')) return message.reply('You do not have permission to use this command.');
        
        const messageId = args[0];
        if (!messageId) return message.reply('Please provide a message ID.');
        const reason = args.slice(1).join(' ');
        if (!reason) return message.reply('Please provide a reason.');

        const msg = await message.channel.messages.fetch(messageId).catch(() => null);
        if (!msg) return message.reply('Could not find that message in this channel.');

        if (!msg.deletable) return message.reply('That message cannot be deleted by me.')
        await msg.delete({ reason })

        let botmsg;

        try {
            const embed = new MessageEmbed()
            .setTitle('Message Content')
            .setDescription(msg.content.slice(0, 2048))
            .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL() })
            .addFields([
                {
                    name: 'Reason',
                    value: reason
                }
            ])
            .setFooter({ text: `Message ID: ${msg.id}` })
            .setColor('RANDOM');

            const modLog = new MessageEmbed()
            .setTitle('Message Content')
            .setDescription(msg.content.slice(0, 2048))
            .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL() })
            .addFields([
                {
                    name: 'Reason',
                    value: reason
                },
                {
                    name: 'Moderator',
                    value: message.author.tag
                }
            ])
            .setFooter({ text: `Message ID: ${msg.id}` })
            .setColor('RANDOM');

            message.guild.channels.cache.get(modLogChannel).send({ content: `A message was deleted in ${message.channel}`, embeds: [modLog] });

            await msg.author.send({ content: `Your message in ${message.channel} was deleted.`, embeds: [embed] })
            botmsg = await message.reply('Message deleted and user DMed.')
        } catch {
           botmsg = await message.reply('Message deleted, but could not DM user.')
        }

        setTimeout(() => {
            message.delete(),
            botmsg.delete()
        }, 5000)
    }
})

client.login('TOKEN')