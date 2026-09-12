export interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface IndustryUseCase {
  id: string;
  name: string;
  icon: string;
  headline: string;
  description: string;
  commonQuestions: string[];
  bookingOutcome: string;
}

export interface ConversationStep {
  sender: 'customer' | 'petra';
  text: string;
  time?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LeadFormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
}
