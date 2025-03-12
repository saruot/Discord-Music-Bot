const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears the entire music queue'),

    async execute(interaction, player) {
        const queue = player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "❌ There is no active queue to clear!", ephemeral: true });
        }

        queue.tracks.clear();
        return interaction.reply("🗑️ Cleared the queue!");
    }
};
