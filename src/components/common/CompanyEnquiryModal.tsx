import React, { useState } from 'react';
import { X, Send, Rocket, Building2, Handshake, CheckCircle2 } from 'lucide-react';

interface CompanyEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'startup' | 'enterprise' | 'partner';
}

export const CompanyEnquiryModal: React.FC<CompanyEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialType = 'startup',
}) => {
  const [selectedType, setSelectedType] = useState<'startup' | 'enterprise' | 'partner'>(
    initialType
  );
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `ARTIFURA Company Inquiry: [${selectedType.toUpperCase()}] from ${company || name}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nWork Email: ${email}\nSegment: ${selectedType}\nTarget Roles: ${roles}\n\nProject Scope & Hiring Needs:\n${message}\n\n-- Dispatched via ARTIFURA Company Portal`
    );

    // Open user's email client directly
    window.location.href = `mailto:partnerships@artifura.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(5, 5, 5, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="comic-frame comic-corner-accents"
        style={{
          width: '100%',
          maxWidth: '640px',
          background: '#0d0d0d',
          border: '1px solid var(--gold-border-bright)',
          padding: '32px',
          position: 'relative',
          clipPath:
            'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: 'var(--gold-bright)',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 20px',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid var(--gold-bright)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={36} color="var(--gold-bright)" />
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                color: 'var(--gold-bright)',
                marginBottom: '12px',
              }}
            >
              DISCOVERY INQUIRY SENT
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-muted)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                maxWidth: '460px',
                margin: '0 auto 24px',
              }}
            >
              Your default email client has been prepared with your inquiry for <strong>partnerships@artifura.com</strong>. Our talent architecture team reviews all company hiring pipelines directly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn-gold-primary"
            >
              RETURN TO CHRONICLE
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.2em',
                  marginBottom: '4px',
                }}
              >
                TALENT DISCOVERY // ARTIFURA FOR COMPANIES
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: 'var(--text-ivory)',
                  margin: 0,
                }}
              >
                Start a Hiring Conversation
              </h2>
            </div>

            {/* Segment Selector Tabs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              {[
                { type: 'startup' as const, label: 'STARTUP', icon: Rocket },
                { type: 'enterprise' as const, label: 'ENTERPRISE', icon: Building2 },
                { type: 'partner' as const, label: 'PARTNER', icon: Handshake },
              ].map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 10px',
                    background: selectedType === type ? 'var(--gold-gradient)' : 'rgba(25, 25, 25, 0.8)',
                    color: selectedType === type ? '#080808' : 'var(--text-muted)',
                    border: '1px solid var(--gold-border)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={13} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--gold-antique)',
                      marginBottom: '4px',
                    }}
                  >
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: '#141414',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#FFF',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--gold-antique)',
                      marginBottom: '4px',
                    }}
                  >
                    COMPANY NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Company or Org"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: '#141414',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#FFF',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--gold-antique)',
                      marginBottom: '4px',
                    }}
                  >
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="work@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: '#141414',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#FFF',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--gold-antique)',
                      marginBottom: '4px',
                    }}
                  >
                    ROLE / STACK OF INTEREST
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Systems, Go/Rust, React"
                    value={roles}
                    onChange={(e) => setRoles(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: '#141414',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#FFF',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--gold-antique)',
                    marginBottom: '4px',
                  }}
                >
                  BRIEF MESSAGE / SCOPE
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the kinds of engineers you are seeking or any specific project evidence requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: '#141414',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#FFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-gold-primary gold-sweep-active"
                style={{ padding: '12px', width: '100%', marginTop: '6px' }}
              >
                <span>INITIATE DISCOVERY INQUIRY</span>
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

