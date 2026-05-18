/**
 * Ultimate eSports Championship — Google Apps Script
 *
 * HOW TO SET UP:
 * 1. Go to your Google Sheet → Extensions → Apps Script
 * 2. Delete ALL existing code
 * 3. Paste the entire contents of this file
 * 4. Save (Ctrl+S)
 * 5. Click Deploy → Manage Deployments → Edit → New version → Deploy
 *    (or New Deployment if setting up for the first time)
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Authorize permissions when prompted (only needs Sheets, not Gmail)
 */

function doPost(e) {
  try {
    const d = e.parameter;

    if (d.formType === 'registration') {
      saveRegistration(d);
    } else if (d.formType === 'contact') {
      saveContactMessage(d);
    }

    return ContentService
      .createTextOutput('OK')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService
      .createTextOutput('Error: ' + err.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function saveRegistration(d) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Registrations');

  if (!sheet) {
    sheet = ss.insertSheet('Registrations');
    sheet.appendRow(['Timestamp', 'Player / Team Name', 'Game', 'Email', 'Phone', 'Location', 'Participation Type']);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffd700');
    sheet.setFrozenRows(1);
  }

  const timestamp = new Date().toLocaleString('en-GH', { timeZone: 'Africa/Accra' });
  sheet.appendRow([timestamp, d.name, d.game, d.email, d.phone, d.location, d.participationType]);
}

function saveContactMessage(d) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Contact Messages');

  if (!sheet) {
    sheet = ss.insertSheet('Contact Messages');
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffd700');
    sheet.setFrozenRows(1);
  }

  const timestamp = new Date().toLocaleString('en-GH', { timeZone: 'Africa/Accra' });
  sheet.appendRow([timestamp, d.name, d.email, d.subject || '(no subject)', d.message]);
}

// Run this ONCE manually to authorize Sheets access
function authorizeScript() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Auth Test') || ss.insertSheet('Auth Test');
  sheet.appendRow(['Authorization successful — ' + new Date()]);
}
