/**
 * Lead capture service for Agent Pettra
 * Connects form submissions to Google Sheets and local storage fallback
 */

export interface LeadSubmissionPayload {
  source: 'inquiry_section' | 'lead_modal';
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  businessType?: string;
  needsOrPlan?: string;
  message?: string;
  submittedAt?: string;
}

export async function submitLeadToGoogleSheet(data: LeadSubmissionPayload): Promise<boolean> {
  const timestamp = new Date().toISOString();
  const payload = {
    ...data,
    submittedAt: timestamp,
  };

  // 1. Always persist to localStorage as a safety fallback
  try {
    if (typeof window !== 'undefined') {
      const storageKey = 'agent_pettra_inquiries';
      const existing = JSON.parse(localStorage.getItem(storageKey) || localStorage.getItem('petra_inquiries') || '[]');
      existing.unshift(payload);
      localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 50)));
    }
  } catch (err) {
    console.warn('Could not cache lead locally:', err);
  }

  // 2. Check for Google Sheets Webhook URL
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl || typeof webhookUrl !== 'string' || webhookUrl.trim() === '' || webhookUrl.includes('your_google_apps_script_url_here')) {
    // If not configured yet, succeed gracefully so user UX is never blocked
    console.info('Google Sheets webhook not configured yet. Set VITE_GOOGLE_SHEET_WEBHOOK_URL in .env');
    return true;
  }

  // 3. Send payload to Google Apps Script Web App
  try {
    // Note: 'no-cors' mode and 'text/plain' content-type prevent CORS preflight issues with Google Apps Script redirects
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error('Error submitting lead to Google Sheets webhook:', error);
    // Don't fail the user submission even if network fails
    return false;
  }
}
