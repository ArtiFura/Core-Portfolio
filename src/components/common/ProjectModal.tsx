import React, { useState } from 'react';
import { X, Send, GraduationCap, Building2, Handshake, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'college' | 'business' | 'partner';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  initialType = 'college',
}) => {
  const [selectedType, setSelectedType] = useState<'college' | 'business' | 'partner'>(
    initialType
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Honest submission handling: Open user's email client with prefilled details, and show confirmation status
    const subject = encodeURIComponent(
      `ARTIFURA Inquiry: [${selectedType.toUpperCase()}] from ${name || 'Prospective Partner'}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInstitution/Company: ${institution}\nCategory: ${selectedType}\n\nProject Scope & Message:\n${message}`
    );

    // Trigger direct mail client
    window.location.href = `mailto:contact@artifura.com?subject=${subject}&body=${body}`;
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
              COMMUNICATION INITIATED
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
              Your default email client has been prepared with your inquiry for <strong>contact@artifura.com</strong>. We review all college implementations and engineering partnerships directly.
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
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--gold-antique)',
                letterSpacing: '0.2em',
                marginBottom: '6px',
              }}
            >
              DIRECT DISPATCH // ARTIFURA INQUIRY
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                letterSpacing: '0.04em',
                color: '#FFF',
                marginBottom: '6px',
              }}
            >
              LET’S BUILD WHAT’S NEXT.
            </h2>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.88rem',
                marginBottom: '24px',
              }}
            >
              Select your path to connect with our technology team.
            </p>

            {/* Path Selection Tabs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                marginBottom: '24px',
              }}
            >
              {[
                { id: 'college', label: 'FOR COLLEGES', icon: GraduationCap },
                { id: 'business', label: 'FOR BUSINESSES', icon: Building2 },
                { id: 'partner', label: 'FOR PARTNERS', icon: Handshake },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedType === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedType(tab.id as any)}
                    style={{
                      background: isSelected
                        ? 'rgba(212, 175, 55, 0.15)'
                        : 'rgba(20, 20, 20, 0.6)',
                      border: isSelected
                        ? '1px solid var(--gold-bright)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '10px 8px',
                      color: isSelected ? 'var(--gold-bright)' : 'var(--text-muted)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.08em',
                    }}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--gold-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    YOUR NAME
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. A. Sharma"
                    style={{
                      width: '100%',
                      background: '#151515',
                      border: '1px solid var(--gold-border)',
                      color: '#FFF',
                      padding: '10px 12px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--gold-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@institution.edu"
                    style={{
                      width: '100%',
                      background: '#151515',
                      border: '1px solid var(--gold-border)',
                      color: '#FFF',
                      padding: '10px 12px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
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
                    fontSize: '0.7rem',
                    color: 'var(--gold-primary)',
                    marginBottom: '4px',
                  }}
                >
                  COLLEGE / ORGANIZATION NAME
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. Institute of Technology / Enterprise Labs"
                  style={{
                    width: '100%',
                    background: '#151515',
                    border: '1px solid var(--gold-border)',
                    color: '#FFF',
                    padding: '10px 12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--gold-primary)',
                    marginBottom: '4px',
                  }}
                >
                  PROJECT SCOPE OR GOAL
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    selectedType === 'college'
                      ? 'Tell us about your campus department, student cohort size, and assessment requirements...'
                      : selectedType === 'business'
                        ? 'Describe the digital product, technical challenge, or timeline you are aiming to solve...'
                        : 'Outline the collaboration or strategic partnership model you envision...'
                  }
                  style={{
                    width: '100%',
                    background: '#151515',
                    border: '1px solid var(--gold-border)',
                    color: '#FFF',
                    padding: '10px 12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Direct dispatch to: <strong>contact@artifura.com</strong>
                </span>
                <button type="submit" className="btn-gold-primary">
                  <span>TRANSMIT DISPATCH</span>
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

