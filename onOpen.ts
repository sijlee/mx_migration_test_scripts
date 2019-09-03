/**
 * Creates the 'Automation Menu' within the Spreadsheet
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Automation Menu")
    .addItem("Create Test Accounts", "createUsers_")
    .addSeparator()
    .addItem("Delete Test Accounts", "deleteAccounts_")
    .addItem("Delete Test Groups", "deleteGroups_")
    .addToUi();
}
