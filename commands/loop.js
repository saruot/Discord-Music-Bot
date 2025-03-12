const { SlashCommandBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Loops the current song or the entire queue')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Select loop mode: off, track, queue')
                .setRequired(true)
                .addChoices(
                    { name: 'Off', value: 'off' },
                    { name: 'Track', value: 'track' },
                    { name: 'Queue', value: 'queue' }
                )
        ),

    async execute(interaction, player) {
        const queue = player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "❌ There is no song playing!", ephemeral: true });
        }

        const mode = interaction.options.getString('mode');
        let response;

        switch (mode) {
            case 'off':
                queue.setRepeatMode(QueueRepeatMode.OFF);
                response = "🔁 Looping is now **off**.";
                break;
            case 'track':
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                response = "🔂 The current song will now **repeat**.";
                break;
            case 'queue':
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                response = "🔁 The entire **queue** will now repeat.";
                break;
            default:
                response = "❌ Invalid loop mode.";
        }

        return interaction.reply(response);
    }
};
