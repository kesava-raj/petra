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
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { SecurityPage } from './pages/SecurityPage';
import { DentalPage } from './pages/DentalPage';
import { MedicalPage } from './pages/MedicalPage';
import { SalonsPage } from './pages/SalonsPage';
import { SpasPage } from './pages/SpasPage';
import { MedSpaPage } from './pages/MedSpaPage';
import { LegalPage } from './pages/LegalPage';
import { RealEstatePage } from './pages/RealEstatePage';
import { HomeServicesPage } from './pages/HomeServicesPage';
import { AutoServicesPage } from './pages/AutoServicesPage';
import { WellnessPage } from './pages/WellnessPage';
import { PricingPage } from './pages/PricingPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { CustomersPage } from './pages/CustomersPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { trackEvent, getStoredUTMParams } from './utils/analytics';
import { useCurrentRoute, navigateTo, getCurrentRoute } from './utils/navigation';

export const App: React.FC = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ planId: string; billingCycle: 'monthly' | 'annual' } | null>(null);
  const currentRoute = useCurrentRoute();

  useEffect(() => {
    // Preserve UTMs and fire initial page_view analytics
    const utms = getStoredUTMParams();
    trackEvent('page_view', { ...utms, route: currentRoute });

    if (currentRoute === '/') {
      document.title = 'AI Receptionist for Appointment Booking | Agent Pettra';
    }
  }, [currentRoute]);

  const scrollToDemo = () => {
    const route = getCurrentRoute();
    if (route !== '/') {
      navigateTo('/#demo');
    } else {
      const el = document.getElementById('demo');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
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
        {currentRoute === '/industries/dental' && <DentalPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/industries/medical' && <MedicalPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/industries/salons' && <SalonsPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/industries/spas' && <SpasPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/industries/med-spa' && <MedSpaPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/industries/legal' && <LegalPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/industries/real-estate' && <RealEstatePage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/industries/home-services' && <HomeServicesPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/industries/auto-services' && <AutoServicesPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/industries/wellness' && <WellnessPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/pricing' && <PricingPage onSelectPlan={handleSelectPlan} />}
        {currentRoute === '/integrations' && <IntegrationsPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/customers' && <CustomersPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/about' && <AboutPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/privacy' && <PrivacyPage />}
        {currentRoute === '/terms' && <TermsPage />}
        {currentRoute === '/security' && <SecurityPage onOpenDemo={scrollToDemo} />}
        {currentRoute === '/404' && <NotFoundPage />}

        {currentRoute === '/' && (
          <>
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
            <HowItWorks onOpenDemo={scrollToDemo} />

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
          </>
        )}
      </main>

      {/* Footer */}
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

