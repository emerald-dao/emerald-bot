const { checkOwnsFT } = require('../flow/scripts/checkOwnsFT.js');

const execute = async (interaction, options, emeraldIds) => {
    const contractName = options[0];
    const contractAddress = options[1];
    const publicPath = options[2];
    const amount = options[3];
    const roleId = options[4];
    const ownsFT = await checkOwnsFT(contractName, contractAddress, publicPath, amount, emeraldIds.values);
    if (ownsFT === true) {
        interaction.member.roles.add(roleId).catch((e) => console.log(e));
        await interaction.editReply({ content: "You have been given the " + `<@&${roleId}>` + " role.", ephemeral: true });
    } else {
        await interaction.editReply({ content: `You do not own ${amount} tokens from ${contractName}.`, ephemeral: true });
    }
}


module.exports = {
    name: 'verifyFT',
    description: 'verifies if a user has a certain amount of FT from a certain contract',
    execute,
}