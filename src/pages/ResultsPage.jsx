// src/pages/ResultsPage.jsx
import React from 'react';
import { Clock, Trash2, ArrowRight } from 'lucide-react'; // שימוש באייקונים אחידים מסדרת Lucide

// נתוני דאמי (Placeholder) לפעילויות התואמות לחומרים שנבחרו
const DUMMY_ACTIVITIES = [
  { id: 1, title: 'רכבת צבעונית מגלילי נייר טואלט', time: '20 דקות', mess: 'נמוכה', icon: '🚂' },
  { id: 2, title: 'מטוס הרפתקאות מלוחות קרטון', time: '40 דקות', mess: 'בינונית', icon: '✈️' },
  { id: 3, title: 'ציור חיות משוגע עם צבעי גואש', time: '30 דקות', mess: 'גבוהה ✨', icon: '🦁' }
];

export default function ResultsPage({ setCurrentPage }) {
  return (
    <div style={styles.container}>
      {/* שורת ניווט עליונה (Breadcrumbs) לחזרה מהירה לעמוד הקודם */}
      <div style={styles.breadcrumbs} onClick={() => setCurrentPage('home')}>
        <ArrowRight size={16} style={{ marginLeft: '4px' }} /> 
        <span>חזרה לשינוי חומרים</span>
      </div>

      <h2 style={styles.title}>מצאנו 3 פעילויות מושלמות עבורכם! ✨</h2>
      
      {/* גריד כרטיסיות רספונסיבי המתאים למובייל ולמחשב כאחד */}
      <div style={styles.grid}>
        {DUMMY_ACTIVITIES.map((activity) => (
          <div key={activity.id} style={styles.card}>
            {/* מיקום ויזואלי מוגדר לתמונת הפעילות */}
            <div style={styles.imagePlaceholder}>
              <span style={{ fontSize: '48px' }}>{activity.icon}</span>
            </div>
            
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{activity.title}</h3>
              
              {/* אזור תגיות המידע (Badges) של הכרטיסייה */}
              <div style={styles.badgeContainer}>
                <span style={styles.badge}>
                  <Clock size={14} style={{ marginLeft: '4px' }} /> 
                  {activity.time}
                </span>
                <span style={{...styles.badge, backgroundColor: 'var(--color-secondary)'}}>
                  <Trash2 size={14} style={{ marginLeft: '4px' }} /> 
                  לכלוך: {activity.mess}
                </span>
              </div>
              
              {/* כפתור כניסה למדריך הפעילות המפורט */}
              <button style={styles.cardButton} onClick={() => setCurrentPage('detail')}>
                מתחילים! 💪
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { 
    maxWidth: '1000px', 
    margin: '40px auto', 
    padding: '0 16px' 
  },
  breadcrumbs: { 
    color: 'var(--color-primary)', 
    cursor: 'pointer', 
    fontWeight: '700', 
    marginBottom: '16px', 
    display: 'flex', 
    alignItems: 'center', 
    fontSize: '14px',
    userSelect: 'none'
  },
  title: { 
    fontSize: '24px', 
    fontWeight: '700', 
    marginBottom: '24px',
    color: 'var(--color-text-main)'
  },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: '24px' 
  },
  card: { 
    backgroundColor: '#ffffff', 
    borderRadius: 'var(--radius-lg)', /* 16px מפרט העיצוב המלא */
    overflow: 'hidden', 
    boxShadow: 'var(--shadow-soft)', 
    display: 'flex', 
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out'
  },
  imagePlaceholder: { 
    height: '160px', 
    backgroundColor: '#F0F0F0', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  cardContent: { 
    padding: '20px', 
    display: 'flex', 
    flexDirection: 'column', 
    flexGrow: 1 
  },
  cardTitle: { 
    fontSize: '18px', 
    fontWeight: '700', 
    marginBottom: '12px', 
    minHeight: '50px', 
    lineHeight: '1.4',
    color: 'var(--color-text-main)'
  },
  badgeContainer: { 
    display: 'flex', 
    gap: '8px', 
    marginBottom: '20px', 
    flexWrap: 'wrap' 
  },
  badge: { 
    backgroundColor: '#F0F0F0', 
    padding: '6px 12px', 
    borderRadius: '20px', 
    fontSize: '14px', 
    fontWeight: '500', 
    display: 'flex', 
    alignItems: 'center',
    color: 'var(--color-text-main)'
  },
  cardButton: { 
    width: '100%', 
    padding: '12px', 
    backgroundColor: 'var(--color-primary)', /* צבע הכתום הראשי של האפליקציה */
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: '14px', 
    borderRadius: 'var(--radius-lg)', 
    marginTop: 'auto' 
  }
};