/**
 * This script assigns an Enterprise license to the account
 * @param userId The email address for the test account created in createUsers_
 */
function assignLicense_(userId) {
  var productId = "Google-Apps";
  var skuId = "1010020020";
  var results = AdminLicenseManager.LicenseAssignments.insert(
    { userId: userId },
    productId,
    skuId
  );
  Logger.log(results);
}
