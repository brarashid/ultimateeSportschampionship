/**
 * Ultimate eSports Championship — Google Apps Script
 *
 * IMPORTANT — You must update the Apps Script with this new version:
 * 1. Go to your Google Sheet → Extensions → Apps Script
 * 2. Delete ALL existing code
 * 3. Paste the entire contents of this file
 * 4. Save (Ctrl+S)
 * 5. Click Deploy → New Deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Authorize all permissions when prompted
 * 7. Copy the new URL and paste it into main.js as GAS_URL
 */

const NOTIFY_EMAIL = 'boyefioabdulrashid60@gmail.com';

function doPost(e) {
  try {
    const d = e.parameter; // reads hidden form fields submitted by the browser

    if (d.formType === 'registration') {
      saveRegistration(d);
      sendRegistrationEmail(d);
    } else if (d.formType === 'contact') {
      saveContactMessage(d);
      sendContactEmail(d);
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
    const header = sheet.getRange(1, 1, 1, 7);
    sheet.appendRow(['Timestamp', 'Player / Team Name', 'Game', 'Email', 'Phone', 'Location', 'Participation Type']);
    header.setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffd700');
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
    const header = sheet.getRange(1, 1, 1, 5);
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
    header.setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffd700');
    sheet.setFrozenRows(1);
  }

  const timestamp = new Date().toLocaleString('en-GH', { timeZone: 'Africa/Accra' });
  sheet.appendRow([timestamp, d.name, d.email, d.subject || '(no subject)', d.message]);
}

function sendRegistrationEmail(d) {
  const gameLabels = { fifa: 'FC26', cod: 'Call of Duty', fortnite: 'Fortnite', mk: 'Mortal Kombat' };
  const gameName = gameLabels[d.game] || d.game;
  const timestamp = new Date().toLocaleString('en-GH', { timeZone: 'Africa/Accra' });

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: '[UEC 2026] New Registration: ' + d.name + ' — ' + gameName,
    htmlBody:
      '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d0d1a;color:#e0e0e0;border-radius:8px;overflow:hidden;">' +
        '<div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:24px;text-align:center;border-bottom:2px solid #ffd700;">' +
          '<h1 style="color:#ffd700;margin:0;font-size:22px;letter-spacing:2px;">ULTIMATE eSPORTS CHAMPIONSHIP</h1>' +
          '<p style="color:#a0a0b0;margin:8px 0 0;font-size:13px;">New Player Registration</p>' +
        '</div>' +
        '<div style="padding:28px;">' +
          '<table style="width:100%;border-collapse:collapse;">' +
            '<tr><td style="padding:10px 0;color:#a0a0b0;width:40%;">Player / Team Name</td><td style="padding:10px 0;color:#fff;font-weight:bold;">' + d.name + '</td></tr>' +
            '<tr style="background:rgba(255,255,255,0.03);"><td style="padding:10px 8px;color:#a0a0b0;">Game</td><td style="padding:10px 8px;color:#ffd700;font-weight:bold;">' + gameName + '</td></tr>' +
            '<tr><td style="padding:10px 0;color:#a0a0b0;">Email</td><td style="padding:10px 0;color:#00d4ff;">' + d.email + '</td></tr>' +
            '<tr style="background:rgba(255,255,255,0.03);"><td style="padding:10px 8px;color:#a0a0b0;">Phone</td><td style="padding:10px 8px;color:#fff;">' + d.phone + '</td></tr>' +
            '<tr><td style="padding:10px 0;color:#a0a0b0;">Location</td><td style="padding:10px 0;color:#fff;">' + d.location + '</td></tr>' +
            '<tr style="background:rgba(255,255,255,0.03);"><td style="padding:10px 8px;color:#a0a0b0;">Participation Type</td><td style="padding:10px 8px;color:#fff;">' + d.participationType + '</td></tr>' +
            '<tr><td style="padding:10px 0;color:#a0a0b0;">Submitted At</td><td style="padding:10px 0;color:#a0a0b0;font-size:13px;">' + timestamp + '</td></tr>' +
          '</table>' +
        '</div>' +
        '<div style="background:#111;padding:16px;text-align:center;font-size:12px;color:#555;">UEC 2026 — POWERPLAY INTERNATIONAL, East Legon, Accra, Ghana</div>' +
      '</div>'
  });
}

function sendContactEmail(d) {
  const timestamp = new Date().toLocaleString('en-GH', { timeZone: 'Africa/Accra' });

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: '[UEC 2026] Contact: ' + (d.subject || 'No Subject') + ' — from ' + d.name,
    htmlBody:
      '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d0d1a;color:#e0e0e0;border-radius:8px;overflow:hidden;">' +
        '<div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:24px;text-align:center;border-bottom:2px solid #00d4ff;">' +
          '<h1 style="color:#00d4ff;margin:0;font-size:22px;letter-spacing:2px;">ULTIMATE eSPORTS CHAMPIONSHIP</h1>' +
          '<p style="color:#a0a0b0;margin:8px 0 0;font-size:13px;">New Contact Message</p>' +
        '</div>' +
        '<div style="padding:28px;">' +
          '<table style="width:100%;border-collapse:collapse;">' +
            '<tr><td style="padding:10px 0;color:#a0a0b0;width:30%;">From</td><td style="padding:10px 0;color:#fff;font-weight:bold;">' + d.name + '</td></tr>' +
            '<tr style="background:rgba(255,255,255,0.03);"><td style="padding:10px 8px;color:#a0a0b0;">Email</td><td style="padding:10px 8px;color:#00d4ff;">' + d.email + '</td></tr>' +
            '<tr><td style="padding:10px 0;color:#a0a0b0;">Subject</td><td style="padding:10px 0;color:#ffd700;font-weight:bold;">' + (d.subject || '(no subject)') + '</td></tr>' +
            '<tr><td style="padding:10px 0;color:#a0a0b0;">Submitted At</td><td style="padding:10px 0;color:#a0a0b0;font-size:13px;">' + timestamp + '</td></tr>' +
          '</table>' +
          '<div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.05);border-left:3px solid #00d4ff;border-radius:4px;">' +
            '<p style="margin:0;color:#a0a0b0;font-size:12px;margin-bottom:8px;">MESSAGE</p>' +
            '<p style="margin:0;color:#fff;line-height:1.7;">' + d.message.replace(/\n/g, '<br>') + '</p>' +
          '</div>' +
        '</div>' +
        '<div style="background:#111;padding:16px;text-align:center;font-size:12px;color:#555;">UEC 2026 — POWERPLAY INTERNATIONAL, East Legon, Accra, Ghana</div>' +
      '</div>'
  });
}

// Run this once manually to trigger authorization for Gmail + Sheets
function authorizeScript() {
  SpreadsheetApp.getActiveSpreadsheet();
  MailApp.sendEmail(NOTIFY_EMAIL, 'UEC Apps Script Authorized', 'Your Google Apps Script is now authorized and ready to receive form submissions.');
}
