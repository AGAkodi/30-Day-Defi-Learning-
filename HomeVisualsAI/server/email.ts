import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return {
    apiKey: connectionSettings.settings.api_key, 
    fromEmail: connectionSettings.settings.from_email
  };
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
export async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

interface SendNotesEmailParams {
  userEmail: string;
  dayNumber: number;
  lessonTitle: string;
  notes: string;
  quizScore?: number;
  totalQuestions?: number;
}

export async function sendNotesEmail(params: SendNotesEmailParams) {
  const { userEmail, dayNumber, lessonTitle, notes, quizScore, totalQuestions } = params;
  
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              line-height: 1.6;
              color: #FFFFFF;
              background-color: #000000;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 40px 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 2px solid #D4AF37;
              padding-bottom: 20px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #D4AF37;
              font-family: 'Playfair Display', serif;
            }
            .subtitle {
              color: #B8962E;
              font-size: 14px;
              margin-top: 8px;
            }
            .content {
              background-color: #1D1D1D;
              border-left: 4px solid #D4AF37;
              padding: 30px;
              border-radius: 8px;
              margin-bottom: 30px;
            }
            .day-badge {
              display: inline-block;
              background-color: #D4AF37;
              color: #000000;
              padding: 6px 12px;
              border-radius: 4px;
              font-weight: 600;
              font-size: 14px;
              margin-bottom: 16px;
            }
            .lesson-title {
              color: #D4AF37;
              font-size: 24px;
              font-weight: 700;
              margin-bottom: 20px;
            }
            .section-title {
              color: #D4AF37;
              font-size: 16px;
              font-weight: 600;
              margin-top: 24px;
              margin-bottom: 12px;
            }
            .notes {
              background-color: #0D0D0D;
              padding: 20px;
              border-radius: 6px;
              white-space: pre-wrap;
              color: #E5E5E5;
              font-size: 14px;
              line-height: 1.7;
            }
            .quiz-score {
              background-color: #8B0000;
              color: #FFFFFF;
              padding: 16px;
              border-radius: 6px;
              text-align: center;
              margin-top: 20px;
            }
            .score-number {
              font-size: 36px;
              font-weight: bold;
              color: #D4AF37;
            }
            .footer {
              text-align: center;
              padding: 30px 20px;
              border-top: 2px solid #D4AF37;
              margin-top: 40px;
            }
            .quote {
              font-family: 'Playfair Display', serif;
              font-style: italic;
              color: #D4AF37;
              font-size: 18px;
              margin-bottom: 20px;
            }
            .footer-text {
              color: #B8962E;
              font-size: 12px;
            }
            .cta-button {
              display: inline-block;
              background-color: #D4AF37;
              color: #000000;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">MONARCH</div>
              <div class="subtitle">DeFi Learning Platform</div>
            </div>

            <div class="content">
              <span class="day-badge">Day ${dayNumber}</span>
              <h1 class="lesson-title">${lessonTitle}</h1>

              <div class="section-title">Your Learning Notes</div>
              <div class="notes">${notes}</div>

              ${quizScore !== undefined && totalQuestions !== undefined ? `
                <div class="quiz-score">
                  <div>Quiz Score</div>
                  <div class="score-number">${quizScore}/${totalQuestions}</div>
                  <div>${Math.round((quizScore / totalQuestions) * 100)}% Correct</div>
                </div>
              ` : ''}
            </div>

            <div class="footer">
              <div class="quote">"To know is to be free"</div>
              <div class="footer-text">
                This is a record of your learning journey.<br>
                Keep building your DeFi knowledge, Monarch!
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
MONARCH DeFi Learning Platform
Day ${dayNumber}: ${lessonTitle}

YOUR LEARNING NOTES:
${notes}

${quizScore !== undefined && totalQuestions !== undefined ? `
QUIZ SCORE: ${quizScore}/${totalQuestions} (${Math.round((quizScore / totalQuestions) * 100)}%)
` : ''}

"To know is to be free"

---
This is a record of your learning journey.
Keep building your DeFi knowledge, Monarch!
    `.trim();

    const result = await client.emails.send({
      from: fromEmail,
      to: 'talk2monarch77@gmail.com',
      subject: `Day ${dayNumber} Learning Notes: ${lessonTitle}`,
      html: htmlContent,
      text: textContent,
    });

    console.log('Email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error - we don't want to block the user if email fails
    return { success: false, error };
  }
}
