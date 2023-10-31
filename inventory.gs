function inventory() {
  const app = SpreadsheetApp.getActiveSpreadsheet();
  let enrolled_student = app.getSheetByName('parent').getRange('A2:G').getValues();
  enrolled_student = enrolled_student.filter(row => row.some(cell => cell !== ''));

  let test_data = app.getSheetByName('test').getRange('A2:G').getValues();
  test_data = test_data.filter(row => row.some(cell => cell !== ''));

  let level_change = app.getSheetByName('level').getRange('A2:G').getValues();
  level_change = level_change.filter(row => row.some(cell => cell !== ''));

  let resale = app.getSheetByName('inventory').getRange('A2:F').getValues();
  resale = resale.filter(row => row.some(cell => cell !== ''));

  const today_date = new Date();
  today_date.setMonth(today_date.getMonth() - 1);
  let todayDate = today_date.toISOString().split('T')[0];  

  var targetSheet = app.getSheetByName('inventory').copyTo(app);

  // Rename the copy with today's date
  targetSheet.setName(todayDate);

  const data = []
  for(let i = 0; i < enrolled_student.length; i++){
    let grade = enrolled_student[i][1][enrolled_student[i][1].length - 1];
    if(grade <= 3){
      grade = grade == 1? grade + "st": grade == 2? grade+ "nd" : grade+"rd";
    }else{
      grade = grade + "th"
    }
    let record = [grade, enrolled_student[i][2], enrolled_student[i][0],enrolled_student[i][3], "Resale", enrolled_student[i][5]]
    if(new Date(todayDate) < new Date(enrolled_student[i][6])){
      record[4] = "New Enrolled"
    }
    for(let j = 0; j < level_change.length; j++){
      if (enrolled_student[i][0] == level_change[j][3]){
        if( level_change[j][5] == "बच्चे की क्लास और वर्कशीट के लेवल में बहुत अंतर है|"){
          record[4] = "Major level change"
        }else{
          record[4] = "Minor level change"
        }
      }
    };
    for(let k = 0; k < test_data.length; k++){
      if(test_data[k][1] == enrolled_student[i][0]){
        if(record[4] == "Resale"){
          record[4] = "Assessment Test"
        }
        record[5] = test_data[k][6]
      }
    }

    for (let l = 0; l < resale.length; l++){
      if(record[4] == "Resale" && resale[l][2] == enrolled_student[i][0]){
        record[5] = resale[l][5]+25
      }
    }
    data.push(record);
  }
  app.getSheetByName('inventory').getRange('A2:F').clear();
  app.getSheetByName('inventory').getRange(2,1,data.length, data[1].length).setValues(data);
  
}
