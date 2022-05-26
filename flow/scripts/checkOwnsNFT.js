const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const checkOwnsNFT = async (contractName, contractAddress, publicPath, emeraldIds) => {
  const scriptCode = `
  import NonFungibleToken from 0xNFT
  import ${contractName} from ${contractAddress}
  pub fun main(emeraldIds: [Address]): Bool {
      for address in emeraldIds {
        // Attempts the normal way of looking at a collection
        if let collection = getAccount(address).getCapability(/public/${publicPath}).borrow<&${contractName}.Collection{NonFungibleToken.CollectionPublic}>() {
          if collection.getIDs().length > 0 {
            return true
          }
        } 
  
        // Attempts the annoying way of looking at a collection if the project
        // creator is an idiot and doesn't link things correctly
        if let collection = getAccount(address).getCapability(/public/${publicPath}).borrow<&{NonFungibleToken.CollectionPublic}>() {
            if collection.getType().identifier == "A.${contractAddress.slice(2)}.${contractName}.Collection" {
              if collection.getIDs().length > 0 {
                return true
              }
            }
        }
      }
      
      return false
  }
  `;

  try {
    const result = await fcl.send([
      fcl.script(scriptCode),
      fcl.args([
        fcl.arg(emeraldIds, t.Array(t.Address)),
      ])
    ]).then(fcl.decode);
    return result;
  } catch(e) {
    console.log(e)
    return {error: true, message: 'You do not own this NFT.'};
  }
}

module.exports = {
  checkOwnsNFT
}