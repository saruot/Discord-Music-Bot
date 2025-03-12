const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Show queue'),


    async execute(interaction, player){
        const queue = player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "❌ The queue is currently empty.", ephemeral: true });
        }
        const tracks = queue.tracks.toArray(); // Get all tracks in queue
        const currentTrack = queue.currentTrack;

        const embed = new EmbedBuilder()
        .setTitle("🎵 Music Queue")
        .setColor("#1DB954")
        .setDescription(
            `🎶 **Now Playing:** [${currentTrack.title}](${currentTrack.url})\n\n` +
            (tracks.length > 0 
                ? tracks
                    .slice(0, 10) // Show up to 10 tracks
                    .map((track, i) => `\`${i + 1}.\` [${track.title}](${track.url})`)
                    .join("\n")
                : "*No more songs in queue*"
            )
        )
        .setFooter({ text: `Total songs in queue: ${tracks.length}` });

    return interaction.reply({ embeds: [embed] });
    }
}