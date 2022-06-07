// A command for all Dapper Products
const { MessageActionRow, MessageButton, MessageEmbed, Permissions } = require('discord.js');
const { holdingScripts } = require('../flow/holdings/entities');

const execute = async (interaction, options) => {
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        const name = options.getString('name');
        if (!holdingScripts[name]) {
            await interaction.reply({ ephemeral: true, content: 'This is not a registered entity.' }).catch(e => console.log(e));
            return;
        }
        verifyEntity(interaction, name);
    }
}

const verifyEntity = async (interaction, name) => {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`verifyEntity-${name}`)
                .setLabel('Verify')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setURL('https://id.ecdao.org/')
                .setLabel('Manage EmeraldID')
                .setStyle('LINK')
        );

    const embed = new MessageEmbed()
        .setColor('#5bc595')
        .setTitle(`Verify your assets for ${name}`)
        .setAuthor('Emerald City', 'https://i.imgur.com/YbmTuuW.png', 'https://discord.gg/emeraldcity')
        .setDescription('Click the `Verify` button below to verify your assets with your EmeraldID.')
        .setThumbnail('https://i.imgur.com/UgE8FJl.png');

    await interaction.reply({ ephemeral: false, embeds: [embed], components: [row] }).catch(e => console.log(e));
}

module.exports = {
    name: 'entity',
    description: 'Setup a verifier for an entity that was previously verified by Emerald City.',
    execute,
}