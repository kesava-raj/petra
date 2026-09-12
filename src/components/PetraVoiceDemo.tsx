import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  RotateCcw,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import Vapi from '@vapi-ai/web';
import { voiceConfig } from '../config/voiceConfig';
import { trackEvent } from '../utils/analytics';

interface PetraVoiceDemoProps {
  onOpenLeadModal?: () => void;
}

type CallStatus = 'idle' | 'connecting' | 'connected' | 'ended' | 'error';

interface MessageLog {
  id: string;
  sender: 'customer' | 'petra' | 'system';
  text: string;
  time: string;
}

export const PetraVoiceDemo: React.FC<PetraVoiceDemoProps> = ({ onOpenLeadModal }) => {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [messages, setMessages] = useState<MessageLog[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [isVapiActive, setIsVapiActive] = useState(false);

  const vapiRef = useRef<Vapi | null>(null);
  const timerRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Vapi client if public key is present
  useEffect(() => {
    if (voiceConfig.vapiPublicKey) {
      try {
        const vapi = new Vapi(voiceConfig.vapiPublicKey);
        vapiRef.current = vapi;

        vapi.on('call-start', () => {
          setCallStatus('connected');
          setIsVapiActive(true);
          trackEvent('demo_start', { mode: 'vapi_live' });
          addMessage('system', 'Connected to Petra AI Voice Agent');
        });

        vapi.on('call-end', () => {
          setCallStatus('ended');
          setIsSpeaking(false);
          trackEvent('demo_complete', { mode: 'vapi_live', duration: callDuration });
          addMessage('system', 'Call completed. Thanks for talking with Petra!');
        });

        vapi.on('speech-start', () => {
          setIsSpeaking(true);
        });

        vapi.on('speech-end', () => {
          setIsSpeaking(false);
        });

        vapi.on('message', (message: { type: string; transcript?: string; role?: string }) => {
          if (message.type === 'transcript' && message.transcript) {
            const role = message.role === 'user' ? 'customer' : 'petra';
            addMessage(role, message.transcript);
          }
        });

        vapi.on('error', (err: unknown) => {
          console.error('Vapi client error:', err);
          setErrorMessage('Petra couldn’t connect right now. You can call Petra directly.');
          setCallStatus('error');
          trackEvent('demo_error', { error: String(err) });
        });
      } catch (err) {
        console.warn('Vapi initialization bypassed:', err);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  // Timer counter when connected
  useEffect(() => {
    if (callStatus === 'connected') {
      timerRef.current = window.setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callStatus]);

  // Audio Waveform Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const isLive = callStatus === 'connected';
      const numBars = 36;
      const barWidth = 4;
      const spacing = (width - numBars * barWidth) / (numBars - 1);

      for (let i = 0; i < numBars; i++) {
        let barHeight = 6;
        if (isLive) {
          const frequency = isSpeaking ? 0.22 : 0.08;
          const amplitude = isSpeaking ? 42 : 16;
          barHeight = Math.sin(step * frequency + i * 0.3) * amplitude + amplitude + 8;
        }

        const x = i * (barWidth + spacing);
        const y = (height - barHeight) / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isSpeaking) {
          gradient.addColorStop(0, '#60A5FA');
          gradient.addColorStop(1, '#8B5CF6');
        } else if (isLive) {
          gradient.addColorStop(0, '#3B82F6');
          gradient.addColorStop(1, '#10B981');
        } else {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 4);
        ctx.fill();
      }

      step++;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [callStatus, isSpeaking]);

  const addMessage = (sender: 'customer' | 'petra' | 'system', text: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setMessages((prev) => [...prev, { id: Math.random().toString(), sender, text, time }]);
  };

  // Start Call Handler
  const startCall = async () => {
    setErrorMessage(null);
    setBookingCompleted(false);
    setCallDuration(0);
    setMessages([]);
    setCallStatus('connecting');
    trackEvent('demo_open');

    // If Vapi credentials are configured, launch live Vapi call
    if (vapiRef.current && voiceConfig.assistantId) {
      try {
        await vapiRef.current.start(voiceConfig.assistantId);
      } catch (err) {
        console.error('Error starting Vapi session:', err);
        launchSimulatedSession();
      }
    } else {
      // Launch Interactive Browser Demo Session
      launchSimulatedSession();
    }
  };

  const launchSimulatedSession = () => {
    setIsVapiActive(false);
    setTimeout(() => {
      setCallStatus('connected');
      setIsSpeaking(true);
      trackEvent('demo_start', { mode: 'interactive_demo' });
      addMessage('petra', voiceConfig.simulatedGreeting);

      // Play audio cue using web audio synth for realistic receptionist greeting
      playToneCue();

      setTimeout(() => {
        setIsSpeaking(false);
      }, 2500);
    }, 1200);
  };

  const playToneCue = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  // End Call Handler
  const endCall = () => {
    if (vapiRef.current && isVapiActive) {
      vapiRef.current.stop();
    }
    setCallStatus('ended');
    setIsSpeaking(false);
    trackEvent('demo_complete', { duration: callDuration });
  };

  // Simulate User saying a prompt
  const handlePromptClick = (promptText: string) => {
    if (callStatus !== 'connected') {
      startCall();
      setTimeout(() => {
        processUserPrompt(promptText);
      }, 1800);
    } else {
      processUserPrompt(promptText);
    }
  };

  const processUserPrompt = (promptText: string) => {
    addMessage('customer', promptText);

    // Find matching response in simulated knowledge base
    const matched = voiceConfig.simulatedResponses.find((r) => r.trigger.test(promptText)) || {
      reply: "I'd be pleased to help you with that! Could you tell me a little more or would you prefer to schedule an appointment with our team?",
      bookingConfirmed: false
    };

    setTimeout(() => {
      setIsSpeaking(true);
      setTimeout(() => {
        addMessage('petra', matched.reply);
        if (matched.bookingConfirmed) {
          setBookingCompleted(true);
        }
        setIsSpeaking(false);
      }, 1600);
    }, 600);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section 
      id="demo" 
      className="section-padding" 
      style={{ 
        position: 'relative',
        background: 'linear-gradient(180deg, #080D1A 0%, #0D1527 50%, #080D1A 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>LIVE INTERACTIVE EXPERIENCE</span>
          </div>
          <h2 className="section-title">
            Don&apos;t Watch a Demo. Talk to Petra.
          </h2>
          <p className="section-subtitle">
            Want to know what an AI receptionist actually sounds like? Call Petra and have a real conversation. 
            Ask questions, request an appointment, and experience the receptionist yourself.
          </p>
        </div>

        {/* Demo Interface Card */}
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '28px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(59, 130, 246, 0.15)',
          padding: 'clamp(20px, 4vw, 40px)',
          position: 'relative',
          overflow: 'hidden'
        }}>

          {/* Top Status Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
              }}>
                <PhoneCall size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
                  Petra Voice Assistant
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: callStatus === 'connected' ? '#10B981' : callStatus === 'connecting' ? '#F59E0B' : '#64748B'
                  }} />
                  <span style={{ fontSize: '0.8125rem', color: '#CBD5E1', fontWeight: 500 }}>
                    {callStatus === 'idle' && 'Ready to connect'}
                    {callStatus === 'connecting' && 'Connecting to Petra...'}
                    {callStatus === 'connected' && (isSpeaking ? 'Petra is speaking...' : 'Petra is listening...')}
                    {callStatus === 'ended' && 'Call ended'}
                    {callStatus === 'error' && 'Connection unavailable'}
                  </span>
                </div>
              </div>
            </div>

            {/* Timer and Status Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '8px 16px',
                fontFamily: 'monospace',
                fontSize: '1rem',
                fontWeight: 600,
                color: callStatus === 'connected' ? '#60A5FA' : '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: callStatus === 'connected' ? '#EF4444' : '#64748B',
                  animation: callStatus === 'connected' ? 'pulse 1s infinite' : 'none'
                }}></span>
                <span>{formatTimer(callDuration)}</span>
              </div>
            </div>
          </div>

          {/* Voice Waveform Visualizer Display */}
          <div style={{
            margin: '28px 0',
            padding: '24px',
            background: 'rgba(10, 16, 31, 0.7)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <canvas 
              ref={canvasRef} 
              width={500} 
              height={80} 
              style={{ maxWidth: '100%', height: '80px' }}
            />

            <p style={{ 
              fontSize: '0.9rem', 
              color: callStatus === 'connected' ? '#60A5FA' : '#94A3B8', 
              marginTop: '12px',
              fontWeight: 500,
              textAlign: 'center'
            }}>
              {callStatus === 'idle' && "Click 'Talk to Petra' below or select a suggested prompt."}
              {callStatus === 'connecting' && "Establishing secure audio connection..."}
              {callStatus === 'connected' && (isSpeaking ? "Petra is speaking..." : "Petra is listening to you...")}
              {callStatus === 'ended' && "Thanks for talking with Petra."}
              {callStatus === 'error' && errorMessage}
            </p>
          </div>

          {/* Live Transcript Stream (when messages exist) */}
          {messages.length > 0 && (
            <div style={{
              maxHeight: '200px',
              overflowY: 'auto',
              padding: '16px',
              background: 'rgba(7, 11, 20, 0.6)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
                <MessageSquare size={14} />
                <span>LIVE CONVERSATION TRANSCRIPT</span>
              </div>
              {messages.map((m) => (
                <div 
                  key={m.id}
                  style={{
                    alignSelf: m.sender === 'customer' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    background: m.sender === 'customer' 
                      ? 'rgba(59, 130, 246, 0.2)' 
                      : m.sender === 'petra' 
                        ? 'rgba(99, 102, 241, 0.2)' 
                        : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${m.sender === 'customer' ? 'rgba(59, 130, 246, 0.4)' : m.sender === 'petra' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '0.875rem'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: m.sender === 'customer' ? '#93C5FD' : '#A5B4FC', marginBottom: '2px', fontWeight: 600 }}>
                    {m.sender === 'customer' ? 'You' : m.sender === 'petra' ? 'Petra' : 'System'} • {m.time}
                  </div>
                  <div style={{ color: '#F8FAFC', lineHeight: 1.4 }}>{m.text}</div>
                </div>
              ))}
            </div>
          )}

          {/* Booking Confirmed Demonstration Badge */}
          {bookingCompleted && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.2) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={24} color="#10B981" />
                <div>
                  <h5 style={{ fontSize: '1rem', color: '#10B981', fontWeight: 700 }}>
                    Appointment Successfully Booked!
                  </h5>
                  <p style={{ fontSize: '0.8125rem', color: '#D1FAE5', margin: 0 }}>
                    Thursday at 2:30 PM • Consultation
                  </p>
                </div>
              </div>
              <div style={{
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#A7F3D0',
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                Calendar Sync Ready
              </div>
            </div>
          )}

          {/* Suggested Prompts: "Try saying..." */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ 
              fontSize: '0.875rem', 
              color: '#94A3B8', 
              textTransform: 'uppercase', 
              letterSpacing: '0.06em', 
              fontWeight: 700,
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Sparkles size={14} color="#60A5FA" />
              Try saying...
            </h4>
            <div className="demo-prompts-grid">
              {voiceConfig.suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    textAlign: 'left',
                    color: '#E2E8F0',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.35)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>&ldquo;{prompt}&rdquo;</span>
                  <ArrowRight size={14} color="#60A5FA" style={{ flexShrink: 0 }} />
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Controls */}
          <div className="demo-action-controls" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {callStatus === 'idle' || callStatus === 'ended' || callStatus === 'error' ? (
              <button
                onClick={startCall}
                className="btn btn-primary btn-lg btn-pulse"
                id="voice-demo-start-call"
                style={{
                  fontSize: '1.15rem',
                  padding: '16px 40px',
                  boxShadow: '0 0 35px rgba(59, 130, 246, 0.5)'
                }}
              >
                <PhoneCall size={22} />
                <span>Talk to Petra</span>
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: isMuted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${isMuted ? '#EF4444' : 'rgba(255, 255, 255, 0.15)'}`,
                    color: isMuted ? '#EF4444' : '#CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                  aria-label="Toggle mute"
                >
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <button
                  onClick={endCall}
                  className="btn"
                  id="voice-demo-end-call"
                  style={{
                    background: '#EF4444',
                    color: '#FFFFFF',
                    padding: '14px 32px',
                    fontSize: '1.05rem',
                    boxShadow: '0 0 25px rgba(239, 68, 68, 0.4)'
                  }}
                >
                  <PhoneOff size={20} />
                  <span>End Conversation</span>
                </button>
              </div>
            )}

            {/* Restart Button if ended */}
            {callStatus === 'ended' && (
              <button
                onClick={startCall}
                className="btn btn-secondary"
                style={{ padding: '14px 24px' }}
              >
                <RotateCcw size={16} />
                <span>Try Again</span>
              </button>
            )}
          </div>

          <p style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            color: '#94A3B8',
            marginTop: '16px'
          }}>
            No forms. No waiting. No sales call.
          </p>

          {/* Dedicated Fallback: Call Petra on Phone */}
          <div style={{
            marginTop: '28px',
            padding: '16px 20px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={18} color="#3B82F6" />
              <div>
                <span style={{ fontSize: '0.9rem', color: '#F8FAFC', fontWeight: 600 }}>
                  Prefer using your phone?
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block' }}>
                  Call our live demonstration line directly
                </span>
              </div>
            </div>

            <a
              href={`tel:${voiceConfig.phoneNumber}`}
              onClick={() => trackEvent('phone_demo_click', { number: voiceConfig.phoneNumber })}
              className="btn btn-secondary btn-sm"
              style={{
                borderColor: 'rgba(59, 130, 246, 0.4)',
                color: '#60A5FA',
                fontWeight: 600
              }}
            >
              <PhoneCall size={14} />
              <span>Call {voiceConfig.displayPhoneNumber}</span>
            </a>
          </div>

        </div>

        {/* Section 14: Demo Post-Interaction Conversion Card */}
        {callStatus === 'ended' && (
          <div style={{
            maxWidth: '860px',
            margin: '36px auto 0 auto',
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(88, 28, 135, 0.35) 100%)',
            border: '1px solid rgba(96, 165, 250, 0.35)',
            borderRadius: '24px',
            padding: '36px 32px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '12px'
            }}>
              Imagine Petra Answering Your Business Calls.
            </h3>
            <p style={{
              fontSize: '1.05rem',
              color: '#CBD5E1',
              maxWidth: '640px',
              margin: '0 auto 28px auto'
            }}>
              That same experience can be customized for your business, your services, your customers, and your appointment schedule.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <button
                onClick={() => {
                  trackEvent('lead_form_start', { source: 'post_demo_conversion' });
                  if (onOpenLeadModal) onOpenLeadModal();
                }}
                className="btn btn-primary btn-lg"
              >
                <Calendar size={18} />
                <span>Get Petra for My Business</span>
              </button>
              <a
                href="#pricing"
                onClick={() => trackEvent('pricing_view', { source: 'post_demo_conversion' })}
                className="btn btn-secondary btn-lg"
              >
                <span>See Pricing</span>
              </a>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .demo-prompts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
        }

        @media (max-width: 580px) {
          .demo-prompts-grid {
            grid-template-columns: 1fr;
          }
          #voice-demo-start-call {
            width: 100% !important;
            max-width: 320px;
            padding: 14px 24px !important;
            font-size: 1.05rem !important;
          }
        }
      `}</style>
    </section>
  );
};
