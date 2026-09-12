/**
 * Petra AI — Visitor Intelligence & Lead Attribution Engine
 * 
 * Capabilities:
 * - Persistent First-Party Cookies (_petra_vid, _petra_attr, _petra_user)
 * - First-Touch & Last-Touch Ad Tracking (utm_*, gclid, fbclid, msclkid)
 * - Device & Geolocation Hints (Timezone, Language, Screen, Device Type)
 * - URL Parameter Pre-fill (?email=..., ?name=...)
 * - Real-time Form Field Drop-off / Abandonment Capture
 * - Multi-platform Event Dispatches (Google Analytics 4, Google Tag Manager, Meta Pixel)
 */

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string; // Google Ads Click ID (for retargeting & offline conversion)
  fbclid?: string; // Meta/Facebook Click ID
  msclkid?: string; // Microsoft Ads
  referrer?: string;
  landing_page?: string;
  first_seen?: string;
}

export interface DeviceSignals {
  timezone: string;
  language: string;
  screenResolution: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  platform?: string;
}

export interface StoredLead {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  inquirySource: string; // e.g. 'hero_inline', 'roi_calculator', 'modal', 'final_cta', 'inline_section'
  estimatedRevenue?: number;
  recoveredCalls?: number;
  customerValue?: number;
  timestamp: string;
  visitorId: string;
  attribution: AttributionData;
  device: DeviceSignals;
}

