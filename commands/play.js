const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song')
        .addStringOption(option => 
            option.setName('query')
                .setDescription('Song name or URL')
                .setRequired(true)
        ),
    
    async execute(interaction, player) {
        const query = interaction.options.getString('query');
        const channel = interaction.member.voice.channel;
        
        if (!channel) return interaction.reply('You need to be in a voice channel!');

        const queue = player.nodes.create(interaction.guild, { metadata: interaction.channel });

        if (!queue.connection) await queue.connect(channel);

        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);

        if (!track) return interaction.reply('No results found!');

        queue.addTrack(track);

        if (!queue.isPlaying()) queue.node.play();

        return interaction.reply(`🎵 Playing **${track.title}**`);
    }
};