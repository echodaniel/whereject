function zendeskMail() {
  var delayMinutes = 1; // Number of minutes before messages are sent to Archive
  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate()-delayMinutes);
  var label = GmailApp.getUserLabelByName("Send To Zendesk Test Script");
  // Thread IDs can be found in the URL, ie mail.google.com/mail/u/0/#search/failed+call/{ThreadIDhere}
 var firstThread = GmailApp.getInboxThreads(0,1)[0];
 // Get the same thread by ID
 var threadById = GmailApp.getThreadById(firstThread.getId());
  // Verify they're the same
 Logger.log(firstThread.getFirstMessageSubject() == threadById.getFirstMessageSubject());
  for (var i = 0; i < threads.length; i++) {
    if (threads[i].getLastMessageDate()<maxDate)
      {
        threads[i].moveToArchive();
      }
  }
}
