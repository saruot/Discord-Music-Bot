const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Soithaa raitoja')
        .addStringOption(option => 
            option.setName('query')
                .setDescription('Song name or URL')
                .setRequired(true)
        ),
    
        async execute(interaction, player) {
            const query = interaction.options.getString('query');
            const channel = interaction.member.voice.channel;
    
            if (!channel) {
                return interaction.reply({ content: "❌ You need to be in a voice channel to play music!", ephemeral: true });
            }
    
            // ✅ Get existing queue or create a new one
            let queue = player.nodes.get(interaction.guild.id);
    
            if (!queue) {
                queue = player.nodes.create(interaction.guild.id, {
                    metadata: { channel },
                });
    
                try {
                    await queue.connect(channel);
                } catch {
                    player.nodes.delete(interaction.guild.id);
                    return interaction.reply({ content: "❌ Failed to join voice channel!", ephemeral: true });
                }
            }
    
            // 🎵 Search for the song
            const result = await player.search(query, { requestedBy: interaction.user });
    
            if (!result.tracks.length) {
                return interaction.reply({ content: "❌ No results found!", ephemeral: true });
            }
    
            const song = result.tracks[0]; // Get the first search result
            queue.addTrack(song); // ✅ Add song to queue
    
            // Get song position in queue
            const position = queue.tracks.size;
    
            // 🎶 Start playing if no song is currently playing
            if (!queue.isPlaying()) {
                await queue.node.play();
            }
    
            return interaction.reply({
                content: `🎵 **Added to queue:** [${song.title}](${song.url}) (Position: **${position}**)`,
            });
        }
    };