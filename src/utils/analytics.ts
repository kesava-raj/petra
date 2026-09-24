// Analytics and Meta Ads UTM attribution helper

export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export type AnalyticsEvent = 
  | 'page_view'
  | 'industry_page_view'
  | 'hero_cta_click'
  | 'demo_open'
  | 'demo_start'
  | 'demo_call_connected'
  | 'demo_permission_result'
  | 'demo_complete'
  | 'demo_error'
  | 'phone_demo_click'
  | 'pricing_view'
  | 'pricing_cta_click'
  | 'plan_selected'
  | 'roi_calculation_completed'
  | 'lead_form_start'
  | 'lead_submitted'
  | 'inline_inquiry_submitted'
  | 'email_intent_captured'
  | 'checkout_start'
  | 'subscription_started'
  | 'meeting_booked'
  | 'qualified_call';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Retrieve and persist UTM parameters in sessionStorage
export function getStoredUTMParams(): UTMParameters {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const keys: (keyof UTMParameters)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term'
  ];

  const currentParams: UTMParameters = {};
  let hasNewParams = false;

  keys.forEach((key) => {
    const val = urlParams.get(key);
    if (val) {
      currentParams[key] = val;
      hasNewParams = true;
    }
  });

  if (hasNewParams) {
    sessionStorage.setItem('agent_pettra_utm_params', JSON.stringify(currentParams));
    return currentParams;
  }

  const stored = sessionStorage.getItem('agent_pettra_utm_params') || sessionStorage.getItem('petra_utm_params');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }

  return {};
}

// Non-PII payload sanitizer to ensure compliance with Meta Advertising Standards & US State Privacy laws
const FORBIDDEN_AD_KEYS = new Set([
  'name', 'email', 'phone', 'message', 'text', 'transcript', 'patient', 'health',
  'medical', 'diagnosis', 'injury', 'condition', 'treatment', 'address', 'dob',
  'opposingparty', 'casefacts', 'notes'
]);

function sanitizeForAdNetworks(props?: Record<string, unknown>): Record<string, unknown> {
  if (!props) return {};
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    const lowerKey = key.toLowerCase();
    if (!FORBIDDEN_AD_KEYS.has(lowerKey) && typeof value !== 'function') {
      clean[key] = value;
    }
  }
  return clean;
}

// Track event with standard payload, deduplication event_id, and UTM attribution
export function trackEvent(event: AnalyticsEvent, properties?: Record<string, unknown>): void {
  const utms = getStoredUTMParams();
  const eventId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  
  const payload = {
    event,
    event_id: eventId,
    timestamp: new Date().toISOString(),
    ...utms,
    ...properties
  };

  // Log in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event: ${event}]`, payload);
  }

  // Meta Pixel (fbq) integration with sanitized parameters and deduplicated event_id
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    const sanitizedPayload = {
      event_id: eventId,
      ...sanitizeForAdNetworks(payload)
    };

    if (event === 'lead_submitted') {
      window.fbq('track', 'Lead', sanitizedPayload, { eventID: eventId });
    } else if (event === 'demo_start') {
      window.fbq('trackCustom', 'AgentPettraDemoStart', sanitizedPayload, { eventID: eventId });
    } else if (event === 'demo_complete') {
      window.fbq('trackCustom', 'AgentPettraDemoComplete', sanitizedPayload, { eventID: eventId });
    } else {
      window.fbq('trackCustom', event, sanitizedPayload, { eventID: eventId });
    }
  }

  // Google Analytics / GTM integration
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, sanitizeForAdNetworks(payload));
  }
}

