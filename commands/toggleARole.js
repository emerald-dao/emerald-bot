const execute = async (interaction, options, emeraldID) => {
  const roleId = options[0];
  const onOrOff = options[1];

  if (onOrOff === 'join') {
    interaction.member.roles.add(roleId).catch((e) => console.log(e));
    await interaction.editReply({ content: "You have been given the " + `<@&${roleId}>` + " role.", ephemeral: true });
  } else {
    interaction.member.roles.remove(roleId).catch((e) => console.log(e));
    await interaction.editReply({ content: `You removed the <@&${roleId}> role.`, ephemeral: true });
  }
}

module.exports = {
  name: 'toggleARole',
  description: 'gives or takes a certain role',
  execute,
}