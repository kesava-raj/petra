export interface VoiceConfig {
  vapiPublicKey: string;
  assistantId: string;
  phoneNumber: string;
  displayPhoneNumber: string;
  suggestedPrompts: string[];
  simulatedGreeting: string;
  simulatedResponses: Array<{
    trigger: RegExp;
    reply: string;
    bookingConfirmed?: boolean;
    appointmentDetails?: {
      day: string;
      time: string;
      service: string;
    };
  }>;
}

export const voiceConfig: VoiceConfig = {
  vapiPublicKey: import.meta.env.VITE_VAPI_PUBLIC_KEY || '',
  assistantId: import.meta.env.VITE_VAPI_ASSISTANT_ID || '',
  phoneNumber: import.meta.env.VITE_PETRA_PHONE_NUMBER || '+18005557387',
  displayPhoneNumber: '+1 (800) 555-PETRA',
  suggestedPrompts: [
    "I'd like to book an appointment.",
    "What services do you offer?",
    "Are you available Thursday afternoon?",
    "I need an appointment next week."
  ],
  simulatedGreeting: "Hi! Thanks for calling. I'm Petra, your AI receptionist. How can I help you today?",
  simulatedResponses: [
    {
      trigger: /appointment|book|schedule/i,
      reply: "I'd be happy to help you schedule an appointment! What day and time work best for you?",
    },
    {
      trigger: /thursday|afternoon|morning|friday|tomorrow|next week/i,
      reply: "We have openings this Thursday at 2:30 PM and 4:00 PM. Would 2:30 PM work for you?",
    },
    {
      trigger: /2:30|yes|works|perfect|sure|that works/i,
      reply: "Wonderful! You're booked for Thursday at 2:30 PM. We'll send a confirmation text to this number. Is there anything else I can assist you with?",
      bookingConfirmed: true,
      appointmentDetails: {
        day: "Thursday",
        time: "2:30 PM",
        service: "General Consultation"
      }
    },
    {
      trigger: /service|offer|what do you do/i,
      reply: "We offer consultations, treatments, routine checkups, and full service appointments. Would you like to check availability for any of these?",
    },
    {
      trigger: /hour|open|close|available/i,
      reply: "Our office is open Monday through Friday from 8:00 AM to 6:00 PM, but I'm here 24/7 to help you book anytime!",
    }
  ]
};
