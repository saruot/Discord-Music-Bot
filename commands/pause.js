const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the currently playing song'),

    async execute(interaction, player) {
        const queue = player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "❌ There is no song playing!", ephemeral: true });
        }

        queue.node.setPaused(true);
        return interaction.reply("⏸️ Paused the current song!");
    }
};
