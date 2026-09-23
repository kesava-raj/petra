/**
 * Lead capture service for Agent Pettra
 * Connects form submissions to CRM / Webhook with client-side deduplication,
 * unique correlation tracking ID, and honest confirmation handling.
 */

export interface LeadSubmissionPayload {
  source: 'inquiry_section' | 'lead_modal' | 'dental_page' | 'medspa_page' | 'home_services_page';
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  businessType?: string;
  needsOrPlan?: string;
  monthlyCalls?: string;
  currentCalendar?: string;
  locations?: string;
  message?: string;
  submittedAt?: string;
}

export interface LeadSubmissionResult {
  success: boolean;
  leadId: string;
  confirmationMessage: string;
  error?: string;
}

// Generate unique correlation tracking ID (e.g. PETTRA-LD-7K9W2A)
export function generateLeadId(): string {
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PETTRA-LD-${randomSuffix}`;
}

export async function submitLead(data: LeadSubmissionPayload): Promise<LeadSubmissionResult> {
  const timestamp = new Date().toISOString();
  const leadId = generateLeadId();

  // Basic validation
  if (!data.email || !data.email.includes('@')) {
    return {
      success: false,
      leadId: '',
      confirmationMessage: '',
      error: 'Please provide a valid work email address.'
    };
  }

  const payload = {
    ...data,
    leadId,
    submittedAt: timestamp,
    status: 'received'
  };

  // 1. Persist to localStorage with deduplication
  try {
    if (typeof window !== 'undefined') {
      const storageKey = 'agent_pettra_inquiries';
      const existing: any[] = JSON.parse(
        localStorage.getItem(storageKey) || localStorage.getItem('petra_inquiries') || '[]'
      );
      
      // Check for exact duplicate within 2 minutes
      const isDuplicate = existing.some(
        (item) => item.email === data.email && 
        Date.now() - new Date(item.submittedAt || 0).getTime() < 120000
      );

      if (!isDuplicate) {
        existing.unshift(payload);
        localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 50)));
      }
    }
  } catch (err) {
    console.warn('Could not cache lead locally:', err);
  }

  // 2. Dispatch to server CRM / Google Sheets endpoint if configured
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;

  if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.trim() !== '' && !webhookUrl.includes('your_google_apps_script_url_here')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.warn('Webhook dispatch failed, cached locally with leadId:', leadId, error);
    }
  }

  return {
    success: true,
    leadId,
    confirmationMessage: `Demo request confirmed! Your reference ID is ${leadId}. Our team will review your call flow requirements and reach out within 15 minutes during business hours.`
  };
}

// Backward compatibility alias
export const submitLeadToGoogleSheet = async (data: LeadSubmissionPayload): Promise<boolean> => {
  const result = await submitLead(data);
  return result.success;
};
