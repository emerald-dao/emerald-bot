const nftCode = ({contractName, contractAddress, path}) => {
    return `
        import NonFungibleToken from 0x1d7e57aa55817448
        import ${contractName} from ${contractAddress}
        pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(${path}).borrow<&${contractName}.Collection{NonFungibleToken.CollectionPublic}>() {
                return collection.getIDs().length
            } else {
                if let collectionPublic = getAccount(address).getCapability(${path}).borrow<&{NonFungibleToken.CollectionPublic}>() {
                    if collectionPublic.getType().identifier == "A.${contractAddress.slice(2)}.${contractName}.Collection" {
                        return collectionPublic.getIDs().length
                    }
                }
            }

            return -1
        }
    `;
}

const ftCode = ({contractName, contractAddress, path}) => {
    return `
        import FungibleToken from 0xf233dcee88fe0abe
        import ${contractName} from ${contractAddress}
        pub fun main(address: Address): UFix64 {
            if let vault = getAccount(address).getCapability(${path}).borrow<&${contractName}.Vault{FungibleToken.Balance}>() {
                return vault.balance
            } else {
                if let vaultPublic = getAccount(address).getCapability(${path}).borrow<&{FungibleToken.Balance}>() {
                    if vaultPublic.getType().identifier == "A.${contractAddress.slice(2)}.${contractName}.Vault" {
                        return vaultPublic.balance
                    }
                }
            }

            return 0.0
        }
    `;
}

const findCode = (guildInfo) => {
    return `
        import FIND from 0x097bafa4e0b48eef
        import Profile from 0x097bafa4e0b48eef

        pub fun main(address: Address): Int {

            let account=getAccount(address)
            let leaseCap = account.getCapability<&FIND.LeaseCollection{FIND.LeaseCollectionPublic}>(FIND.LeasePublicPath)

            if !leaseCap.check() {
                return 0
            }

            let profile= Profile.find(address).asProfile()
            let leases = leaseCap.borrow()!.getLeaseInformation() 
            var time : UFix64?= nil
            var name :String?= nil
            for lease in leases {

                //filter out all leases that are FREE or LOCKED since they are not actice
                if lease.status != "TAKEN" {
                    continue
                }

                //if we have not set a 
                if profile.findName == "" {
                    if time == nil || lease.validUntil < time! {
                        time=lease.validUntil
                        name=lease.name
                    }
                }

                if profile.findName == lease.name {
                    return 1
                }
            }

            if name == nil {
                return 0
            } 
            return 1
        }
    `;
}

const geniacemetalmanekiCode = (guildInfo) => {
    return `
        import GeniaceNFT from 0xabda6627c70c7f52
        
        pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(GeniaceNFT.CollectionPublicPath).borrow<&GeniaceNFT.Collection{GeniaceNFT.GeniaceNFTCollectionPublic}>() {
                let ids = collection.getIDs()

                for id in ids {
                    let geniaceNFT = collection.borrowGeniaceNFT(id: id)!
                    if geniaceNFT.metadata.celebrityName == "METAL MANEKI" {
                        return 1
                    }
                }
            }

            return -1
        }
    `;
}

const flovatarCode = (guildInfo) => {
    return `
        import Flovatar from 0x921ea449dffec68a
        
        pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(/public/FlovatarCollection).borrow<&{Flovatar.CollectionPublic}>() {
                return collection.getIDs().length
            }

            return -1
        }
    `;
}

const flovatarApeCode = (guildInfo) => {
    return `
        import Flovatar from 0x921ea449dffec68a
        
        pub fun main(address: Address): Int {
              if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                  var count: Int = 0;
                  let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                  
                  for flovatar in flovatarsData {
                    if(flovatar.metadata.combination.slice(from: 0, upTo: 4) == "B35H"){
                      count = count + Int(1)
                    }
                  }
                  
                  return count
              }
              
              return -1
        }
    `;
}

const flovatarDevilCode = (guildInfo) => {
    return `
        import Flovatar from 0x921ea449dffec68a
        
        pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                  var count: Int = 0;
                  let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                  
                  for flovatar in flovatarsData {
                    if(flovatar.metadata.combination.slice(from: 0, upTo: 4) == "B39H"){
                      count = count + Int(1)
                    }
                  }
                  
                  return count
              }
              
              return -1
        }
    `;
}

const flovatarFlotrotterCode = (guildInfo) => {
    return `
        import Flovatar from 0x921ea449dffec68a
        
        pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                  var count: Int = 0;
                  let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                  
                  for flovatar in flovatarsData {
                    let str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(3), upTo: flovatar.metadata.combination.length)
                    if(str == "C84" || str == "C85" || str == "C86"){
                      count = count + Int(1)
                    }
                  }
                  
                  return count
              }
              
              return -1
        }
    `;
}

