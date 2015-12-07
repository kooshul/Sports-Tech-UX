// Excel Question List URL:
// Excel DB URL: https://docs.google.com/spreadsheets/d/1h7cYRNroMJWTO6BAJrObWMtaldcNCjHaq6M4eu7Y_Oo/edit#gid=0&vpid=A1
// Check out BlockSpring

function createForm(db_url) {
  
  var question_list = SpreadsheetApp.openByUrl(db_url).getSheets()[0];
  var form = FormApp.create("Sports Technologies UX Survey");
  
  
  
}
