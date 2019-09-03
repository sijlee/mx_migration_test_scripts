/**
 * Used to create the test accounts for each domain.
 * Accounts created are all: mxtest@domain.tld (so mxtest@itv.com for example)
 * This script then assigns an Enterprise Licenses, adds the newly created test account
 * to the 'control' group (mxtestgroup@itv.com) and creates groups for that TLD
 */
function createUsers_() {
  var sheet = dateCheck_();
  var values = sheet.getDataRange().getDisplayValues();
  for (i = 1; i < values.length; i++) {
    var fName = values[i][0];
    var lName = values[i][1];
    var email = values[i][2];
    var password = values[i][3];
    var user;
    try {
      user = AdminDirectory.Users.get(email);
    } catch (e) {
      user = AdminDirectory.Users.insert({
        primaryEmail: email,
        password: password,
        orgUnitPath: "/Users/Generic Accounts",
        name: {
          familyName: lName,
          givenName: fName
        }
      });
      assignLicense_(email);
      addToGroup_(email);
      createGrps_(email);
    }
  }
}
