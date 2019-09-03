/**
 * This function is called  from the addUsersToGroup function and adds the mapped users to the newly created Google Group
 * @param userEmail The email address for the test account created in createUsers_
 * @param groupEmail The email address for the Google Group created in createGroups_
 */
function doAddGoogleGroupMember_(userEmail, groupEmail) {
  var member = {
    email: userEmail,
    role: "MEMBER"
  };
  try {
    retryHandler_(function() {
      AdminDirectory.Members.insert(member, groupEmail);
    });
    Logger.log("User: %s has been added to group: %s", member, groupEmail);
  } catch (error) {
    if (error.message == "Member already exists.") {
      Logger.log("User %s is already in the group %s", userEmail, groupEmail);
    } else {
      Logger.log(
        "Got some other error adding %s to %s: " + error.message,
        userEmail,
        groupEmail
      );
    }
  }
}
