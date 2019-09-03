/**
 * This function will look for all Google Groups prefixed with 'grptest_' and then delete them
 */
function deleteGroups_() {
  var grpPrefix = "grptest_";
  var query = "email:" + grpPrefix + "*";
  var grpArr = [];
  var page;
  var pageToken;
  do {
    page = AdminDirectory.Groups.list({
      customer: "my_customer",
      query: query,
      fields: "groups(email),nextPageToken"
    });
    var groups = page.groups;
    if (groups) {
      for (let index = 0; index < groups.length; index++) {
        var group = groups[index];
        var groupAddress = group.email;
        grpArr.push(groupAddress);
      }
    }
  } while (pageToken);
  grpArr.forEach(grp => {
    Logger.log("Deleting group: %s", grp);
    var response = AdminDirectory.Groups.remove(grp);
  });
}
