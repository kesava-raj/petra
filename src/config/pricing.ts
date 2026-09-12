import { PricingTier } from '../types';

export interface PricingConfig {
  tiers: PricingTier[];
  disclaimer: string;
}

export const pricingConfig: PricingConfig = {
  disclaimer: "All plans include 24/7 AI coverage, instant call answering, and automated appointment scheduling. Included minutes replenish monthly on both billing options.",
  tiers: [
    {
      id: "starter",
      name: "Starter",
      monthlyPrice: 99,
      annualPrice: 990,
      monthlyEquivalent: 82.50,
      annualSaving: 198,
      includedMinutes: 300,
      overageRate: 0.35,
      description: "Ideal for small practices and solo entrepreneurs needing dependable 24/7 call coverage.",
      features: [
        "300 included minutes / month",
        "24/7 AI Receptionist coverage",
        "Instant call answering & FAQs",
        "Appointment booking workflow",
        "Email & SMS alert summaries",
        "$0.35/min additional overage"
      ],
      ctaText: "Get Started"
    },
    {
      id: "growth",
      name: "Growth ⭐",
      monthlyPrice: 199,
      annualPrice: 1990,
      monthlyEquivalent: 165.83,
      annualSaving: 398,
      includedMinutes: 750,
      overageRate: 0.30,
      description: "Designed for growing practices with regular daily call volume and appointment bookings.",
      features: [
        "750 included minutes / month",
        "Everything in Starter",
        "Two-way calendar sync (Google / Outlook)",
        "Custom business FAQs & tone tuning",
        "Live call transfer to staff",
        "$0.30/min additional overage"
      ],
      isPopular: true,
      ctaText: "Get Started"
    },
    {
      id: "pro",
      name: "Pro",
      monthlyPrice: 399,
      annualPrice: 3990,
      monthlyEquivalent: 332.50,
      annualSaving: 798,
      includedMinutes: 1500,
      overageRate: 0.25,
      description: "For high-volume businesses requiring multi-department routing and deep CRM workflows.",
      features: [
        "1,500 included minutes / month",
        "Everything in Growth",
        "Multi-department call routing",
        "Advanced CRM & custom webhook sync",
        "White-glove priority onboarding",
        "$0.25/min additional overage"
      ],
      ctaText: "Get Started"
    }
  ]
};
