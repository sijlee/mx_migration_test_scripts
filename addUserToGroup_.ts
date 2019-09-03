/**
 * This function takes the group parameter and maps users to be added to that group
 * @param group The email address for the Google Group created in createGroups_
 */
function addUserToGroup_(group) {
  var mappingArray = {
    "simon.lee1@itv.com": group,
    "grant.currie@itv.com": group
  };
  for (var key in mappingArray) {
    if (mappingArray.hasOwnProperty(key)) {
      Logger.log("Adding %s to %s", key, mappingArray[key]);
      doAddGoogleGroupMember_(key, mappingArray[key]);
    }
  }
}
