// src/components/Navbar.jsx
import React from 'react';
import { Sparkles } from 'lucide-react'; // שימוש באייקון אחיד מתוך מערכת העיצוב

export default function Navbar({ setCurrentPage }) {
  return (
    <nav style={styles.navbar}>
      {/* לוגו אינטראקטיבי שמחזיר לעמוד הבית בלחיצה */}
      <div style={styles.logo} onClick={() => setCurrentPage('home')}>
        <Sparkles size={24} color="var(--color-primary)" style={{ marginLeft: '8px' }} />
        <span>QuickJoy</span>
      </div>
      
      <div style={styles.links}>
        <span style={styles.link} onClick={() => setCurrentPage('home')}>
          חיפוש פעילות
        </span>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #EAEAEA',
    boxShadow: 'var(--shadow-soft)' // שאיבת הצל העדין מטוקן העיצוב
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: '700',
    color: 'var(--color-text-main)',
    cursor: 'pointer',
    userSelect: 'none'
  },
  links: {
    display: 'flex',
    gap: '24px'
  },
  link: {
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
    color: 'var(--color-primary)', // כתום שקיעה חם לכפתורי פעולה
    transition: 'opacity 0.2s'
  }
};