const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes the currently paused song'),

    async execute(interaction, player) {
        const queue = player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "❌ There is no paused song to resume!", ephemeral: true });
        }

        queue.node.setPaused(false);
        return interaction.reply("▶️ Resumed the song!");
    }
};
