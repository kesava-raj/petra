import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  // Light theme is the default
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read saved preference or default to 'light'
    const savedTheme = localStorage.getItem('petra-theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    document.body.setAttribute('data-theme', initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('petra-theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    document.body.setAttribute('data-theme', nextTheme);
  };

  if (!mounted) return null;

  const isLight = theme === 'light';

  return (
    <div className="floating-theme-toggle-wrapper">
      <button
        onClick={toggleTheme}
        className="floating-theme-toggle"
        aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
        title={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
      >
        <div className="theme-toggle-icon-container">
          {isLight ? (
            <Moon size={20} className="theme-icon moon-icon" />
          ) : (
            <Sun size={20} className="theme-icon sun-icon" />
          )}
        </div>
        <span className="theme-toggle-label">
          {isLight ? 'Dark' : 'Light'}
        </span>
      </button>

      <style>{`
        .floating-theme-toggle-wrapper {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 99;
          animation: floatIn 0.3s ease-out;
        }

        .floating-theme-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 9999px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          user-select: none;
        }

        /* Light Theme Style for Floating Button */
        [data-theme="light"] .floating-theme-toggle {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(15, 23, 42, 0.12);
          color: #0F172A;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.05);
        }

        [data-theme="light"] .floating-theme-toggle:hover {
          background: #FFFFFF;
          border-color: rgba(37, 99, 235, 0.4);
          box-shadow: 0 6px 24px rgba(37, 99, 235, 0.2);
          transform: translateY(-2px);
          color: #2563EB;
        }

        /* Dark Theme Style for Floating Button */
        [data-theme="dark"] .floating-theme-toggle {
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #F8FAFC;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(59, 130, 246, 0.25);
        }

        [data-theme="dark"] .floating-theme-toggle:hover {
          background: rgba(22, 33, 62, 0.95);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 6px 28px rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
          color: #60A5FA;
        }

        .theme-toggle-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .floating-theme-toggle:hover .theme-toggle-icon-container {
          transform: rotate(15deg) scale(1.1);
        }

        .moon-icon {
          color: #475569;
        }

        [data-theme="light"] .floating-theme-toggle:hover .moon-icon {
          color: #2563EB;
        }

        .sun-icon {
          color: #F59E0B;
        }

        @keyframes floatIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Responsive placement on mobile so it doesn't overlap MobileStickyCTA */
        @media (max-width: 899px) {
          .floating-theme-toggle-wrapper {
            bottom: 86px;
            right: 16px;
          }
          .floating-theme-toggle {
            padding: 8px 14px;
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </div>
  );
};
