const { MessageActionRow, MessageButton, MessageEmbed, Permissions } = require('discord.js');
const { getGroupInfo } = require('../flow/scripts/getGroupInfo');
const { toAddress } = require('../flow/scripts/resolveNames');

const execute = async (interaction, options) => {
  if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
    let role = interaction.guild.roles.cache.find(role => role === options.getRole('role'));
    if (!role) {
      interaction.reply({ ephemeral: true, content: 'This role does not exist.' }).catch(e => console.log(e));
      return;
    }

    const creator = options.getString('creator');
    let resolved = creator;
    if (resolved.includes('.') || resolved.slice(0, 2) !== '0x') {
      resolved = await toAddress(creator);
    }
    if (!resolved) {
      return {error: true, message: 'This account is invalid.'};
    }

    const groupName = options.getString('groupname');
    const all = options.getBoolean('all');

    const groupInfo = await getGroupInfo(resolved, groupName);
    if (groupInfo.error) {
      interaction.reply({ ephemeral: true, content: groupInfo.message }).catch(e => console.log(e));
      return;
    }

    verifyGroupButton(interaction, creator, resolved, groupInfo, role.id, all);
  }
}

const verifyGroupButton = (interaction, creator, resolved, groupInfo, roleId, all) => {
  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`verifyGroup-${resolved}-${groupInfo.name}-${roleId}-${all.toString()}`)
        .setLabel('Verify')
        .setStyle('SUCCESS'),
      new MessageButton()
        .setURL('https://id.ecdao.org/')
        .setLabel('Manage EmeraldID')
        .setStyle('LINK')
    );

  const embed = new MessageEmbed()
    .setColor('#5bc595')
    .setTitle(all ? `Verify you own all the FLOATs from ${groupInfo.name}` : `Verify you own a FLOAT from ${groupInfo.name}`)
    .addFields(
      { name: 'Group creator', value: creator },
      { name: 'Group description', value: groupInfo.description }
    )
    .setAuthor('Emerald City', 'https://i.imgur.com/YbmTuuW.png', 'https://discord.gg/emeraldcity')
    .setDescription('Click the `Verify` button below to get the ' + `<@&${roleId}>` + ' role with your EmeraldID.')
    .setThumbnail(`https://ipfs.infura.io/ipfs/${groupInfo.image}`);

  interaction.reply({ embeds: [embed], components: [row] }).catch(e => console.log(e));
}

module.exports = {
  name: 'groupverifier',
  description: 'setup a role verification with emeraldid',
  execute: execute,
}