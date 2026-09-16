import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PetraVoiceDemo } from './components/PetraVoiceDemo';
import { IndustryStrip } from './components/IndustryStrip';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { OperationalCoverage } from './components/OperationalCoverage';
import { BenchmarkComparison } from './components/BenchmarkComparison';
import { HowItWorks } from './components/HowItWorks';
import { ConversationDemo } from './components/ConversationDemo';
import { Features } from './components/Features';
import { BookingFlow } from './components/BookingFlow';
import { IndustrySection } from './components/IndustrySection';
import { ROICalculator } from './components/ROICalculator';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { ThemeToggle } from './components/ThemeToggle';
import { InquirySection } from './components/InquirySection';
import { trackEvent, getStoredUTMParams } from './utils/analytics';

export const App: React.FC = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ planId: string; billingCycle: 'monthly' | 'annual' } | null>(null);

  useEffect(() => {
    // Preserve UTMs and fire initial page_view analytics
    const utms = getStoredUTMParams();
    trackEvent('page_view', { ...utms });
  }, []);

  const scrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (planId: string, billingCycle: 'monthly' | 'annual' = 'annual') => {
    setSelectedPlan({ planId, billingCycle });
    setIsLeadModalOpen(true);
  };

  return (
    <div className="petra-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Navigation */}
      <Navbar onOpenDemo={scrollToDemo} />

      <main style={{ flex: 1 }}>
        {/* 2. Hero Section */}
        <Hero onOpenDemo={scrollToDemo} />

        {/* 3. Live Agent Pettra Demo (The most important section) */}
        <PetraVoiceDemo onOpenLeadModal={() => setIsLeadModalOpen(true)} />

        {/* 4. Trust / Industry Strip */}
        <IndustryStrip />

        {/* 5. Problem Section */}
        <ProblemSection />

        {/* 6. Solution Section */}
        <SolutionSection onOpenDemo={scrollToDemo} />

        {/* 6b. Operational Coverage ("Agent Pettra does not just talk. It runs the operation.") */}
        <OperationalCoverage />

        {/* 6c. Performance Benchmarks & Why Teams Pick Agent Pettra */}
        <BenchmarkComparison />

        {/* 7. How Agent Pettra Works */}
        <HowItWorks />

        {/* 8. Interactive Conversation Demo */}
        <ConversationDemo onOpenVoiceDemo={scrollToDemo} />

        {/* 9. Features */}
        <Features />

        {/* 10. Appointment Booking Flow & Calendar Integration */}
        <BookingFlow />

        {/* 11. Industry Use Cases */}
        <IndustrySection onOpenDemo={scrollToDemo} />

        {/* 12. ROI Calculator */}
        <ROICalculator onOpenDemo={scrollToDemo} />

        {/* 13. Pricing Preview */}
        <Pricing onSelectPlan={handleSelectPlan} onOpenDemo={scrollToDemo} />

        {/* 14. Dedicated Inquiry Section */}
        <InquirySection onOpenDemo={scrollToDemo} />

        {/* 15. FAQ */}
        <FAQ />

        {/* 16. Final CTA */}
        <FinalCTA onOpenDemo={scrollToDemo} />
      </main>

      {/* 16. Footer */}
      <Footer />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA onOpenDemo={scrollToDemo} />

      {/* Floating Theme Toggle (Light / Dark) */}
      <ThemeToggle />

      {/* Lead Capture Modal */}
      <LeadCaptureModal 
        isOpen={isLeadModalOpen} 
        onClose={() => setIsLeadModalOpen(false)} 
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default App;
