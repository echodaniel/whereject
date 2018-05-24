function zendeskMail() {
  var delayMinutes = 1; // Number of minutes before messages are sent to Archive
  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate()-delayMinutes);
  var label = GmailApp.getUserLabelByName("Send To Zendesk Test Script");
  var threads = label.getThreads();
  for (var i = 0; i < threads.length; i++) {
    if (threads[i].getLastMessageDate()<maxDate)
      {
        threads[i].moveToArchive();
      }
  }
}
