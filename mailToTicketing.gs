function zendeskMail() {
  var label = 'Send To Zendesk';
  var recipient = 'help@echoitconsult.com';
  var interval = 10;          //  script runs (forwards emails) every 10 minutes
  var date = new Date();
  var timeFrom = Math.floor(date.valueOf()/1000) - 60 * interval;
  var threads = GmailApp.search('label:' + label + ' after:' + timeFrom);
  for (var i = 0; i < threads.length; i++) {
  var messages = threads[i].getMessages();
  messages[messages.length - 1].forward(recipient);  // the last message in the thread
  }
}

function autoArchive() {
// Number of minutes before messages are sent to Archive
  var delayMinutes = 2;
// Time filter. maxDate is the maximum time allowed to pass before delayMinutes goes into effect.
  var maxDate = new Date();
// new Date grabs today's current date to measure for the time condition.
  maxDate.setDate(maxDate.getDate()-delayMinutes);
// This is the label that the script will look for.
  var label = GmailApp.getUserLabelByName("Send To Zendesk");
// Thread IDs can be found in the URL, ie mail.google.com/mail/u/0/#search/failed+call/{ThreadIDhere}
  var firstThread = GmailApp.getInboxThreads(0,1)[0];
// Get the same thread by ID
  var threadById = GmailApp.getThreadById(firstThread.getId());
// Verify they're the same
  Logger.log(firstThread.getFirstMessageSubject() == threadById.getFirstMessageSubject());
// Get only those with more than 2 emails in thread
  var threads = GmailApp.getInboxThreads();
  Utilities.sleep(1000); // Pause in the loop for 1 second to avoid 'service invoked too many
                         // times' error. Maybe?
  for (var i = 1; i < threads.length; i++) {
    if (threads[i].getLastMessageDate()<maxDate)
      {
        threads[i].moveToArchive();
      }
  }
}
