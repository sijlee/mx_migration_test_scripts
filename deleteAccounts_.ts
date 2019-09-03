/**
 * This function will delete all of the mxtest@domain.tld email address
 * that are members of the 'control' group
 */
function deleteAccounts_() {
  var group = "mxtestgroup@itv.com";
  var pageToken;
  var page;
  var memberArr = [];
  do {
    page = AdminDirectory.Members.list(group, {
      maxResults: 500,
      pageToken: pageToken
    });
    var members = page.members;
    if (members) {
      for (let index = 0; index < members.length; index++) {
        var member = members[index];
        var memberEmail = member.email;
        memberArr.push(memberEmail);
      }
    }
  } while (pageToken);
  memberArr.forEach(user => {
    if (user != "simon.lee1@itv.com" && user != "grant.currie@itv.com") {
      Logger.log("Deleting user: %s", user);
      var response = AdminDirectory.Users.remove(user);
    }
  });
}
