import { PricingTier } from '../types';

export interface PricingConfig {
  tiers: PricingTier[];
  disclaimer: string;
}

export const pricingConfig: PricingConfig = {
  disclaimer: "All plans include 24/7 coverage, instant call answering, and seamless appointment booking. Usage limits can be customized as your business grows.",
  tiers: [
    {
      id: "starter",
      name: "Starter",
      price: 99,
      period: "month",
      description: "Ideal for small businesses needing dependable call coverage.",
      features: [
        "24/7 AI Receptionist",
        "Instant Call Answering",
        "Appointment Booking Workflow",
        "Basic Business Customization",
        "Real-Time Call Notifications",
        "Email & SMS Alert Summaries"
      ],
      ctaText: "Get Started"
    },
    {
      id: "growth",
      name: "Growth",
      price: 199,
      period: "month",
      description: "Designed for growing practices with regular daily call volume.",
      features: [
        "Everything in Starter",
        "Higher Monthly Call Volume",
        "Advanced Booking Workflows",
        "Two-Way Calendar Integrations",
        "Custom Business FAQs & Knowledge",
        "Priority Customer Support"
      ],
      isPopular: true,
      ctaText: "Get Started"
    },
    {
      id: "pro",
      name: "Pro",
      price: 399,
      period: "month",
      description: "For high-volume businesses requiring maximum flexibility.",
      features: [
        "Everything in Growth",
        "Highest Usage Limits",
        "Multi-Department Workflows",
        "Advanced CRM & Custom Webhooks",
        "White-Glove Priority Onboarding",
        "Dedicated Account Support"
      ],
      ctaText: "Get Started"
    }
  ]
};
