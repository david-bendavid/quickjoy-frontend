// src/pages/ActivityDetailPage.jsx
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react'; // שימוש באייקונים אחידים מסדרת Lucide

export default function ActivityDetailPage({ setCurrentPage }) {
  // ניהול מצב אינטראקטיבי עבור סימון החומרים שהוכנו על השולחן
  const [materials, setMaterials] = useState([
    { id: 1, name: '4 גלילי נייר טואלט ריקים ונקיים', checked: false },
    { id: 2, name: 'דבק פלסטי רגיל או דבק מהיר בהיר', checked: false },
    { id: 3, name: 'צבעי גואש או טושים לקישוט', checked: false }
  ]);

  // מצב המציין אם המשתמש סיים את הפעילות בהצלחה
  const [isFinished, setIsFinished] = useState(false);

  const toggleMaterial = (id) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, checked: !m.checked } : m));
  };

  return (
    <div style={styles.container}>
      {/* שורת ניווט (Breadcrumbs) לחזרה מהירה לעמוד התוצאות */}
      <div style={styles.breadcrumbs} onClick={() => setCurrentPage('results')}>
        <ArrowRight size={16} style={{ marginLeft: '4px' }} /> 
        <span>חזרה לתוצאות</span>
      </div>

      <h1 style={styles.title}>רכבת צבעונית מגלילי נייר טואלט 🚂</h1>
      <div style={styles.mainImage}>📸 תמונה חגיגית של הרכבת המוכנה</div>

      {/* אזור 1: רשימת מכולת אינטראקטיבית עם צ'קבוקסים דינמיים */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>מה להכין על השולחן? 📋</h3>
        {materials.map((material) => (
          <label key={material.id} style={styles.checkLabel}>
            <input 
              type="checkbox" 
              checked={material.checked}
              onChange={() => toggleMaterial(material.id)}
              style={styles.checkbox}
            />
            <span style={{ 
              marginRight: '10px',
              textDecoration: material.checked ? 'line-through' : 'none',
              color: material.checked ? '#8C8C8C' : 'var(--color-text-main)'
            }}>
              {material.name}
            </span>
          </label>
        ))}
      </div>

      {/* אזור 2: היררכיה בשלבי הביצוע מבוססת פונט Rubik קריא */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>שלבי עבודה קלים:</h3>
        
        <div style={styles.step}>
          <div style={styles.stepNumber}>1</div>
          <div style={styles.stepBody}>
            <p style={styles.stepText}>צובעים או מקשטים את גלילי הנייר בכל צבע שבוחרים וממתינים כמה דקות לייבוש.</p>
          </div>
        </div>

        <div style={styles.step}>
          <div style={styles.stepNumber}>2</div>
          <div style={styles.stepBody}>
            <p style={styles.stepText}>מחברים את הגלילים בשורה בעזרת נקודות דבק קטנות כדי ליצור קרונות ארוכים לרכבת.</p>
          </div>
        </div>
      </div>

      {/* כפתור סיום חגיגי דינמי המשתנה לפי מצב הלחיצה */}
      {!isFinished ? (
        <button style={styles.finishButton} onClick={() => setIsFinished(true)}>
          סיימנו, היה כיף! 🎉
        </button>
      ) : (
        <div style={styles.successBox}>
          <CheckCircle2 size={40} color="var(--color-success)" />
          <h2 style={styles.successTitle}>כל הכבוד! 🎉✨</h2>
          <p style={styles.successText}>השלמתם זמן איכות יצירתי ומדהים עם הילדים, רחוק מהמסכים.</p>
          <button style={styles.backHomeBtn} onClick={() => setCurrentPage('home')}>
            חזרה לעמוד הבית
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { 
    maxWidth: '700px', 
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
    fontSize: '28px', 
    fontWeight: '700', 
    marginBottom: '16px',
    color: 'var(--color-text-main)'
  },
  mainImage: { 
    height: '24px',
    height: '220px', 
    backgroundColor: '#EAEAEA', 
    borderRadius: 'var(--radius-lg)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    color: '#666', 
    fontSize: '16px', 
    fontWeight: '500', 
    marginBottom: '32px' 
  },
  section: { 
    backgroundColor: '#ffffff', 
    padding: '24px', 
    borderRadius: 'var(--radius-lg)', 
    marginBottom: '24px', 
    boxShadow: 'var(--shadow-soft)' 
  },
  sectionTitle: { 
    fontSize: '20px', 
    fontWeight: '700', 
    marginBottom: '16px',
    color: 'var(--color-text-main)'
  },
  checkLabel: { 
    display: 'flex', 
    alignItems: 'center', 
    margin: '12px 0', 
    fontSize: '16px', 
    cursor: 'pointer',
    fontWeight: '500'
  },
  checkbox: { 
    width: '18px', 
    height: '18px', 
    accentColor: 'var(--color-accent)', /* צבע תכלת ים על פי המפרט של שיעור 5 */
    cursor: 'pointer'
  },
  step: { 
    display: 'flex', 
    alignItems: 'flex-start', 
    gap: '16px', 
    margin: '20px 0' 
  },
  stepNumber: { 
    width: '32px', 
    height: '32px', 
    backgroundColor: 'var(--color-primary)', 
    color: '#FFFFFF', 
    borderRadius: '50%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontWeight: '700', 
    flexShrink: 0 
  },
  stepBody: { 
    flex: 1 
  },
  stepText: { 
    fontSize: '16px', 
    lineHeight: '1.6',
    color: 'var(--color-text-main)'
  },
  finishButton: { 
    width: '100%', 
    padding: '16px', 
    backgroundColor: 'var(--color-success)', /* גוון ירוק חגיגי מהמערכת */
    color: '#FFFFFF', 
    fontSize: '16px', 
    fontWeight: '700', 
    borderRadius: 'var(--radius-lg)', 
    marginTop: '16px',
    boxShadow: '0 4px 6px rgba(82, 196, 26, 0.15)'
  },
  successBox: { 
    textAlign: 'center', 
    backgroundColor: '#E6FFED', 
    border: '1px solid var(--color-success)', 
    padding: '32px', 
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  successTitle: { 
    margin: '12px 0 8px 0', 
    color: 'var(--color-text-main)',
    fontWeight: '700'
  },
  successText: { 
    fontSize: '16px',
    color: '#434343',
    marginBottom: '20px'
  },
  backHomeBtn: { 
    padding: '10px 24px', 
    backgroundColor: 'var(--color-primary)', 
    color: '#FFFFFF', 
    borderRadius: 'var(--radius-md)', 
    fontWeight: '700', 
    fontSize: '14px' 
  }
};