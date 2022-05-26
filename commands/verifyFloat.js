const { checkOwnsFloat } = require('../flow/scripts/checkOwnsFloat.js');

const execute = async (interaction, options, emeraldID) => {
    const eventId = options[0];
    const roleId = options[1];
    const user = options[2];

    const ownsFloat = await checkOwnsFloat(user, eventId);
    if (ownsFloat === true) {
        interaction.member.roles.add(roleId).catch((e) => console.log(e));
        await interaction.editReply({ content: "You have been given the " + `<@&${roleId}>` + " role.", ephemeral: true });
    } else {
        await interaction.editReply({ content: "You do not own a FLOAT from this Event.", ephemeral: true });
    }
}


module.exports = {
    name: 'verifyFloat',
    description: 'verifies if a user has a float from a specific event and gives them the role for it',
    execute,
}