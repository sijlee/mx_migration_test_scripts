/**
 * Used to check if the date that the script is running is the date we are doing our prep on.
 * If not, it will throw an error message
 */
function dateCheck_() {
  var today = new Date();
  var date = today.toJSON().slice(0, 10);
  var nDate =
    date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(nDate);
  if (!sheet) {
    throw "Not scheduled for today";
  } else {
    return sheet;
  }
}
