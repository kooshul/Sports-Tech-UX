function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
            .setSandboxMode(HtmlService.SandboxMode.NATIVE);
};

function updateForm() {
  var questions = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1h7cYRNroMJWTO6BAJrObWMtaldcNCjHaq6M4eu7Y_Oo/');  
  var responses = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1tNwfGnsQkrBv3jafxJqLjAWYpdnGuw4V4vguWFy7Bm4/');  
  var form = FormApp.openByUrl('https://docs.google.com/forms/d/13UH2Io16wM6Kl87FY4KqG-xOwyt9fRa8JS4oYtRImNc/');
  
  // Clear the form
  var items = form.getItems();
  for(var index = 0, len = items.length; index < len; index++) {
    form.deleteItem(items[index]);
  }
    
  // Set up the form using the input spreadsheet
  var values = questions.getSheets()[0].getSheetValues(1, 1, -1, -1);
  
  index = 0;
  while(values[index+1][0] !== "") {
    index++;
    
    var required = (values[index][2].toUpperCase() === "Y" || values[index][2].toUpperCase() === "YES" || values[index][2].toUpperCase() === "REQUIRED") ? true : false;
    var item;
    switch(values[index][1]) {
      case "MC":
        item = form.addMultipleChoiceItem();
        item.setChoiceValues(values[index][3].split(", "));
        item.setTitle(values[index][0]);
        item.setRequired(required);
        break;
      case "List":
        item = form.addListItem();
        item.setChoiceValues(values[index][3].split(", "));
        item.setTitle(values[index][0]);
        item.setRequired(required);
        break;
      case "Checkbox":
        item = form.addCheckboxItem();
        item.setChoiceValues(values[index][3].split(", "));
        item.setTitle(values[index][0]);
        item.setRequired(required);
        break;
      case "Scale":
        item = form.addScaleItem();
        bounds_labels = values[index][3].split(", ");
        item.setBounds(bounds_labels[0], bounds_labels[1]);
        item.setLabels(bounds_labels[2], bounds_labels[3]);
        item.setTitle(values[index][0]);
        item.setRequired(required);
        break;
      case "Text":
        item = form.addTextItem();
        item.setTitle(values[index][0]);
        item.setRequired(required);
        break;
      case "Paragraph Text":
        item = form.addParagraphTextItem();
        item.setTitle(values[index][0]);
        item.setRequired(required);
        Logger.log(item.getType());
        break;
    }    
  }
  form.setProgressBar(false);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, responses.getId());
};

// Delete all previous DB Response Spreadsheets + UX Survey forms + enclosing folders from the Drive root
function deletePrevs() {
  var prevs = DriveApp.getFilesByName("DB Responses");
  var current_file;
  while (prevs.hasNext()) {
    current_file = prevs.next();
    DriveApp.removeFile(current_file);
  }
  prevs = DriveApp.getFilesByName("Sports Technologies UX Survey");
  while (prevs.hasNext()) {
    current_file = prevs.next();
    DriveApp.removeFile(current_file);
  }
  prevs = DriveApp.getFoldersByName("Sports Technologies UX Survey");
  while (prevs.hasNext()) {
    current_file = prevs.next();
    DriveApp.removeFile(current_file);
  }
};

// Reset response Spreadsheet
function clearResponses() {
  var responses = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/161oiZG9M5-Cnd5aCrafLg5bajPeru0lar70L0qPoScI/');
  for(var index = 0; index < responses.getNumSheets(); index++)
    responses.deleteSheet(responses.getSheets()[index]);
};

// Excel Question List URL: https://docs.google.com/spreadsheets/d/1h7cYRNroMJWTO6BAJrObWMtaldcNCjHaq6M4eu7Y_Oo/edit#gid=0
// Excel Response URL: https://docs.google.com/spreadsheets/d/1pU1_Yzhp4cCKURIDEx10xNDIxgXZLL3bK4kcPZFEkkk/edit#gid=0
// Check out BlockSpring
// form.addImageItem().setImage(UrlFetchApp.fetch('http://i.imgur.com/mWW4vDJ.gif'));