const flovatarDroidCode = (guildInfo) => {
    return `
        import Flovatar from 0x921ea449dffec68a
        
        pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                  var count: Int = 0;
                  let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                  
                  for flovatar in flovatarsData {
                    let str = flovatar.metadata.combination.slice(from: 0, upTo: 4)
                    if(str == "B37H" || str == "B57H" || str == "B58H"){
                      count = count + Int(1)
                    }
                  }
                  
                  return count
              }
              
              return -1
        }
    `;
}

const flovatarRacerCode = (guildInfo) => {
    return `
        import Flovatar from 0x921ea449dffec68a
        
        pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                  var count: Int = 0;
                  let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                  
                  for flovatar in flovatarsData {
                    let str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
                    if(str == "C133" || str == "C134" || str == "C135" || str == "C136" || str == "C137"){
                      count = count + Int(1)
                    }
                  }
                  
                  return count
              }
              
              return -1
        }
    `;
}

const flovatarCatCode = (guildInfo) => {
    return `
        import Flovatar from 0x921ea449dffec68a
        
        pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                  var count: Int = 0;
                  let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                  
                  for flovatar in flovatarsData {
                    if(flovatar.metadata.combination.slice(from: 0, upTo: 4) == "B36H"){
                      count = count + Int(1)
                    }
                  }
                  
                  return count
              }
              
              return -1
        }
    `;
}

const flovatarNakedCode = (guildInfo) => {
    return `
        import Flovatar from 0x921ea449dffec68a
        
        pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
              var count: Int = 0;
              let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
              for flovatar in flovatarsData {
                let str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
                if(str == "C121"){
                  count = count + Int(1)
                }
              }
              
              return count
            }
            
            return -1
        }
    `;
}

const flovatarUndeadCode = (guildInfo) => {
    return `
        import Flovatar from 0x921ea449dffec68a
        
        pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
              var count: Int = 0;
              let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
              
              for flovatar in flovatarsData {
                let str = flovatar.metadata.combination.slice(from: 0, upTo: 4)
                if(str == "B40H" || str == "B41H" || str == "B42H" || str == "B72H"){
                  count = count + Int(1)
                }
              }
              
              return count
            }
            
            return -1
        }
    `;
}

const flovatarPowerCode = (guildInfo) => {
    return `
        import Flovatar from 0x921ea449dffec68a
        
        pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
              var count: Int = 0;
              let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
              
              for flovatar in flovatarsData {
                let str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
                if(str == "C127" || str == "C128" || str == "C129" || str == "C130" || str == "C131" || str == "C132"){
                  count = count + Int(1)
                }
              }
              
              return count
          }
          
          return -1
        }
    `;
}

const flovatarStarbattleCode = (guildInfo) => {
    return `
        import Flovatar from 0x921ea449dffec68a
        
        pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
              var count: Int = 0;
              let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
              
              for flovatar in flovatarsData {
                  let str = flovatar.metadata.combination.slice(from: 0, upTo: 4)
                  let str2 = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
                if(str == "B66H" || str2 == "C166" || str2 == "C167" || str2 == "C168"){
                  count = count + Int(1)
                }
              }
              
              return count
            }
            
            return -1
        }
    `;
}

const dropchasePartnerCode = (guildInfo) => {
    return `
        import Dropchase from 0x328670be4971a064

            pub fun main(account: Address): Int {
                let acct = getAccount(account)
                var partnernum: Int = 0
                let collectionRef = acct.getCapability(/public/DropchaseItemCollection).borrow<&{Dropchase.ItemCollectionPublic}>()!
                let allIds = collectionRef.getIDs()
    
                var a: Int = 0
                while a < allIds.length {
                    let token = collectionRef.borrowItem(id: allIds[a])  
                    ?? panic("Could not borrow a reference to the specified item")   
                    let data = token.data
                    let metadata = Dropchase.getStatMetaDataByField(statID: data.statID, field: "Partner") 
                    if (metadata == "true") {
                        partnernum = partnernum + 1
                    }
                    a = a + 1
                }
                return partnernum
            }
    `
}

const holdingScripts = {
    nft: nftCode,
    ft: ftCode,
    find: findCode,
    geniacemetalmaneki: geniacemetalmanekiCode,
    flovatar: flovatarCode,
    flovatarape: flovatarApeCode,
    flovatardevil: flovatarDevilCode,
    flovatarflotrotter: flovatarFlotrotterCode,
    flovatardroid: flovatarDroidCode,
    flovatarracer: flovatarRacerCode,
    flovatarcat: flovatarCatCode,
    flovatarnaked: flovatarNakedCode,
    flovatarundead: flovatarUndeadCode,
    flovatarpower: flovatarPowerCode,
    flovatarstarbattle: flovatarStarbattleCode,
    dropchasepartner: dropchasePartnerCode
}

module.exports = {
    holdingScripts
}