# Agent Pettra — 24/7 AI Voice Receptionist

> **Never Miss a Customer Call Again.**  
> Agent Pettra is an AI-powered receptionist that answers calls, talks naturally with customers, answers business questions, and schedules appointments 24/7.

Built for US-based appointment-driven businesses (Dental, Salons & Spas, Medical, Legal, Real Estate, Home Services, and more).

---

## 🚀 Features

- **Live Voice Agent Integration**: Powered by `@vapi-ai/web` with custom prompt suggestions, real-time waveform visualizer, call timer, and transcript stream.
- **Dedicated Phone Fallback**: Support for direct phone line calling (`tel:` link).
- **Interactive Conversation Demo**: Progressive simulated phone dialogue demonstrating real-time booking confirmation.
- **Interactive ROI Calculator**: Real-time slider calculations estimating revenue recovered from missed calls.
- **Appointment Booking Flow**: Calendar visualization with appointment slots and SMS confirmation previews.
- **Industry Solutions**: Tabbed industry showcase for dental, medical, salons, legal, real estate, and home services.
- **Configurable Pricing**: Centralized plan definitions (Starter, Growth, Pro).
- **Accessible & Mobile-First**: Responsive drawer navigation, bottom sticky CTA for mobile devices, and ARIA compliant accordions.
- **Attribution & Analytics**: UTM campaign parameter preservation and Meta Pixel / Google Analytics event tracking.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Voice SDK**: `@vapi-ai/web`
- **Icons**: `lucide-react`
- **Styling**: Modular Vanilla CSS with comprehensive Design System tokens (Deep Navy & Electric Blue theme)

---

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/kesava-raj/petra.git
cd petra

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## ⚙️ Configuration

Copy `.env.example` to `.env` and fill in your Vapi credentials:

```env
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
VITE_VAPI_ASSISTANT_ID=your_vapi_assistant_id_here
VITE_AGENT_PETTRA_PHONE_NUMBER=+18005557387
```

If keys are not provided, Agent Pettra gracefully runs in interactive preview mode so visitors can still test the conversational workflow.

---

## 📦 Production Build

```bash
npm run build
```

The output will be in the `dist/` directory.

---

## 📄 License

MIT © 2026 Agent Pettra.
