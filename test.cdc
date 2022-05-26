import EmeraldIdentity from "./contracts/EmeraldIdentity.cdc"
import EmeraldIdentityDapper from "./contracts/EmeraldIdentityDapper.cdc"

pub fun main(discordID: String): {String: Address?}? {
  var ids: {String: Address?} = {}
  ids["blocto"] = EmeraldIdentity.getAccountFromDiscord(discordID: discordID)
  ids["dapper"] = EmeraldIdentityDapper.getAccountFromDiscord(discordID: discordID)

  if (ids["blocto"] != nil || ids["dapper"] != nil) {
    return ids
  }
  return nil
}