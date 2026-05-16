/**
 * Ultimate eSports Championship — Google Apps Script
 *
 * HOW TO SET UP:
 * 1. Go to https://sheets.google.com and create a new spreadsheet.
 *    Name it "UEC 2026 Submissions" (or anything you like).
 * 2. In the spreadsheet, click Extensions → Apps Script.
 * 3. Delete all existing code and paste the entire contents of this file.
 * 4. Click Save (Ctrl+S), then click Deploy → New Deployment.
 * 5. Set type to "Web app".
 * 6. Set "Execute as" → Me.
 * 7. Set "Who has access" → Anyone.
 * 8. Click Deploy and copy the Web App URL.
 * 9. In main.js, replace BOTH placeholder values:
 *      REGISTRATION_SCRIPT_URL = 'paste-your-url-here'
 *      CONTACT_SCRIPT_URL      = 'paste-your-url-here'   ← same URL
 * 10. Done! Test by submitting a form on your site.
 *
 * The script automatically creates two sheets:
 *   • "Registrations"    — all player/team sign-ups
 *   • "Contact Messages" — all contact form messages
 * You will receive an email notification for every submission.
 */

// ─── Change this to the email that should receive notifications ───
const NOTIFY_EMAIL = 'boyefioabdulrashid60@gmail.com';

// ─── Entry point called by Google on every form POST ──────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date().toLocaleString('en-GH', { timeZone: 'Africa/Accra' });

    if (data.type === 'registration') {
      saveRegistration(data, timestamp);
      sendRegistrationEmail(data, timestamp);
    } else if (data.type === 'contact') {
      saveContactMessage(data, timestamp);
      sendContactEmail(data, timestamp);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── Save registration to the "Registrations" sheet ───────────────
function saveRegistration(data, timestamp) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Registrations');

  if (!sheet) {
    sheet = ss.insertSheet('Registrations');
    sheet.appendRow([
      'Timestamp', 'Player / Team Name', 'Game', 'Email',
      'Phone', 'Location', 'Participation Type'
    ]);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffd700');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    timestamp,
    data.name,
    data.game,
    data.email,
    data.phone,
    data.location,
    data.participationType
  ]);
}

// ─── Save contact message to the "Contact Messages" sheet ─────────
function saveContactMessage(data, timestamp) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Contact Messages');

  if (!sheet) {
    sheet = ss.insertSheet('Contact Messages');
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffd700');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    timestamp,
    data.name,
    data.email,
    data.subject || '(no subject)',
    data.message
  ]);
}

// ─── Email notification for new registration ──────────────────────
function sendRegistrationEmail(data, timestamp) {
  const gameLabels = {
    fifa: 'FC26', cod: 'Call of Duty', fortnite: 'Fortnite', mk: 'Mortal Kombat'
  };
  const gameName = gameLabels[data.game] || data.game;

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: `[UEC 2026] New Registration: ${data.name} — ${gameName}`,
    htmlBody: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d0d1a;color:#e0e0e0;border-radius:8px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:24px;text-align:center;border-bottom:2px solid #ffd700;">
          <h1 style="color:#ffd700;margin:0;font-size:22px;letter-spacing:2px;">ULTIMATE eSPORTS CHAMPIONSHIP</h1>
          <p style="color:#a0a0b0;margin:8px 0 0;font-size:13px;">New Player Registration</p>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;color:#a0a0b0;width:40%;">Player / Team Name</td><td style="padding:10px 0;color:#ffffff;font-weight:bold;">${data.name}</td></tr>
            <tr style="background:rgba(255,255,255,0.03);"><td style="padding:10px 8px;color:#a0a0b0;">Game</td><td style="padding:10px 8px;color:#ffd700;font-weight:bold;">${gameName}</td></tr>
            <tr><td style="padding:10px 0;color:#a0a0b0;">Email</td><td style="padding:10px 0;color:#00d4ff;">${data.email}</td></tr>
            <tr style="background:rgba(255,255,255,0.03);"><td style="padding:10px 8px;color:#a0a0b0;">Phone</td><td style="padding:10px 8px;color:#ffffff;">${data.phone}</td></tr>
            <tr><td style="padding:10px 0;color:#a0a0b0;">Location</td><td style="padding:10px 0;color:#ffffff;">${data.location}</td></tr>
            <tr style="background:rgba(255,255,255,0.03);"><td style="padding:10px 8px;color:#a0a0b0;">Participation Type</td><td style="padding:10px 8px;color:#ffffff;">${data.participationType}</td></tr>
            <tr><td style="padding:10px 0;color:#a0a0b0;">Submitted At</td><td style="padding:10px 0;color:#a0a0b0;font-size:13px;">${timestamp}</td></tr>
          </table>
        </div>
        <div style="background:#111;padding:16px;text-align:center;font-size:12px;color:#555;">
          UEC 2026 — POWERPLAY INTERNATIONAL, East Legon, Accra, Ghana
        </div>
      </div>
    `
  });
}

// ─── Email notification for new contact message ───────────────────
function sendContactEmail(data, timestamp) {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: `[UEC 2026] Contact Form: ${data.subject || 'No Subject'} — from ${data.name}`,
    htmlBody: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d0d1a;color:#e0e0e0;border-radius:8px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:24px;text-align:center;border-bottom:2px solid #00d4ff;">
          <h1 style="color:#00d4ff;margin:0;font-size:22px;letter-spacing:2px;">ULTIMATE eSPORTS CHAMPIONSHIP</h1>
          <p style="color:#a0a0b0;margin:8px 0 0;font-size:13px;">New Contact Form Message</p>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;color:#a0a0b0;width:30%;">From</td><td style="padding:10px 0;color:#ffffff;font-weight:bold;">${data.name}</td></tr>
            <tr style="background:rgba(255,255,255,0.03);"><td style="padding:10px 8px;color:#a0a0b0;">Email</td><td style="padding:10px 8px;color:#00d4ff;">${data.email}</td></tr>
            <tr><td style="padding:10px 0;color:#a0a0b0;">Subject</td><td style="padding:10px 0;color:#ffd700;font-weight:bold;">${data.subject || '(no subject)'}</td></tr>
            <tr><td style="padding:10px 0;color:#a0a0b0;">Submitted At</td><td style="padding:10px 0;color:#a0a0b0;font-size:13px;">${timestamp}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.05);border-left:3px solid #00d4ff;border-radius:4px;">
            <p style="margin:0;color:#a0a0b0;font-size:12px;margin-bottom:8px;">MESSAGE</p>
            <p style="margin:0;color:#ffffff;line-height:1.7;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        <div style="background:#111;padding:16px;text-align:center;font-size:12px;color:#555;">
          UEC 2026 — POWERPLAY INTERNATIONAL, East Legon, Accra, Ghana
        </div>
      </div>
    `
  });
}
