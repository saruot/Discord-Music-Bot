const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the currently playing song'),

    async execute(interaction, player) {
        const queue = player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "❌ There is no song playing!", ephemeral: true });
        }

        queue.node.skip();
        return interaction.reply("⏩ Skipped the current song!");
    }
};
