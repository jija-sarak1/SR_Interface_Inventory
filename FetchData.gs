function fetchParentData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const apiUrl = "https://www.boredapi.com/api/activity";
  const response = UrlFetchApp.fetch(apiUrl);
  const data = JSON.parse(response.getContentText());
  sheet.getSheetByName('parent').getRange('A2:G').clear();
  sheet.getSheetByName('parent').getRange(2,1,data.length, data[1].length).setValues(data);
  fetchLevelChangeData();
  fetchTestData();
}

function fetchLevelChangeData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";
  const response = UrlFetchApp.fetch(apiUrl);
  const data = JSON.parse(response.getContentText());
  sheet.getSheetByName('level').getRange('A2:G').clear();
  sheet.getSheetByName('level').getRange(2,1,data.length, data[1].length).setValues(data);
}

function fetchTestData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";
  const response = UrlFetchApp.fetch(apiUrl);
  const data = JSON.parse(response.getContentText());
  sheet.getSheetByName('test').getRange('A2:G').clear();    
  sheet.getSheetByName('test').getRange(2,1,data.length, data[1].length).setValues(data);
}
