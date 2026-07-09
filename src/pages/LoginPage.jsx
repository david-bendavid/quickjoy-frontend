// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // קריאה אמיתית ל-Supabase לבדיקת המשתמש
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg('אימייל או סיסמה שגויים. נסו שוב.');
      setIsLoading(false);
    } else {
      // אם ההתחברות הצליחה, אנחנו מעדכנים את האפליקציה שהמשתמש מחובר
      onLoginSuccess();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={{ fontSize: '48px' }}>👋</span>
        </div>
        <h2 style={styles.title}>ברוכים הבאים ל-QuickJoy!</h2>
        <p style={styles.subtitle}>התחברו כדי להתחיל למצוא פעילויות לילדים.</p>

        <form onSubmit={handleLogin} style={styles.form}>
          {errorMsg && <div style={styles.errorBox}>{errorMsg}</div>}
          
          <input
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          
          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? 'מתחבר...' : 'התחברות'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '20px',
    direction: 'rtl',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: 'var(--radius-lg, 16px)',
    boxShadow: 'var(--shadow-soft, 0px 4px 12px rgba(0, 0, 0, 0.05))',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'var(--color-text-main, #262626)',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '14px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #D9D9D9',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    fontWeight: '700',
    backgroundColor: 'var(--color-primary, #FF7A45)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '12px',
  },
  errorBox: {
    backgroundColor: '#FFF1F0',
    color: 'var(--color-error, #FF4D4F)',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '8px',
  }
};