// ---------------------------------------------------------------------------
// 1. First-Party Cookie Helpers
// ---------------------------------------------------------------------------
export function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      } catch {
        return c.substring(nameEQ.length, c.length);
      }
    }
  }
  return null;
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Lax`;
}

// ---------------------------------------------------------------------------
// 2. Persistent Anonymous Visitor Identifier
// ---------------------------------------------------------------------------
export function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return 'server_render';

  // Check cookie first
  let vid = getCookie('_petra_vid');
  if (!vid) {
    vid = localStorage.getItem('petra_visitor_id');
  }

  if (!vid) {
    // Generate new unique visitor ID
    const randomPart = Math.random().toString(36).substring(2, 12);
    const timePart = Date.now().toString(36);
    vid = `petra_v1_${timePart}_${randomPart}`;
    
    setCookie('_petra_vid', vid, 365);
    localStorage.setItem('petra_visitor_id', vid);
  } else {
    // Refresh cookie expiration
    setCookie('_petra_vid', vid, 365);
  }

  return vid;
}

// ---------------------------------------------------------------------------
// 3. Attribution & Ad Tracking Extraction
// ---------------------------------------------------------------------------
export function initVisitorAttribution(): AttributionData {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const currentAttribution: AttributionData = {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    gclid: urlParams.get('gclid') || undefined,
    fbclid: urlParams.get('fbclid') || undefined,
    msclkid: urlParams.get('msclkid') || undefined,
    referrer: document.referrer || undefined,
    landing_page: window.location.href,
    first_seen: new Date().toISOString()
  };

  // Has any ad parameter?
  const hasNewSignals = Boolean(
    currentAttribution.utm_source ||
    currentAttribution.gclid ||
    currentAttribution.fbclid ||
    currentAttribution.msclkid
  );

  const storedCookie = getCookie('_petra_attr');
  let existingAttr: AttributionData = {};

  if (storedCookie) {
    try {
      existingAttr = JSON.parse(storedCookie);
    } catch {
      existingAttr = {};
    }
  }

  // Merge: Keep first_seen and original source if not explicitly superseded
  const merged: AttributionData = {
    first_seen: existingAttr.first_seen || currentAttribution.first_seen,
    utm_source: hasNewSignals ? currentAttribution.utm_source : (existingAttr.utm_source || currentAttribution.utm_source),
    utm_medium: hasNewSignals ? currentAttribution.utm_medium : (existingAttr.utm_medium || currentAttribution.utm_medium),
    utm_campaign: hasNewSignals ? currentAttribution.utm_campaign : (existingAttr.utm_campaign || currentAttribution.utm_campaign),
    utm_content: hasNewSignals ? currentAttribution.utm_content : (existingAttr.utm_content || currentAttribution.utm_content),
    utm_term: hasNewSignals ? currentAttribution.utm_term : (existingAttr.utm_term || currentAttribution.utm_term),
    gclid: currentAttribution.gclid || existingAttr.gclid,
    fbclid: currentAttribution.fbclid || existingAttr.fbclid,
    msclkid: currentAttribution.msclkid || existingAttr.msclkid,
    referrer: existingAttr.referrer || currentAttribution.referrer,
    landing_page: existingAttr.landing_page || currentAttribution.landing_page
  };

  setCookie('_petra_attr', JSON.stringify(merged), 90);
  try {
    localStorage.setItem('petra_attribution', JSON.stringify(merged));
  } catch {
    // Storage quota fallback
  }

  return merged;
}

// ---------------------------------------------------------------------------
// 4. Device & Geo Hints
// ---------------------------------------------------------------------------
export function getDeviceSignals(): DeviceSignals {
  if (typeof window === 'undefined') {
    return {
      timezone: 'UTC',
      language: 'en-US',
      screenResolution: '1920x1080',
      deviceType: 'desktop'
    };
  }

  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  const width = window.innerWidth;
  if (width < 640) {
    deviceType = 'mobile';
  } else if (width < 1024) {
    deviceType = 'tablet';
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const language = navigator.language || 'en-US';
  const screenResolution = `${window.screen?.width || 0}x${window.screen?.height || 0}`;

  return {
    timezone,
    language,
    screenResolution,
    deviceType
  };
}

// ---------------------------------------------------------------------------
// 5. URL Parameter Auto-Fill Reader
// ---------------------------------------------------------------------------
export function getUrlPreFillData(): { email?: string; name?: string; phone?: string; businessName?: string } {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  
  return {
    email: params.get('email') || undefined,
    name: params.get('name') || undefined,
    phone: params.get('phone') || undefined,
    businessName: params.get('business') || params.get('businessName') || params.get('company') || undefined
  };
}

// ---------------------------------------------------------------------------
// 6. User Identity Caching (across different forms on the site)
// ---------------------------------------------------------------------------
export function getCachedUserDetails(): { email?: string; name?: string; phone?: string; businessName?: string } {
  if (typeof window === 'undefined') return {};
  
  // Try localStorage first
  const local = localStorage.getItem('petra_cached_user');
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // Fallback
    }
  }

  // Try cookie
  const cookieVal = getCookie('_petra_user');
  if (cookieVal) {
    try {
      return JSON.parse(cookieVal);
    } catch {
      // Fallback
    }
  }

  // Fallback to URL pre-fill
  return getUrlPreFillData();
}

export function cacheUserDetails(details: { email?: string; name?: string; phone?: string; businessName?: string }): void {
  if (typeof window === 'undefined') return;
  const existing = getCachedUserDetails();
  const merged = { ...existing, ...details };

  try {
    localStorage.setItem('petra_cached_user', JSON.stringify(merged));
  } catch {
    // Ignore quota
  }

  setCookie('_petra_user', JSON.stringify(merged), 90);
}

// ---------------------------------------------------------------------------
// 7. Real-Time Form Abandonment / Email Typing Tracker
// ---------------------------------------------------------------------------
const capturedEmails = new Set<string>();

export function captureEmailIntent(email: string, source: string): void {
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  
  if (!emailRegex.test(trimmed)) return;
  if (capturedEmails.has(trimmed)) return;

  capturedEmails.add(trimmed);
  cacheUserDetails({ email: trimmed });

  const visitorId = getOrCreateVisitorId();
  const attribution = initVisitorAttribution();
  const device = getDeviceSignals();

  const payload = {
    email: trimmed,
    source,
    visitorId,
    timestamp: new Date().toISOString(),
    ...attribution,
    ...device
  };

  // Google Tag Manager / GA4 DataLayer
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'email_intent_captured',
      ...payload
    });

    // Google Analytics gtag
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'email_intent_captured', payload);
    }

    // Meta Pixel
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'EmailIntent', payload);
    }
  }

  if (import.meta.env.DEV) {
    console.log('⚡ [Visitor Intelligence] Email intent captured (abandonment protected):', payload);
  }
}

// ---------------------------------------------------------------------------
// 8. Universal Lead Submission & Retargeting Dispatcher
// ---------------------------------------------------------------------------
export function submitInquiry(lead: {
  email: string;
  name?: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  inquirySource: string;
  estimatedRevenue?: number;
  recoveredCalls?: number;
  customerValue?: number;
}): StoredLead {
  const visitorId = getOrCreateVisitorId();
  const attribution = initVisitorAttribution();
  const device = getDeviceSignals();

  // Cache entered data for seamless multi-form experience
  cacheUserDetails({
    email: lead.email,
    name: lead.name,
    phone: lead.phone,
    businessName: lead.businessName
  });

  const fullLead: StoredLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...lead,
    visitorId,
    timestamp: new Date().toISOString(),
    attribution,
    device
  };

  // Save to stored leads in localStorage for local dashboard / API synchronization
  try {
    const existingRaw = localStorage.getItem('petra_stored_leads');
    const existingList: StoredLead[] = existingRaw ? JSON.parse(existingRaw) : [];
    existingList.unshift(fullLead);
    localStorage.setItem('petra_stored_leads', JSON.stringify(existingList.slice(0, 100)));
  } catch (err) {
    console.warn('Could not persist lead in localStorage', err);
  }

  // Google Analytics 4 standard e-commerce / lead conversion
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'generate_lead',
      lead_id: fullLead.id,
      lead_source: fullLead.inquirySource,
      value: fullLead.estimatedRevenue || 250,
      currency: 'USD',
      visitor_id: visitorId,
      email: fullLead.email,
      business_name: fullLead.businessName,
      business_type: fullLead.businessType,
      utm_source: attribution.utm_source,
      utm_campaign: attribution.utm_campaign,
      gclid: attribution.gclid
    });

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        value: fullLead.estimatedRevenue || 250,
        currency: 'USD',
        event_label: fullLead.inquirySource
      });
    }

    // Meta Pixel Lead tracking (enables Lookalike Audiences and retargeting)
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: `Petra Lead (${fullLead.inquirySource})`,
        content_category: fullLead.businessType || 'General',
        value: fullLead.estimatedRevenue || 250,
        currency: 'USD'
      });
    }
  }

  if (import.meta.env.DEV) {
    console.log('✅ [Visitor Intelligence] Complete Lead Stored & Dispatched:', fullLead);
  }

  return fullLead;
}

// ---------------------------------------------------------------------------
// 9. Global Console Debugger & Exporter (Exposed on window)
// ---------------------------------------------------------------------------
if (typeof window !== 'undefined') {
  (window as unknown as { petraGetStoredLeads: () => StoredLead[] }).petraGetStoredLeads = () => {
    try {
      const raw = localStorage.getItem('petra_stored_leads');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };
}
