module.exports = {
    name: 'interactionCreate',
    async execute(interaction, player) {
        if (!interaction.isCommand()) return;
        
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, player);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
        }
    }
};
