const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const checkOwnsFT = async (contractName, contractAddress, publicPath, amount, emeraldIds) => {
  const fixedAmount = parseFloat(amount).toFixed(2);
  const scriptCode = `
  import FungibleToken from 0xf233dcee88fe0abe
  import ${contractName} from ${contractAddress}
  pub fun main(emeraldIds: [Address], fixedAmount: UFix64): Bool {
      var trackedBalance = 0.0
      for address in emeraldIds {
        if let vault = getAccount(address).getCapability(/public/${publicPath}).borrow<&${contractName}.Vault{FungibleToken.Balance}>() {
          trackedBalance = trackedBalance + vault.balance
        } else {
          if let vaultPublic = getAccount(address).getCapability(/public/${publicPath}).borrow<&{FungibleToken.Balance}>() {
              if vaultPublic.getType().identifier == "A.${contractAddress.slice(2)}.${contractName}.Vault" {
                trackedBalance = trackedBalance + vaultPublic.balance
              }
          }
        }
      }

      return trackedBalance >= fixedAmount
  }
  `;

  try {
    const result = await fcl.send([
      fcl.script(scriptCode),
      fcl.args([
        fcl.arg(emeraldIds, t.Address),
        fcl.arg(fixedAmount, t.UFix64)
      ])
    ]).then(fcl.decode);
    return result;
  } catch(e) {
    console.log(e)
    return {error: true, message: 'You do not own this token.'};
  }
}

module.exports = {
  checkOwnsFT
}