/**
 * This function adds the newly created test account to the 'control' group.
 * The control group allows the accounts to not be enforced in 2SV
 * @param userEmail The email address for the test account created in createUsers_
 */
function addToGroup_(userEmail) {
  var groupEmail = "mxtestgroup@itv.com";
  var member = {
    email: userEmail,
    role: "OWNER"
  };
  member = AdminDirectory.Members.insert(member, groupEmail);
  Logger.log("User %s added as a member of group %s.", userEmail, groupEmail);
}
