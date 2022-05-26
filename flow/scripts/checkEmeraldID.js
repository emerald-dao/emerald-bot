const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const checkEmeraldID = async (discordID) => {
  try {
    const emeraldIds = await fcl.send([
      fcl.script(scriptCode1),
      fcl.args([
        fcl.arg(discordID, t.String)
      ])
    ]).then(fcl.decode);
  
    if (Object.keys(emeraldIds).length === 0) {
      return null;
    }
    return emeraldIds;
  } catch(e) {
    return null;
  }
}

const checkEmeraldIDFromAccount = async (account) => {
  try {
    const discordID = await fcl.send([
      fcl.script(scriptCode3),
      fcl.args([
        fcl.arg(account, t.Address)
      ])
    ]).then(fcl.decode);
  
    return discordID;
  } catch(e) {
    return null;
  }
}

const checkEmeraldIDBatch = async (discordIDs) => {
  try {
    const accounts = await fcl.send([
      fcl.script(scriptCode2),
      fcl.args([
        fcl.arg(discordIDs, t.Array(t.String))
      ])
    ]).then(fcl.decode);
  
    return accounts;
  } catch(e) {
    return null;
  }
}

const scriptCode1 = `
import EmeraldIdentity from 0xEmeraldIdentity
import EmeraldIdentityDapper from 0xEmeraldIdentity

pub fun main(discordID: String): {String: Address} {
  var ids: {String: Address} = {}
  if let bloctoId = EmeraldIdentity.getAccountFromDiscord(discordID: discordID) {
    ids["blocto"] = bloctoId
  }
  if let dapperId = EmeraldIdentityDapper.getAccountFromDiscord(discordID: discordID) {
    ids["dapper"] = dapperId
  }

  return ids
}
`;

const scriptCode2 = `
import EmeraldIdentity from 0xEmeraldIdentity

pub fun main(discordIDs: [String]): {String: Address?} {
  let answer: {String: Address?} = {}
  for discordID in discordIDs {
    answer[discordID] = EmeraldIdentity.getAccountFromDiscord(discordID: discordID)
  }
  return answer
}
`;

const scriptCode3 = `
import EmeraldIdentity from 0xEmeraldIdentity

pub fun main(account: Address): String? {
  return EmeraldIdentity.getDiscordFromAccount(account: account)
}
`;

module.exports = {
  checkEmeraldID,
  checkEmeraldIDBatch,
  checkEmeraldIDFromAccount
}