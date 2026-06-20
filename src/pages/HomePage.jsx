// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react'; // שימוש באייקון אחיד מסדרת Lucide

// רשימת חומרי היצירה והמשחק הנפוצים בארונות ביתיים
const AVAILABLE_MATERIALS = [
  { id: '1', name: 'גלילי נייר', icon: '🧻' },
  { id: '2', name: 'קרטון', icon: '📦' },
  { id: '3', name: 'צבעי גואש', icon: '🎨' },
  { id: '4', name: 'דבק בהיר', icon: '🧪' },
  { id: '5', name: 'מספריים', icon: '✂️' },
  { id: '6', name: 'מקלות ארטיק', icon: '🥢' },
  { id: '7', name: 'פלסטלינה', icon: '🧸' }
];

export default function HomePage({ setCurrentPage }) {
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [age, setAge] = useState('4-6');

  // פונקציה שמנהלת את סימון והסרת חומרי הגלם מהמלאי הזמין
  const toggleMaterial = (id) => {
    if (selectedMaterials.includes(id)) {
      setSelectedMaterials(selectedMaterials.filter(mId => mId !== id));
    } else {
      setSelectedMaterials([...selectedMaterials, id]);
    }
  };

  return (
    <div style={styles.container}>
      {/* אזור ה-Hero: כותרת ראשית חמה ומסבירת פנים להורה הלחוץ */}
      <section style={styles.hero}>
        <h1 style={styles.title}>מה יש לכם בבית עכשיו? 🏠</h1>
        <p style={styles.subtitle}>סמנו את חומרי היצירה הזמינים ותקבלו רעיון לפעילות תוך פחות מ-60 שניות!</p>
      </section>

      {/* כרטיסיית המערכת המרכזית */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>1. בחרו חומרי גלם זמינים בארון:</h3>
        
        {/* גריד רספונסיבי של תגיות חומרי גלם אינטראקטיביות */}
        <div style={styles.grid}>
          {AVAILABLE_MATERIALS.map((material) => {
            const isSelected = selectedMaterials.includes(material.id);
            return (
              <div 
                key={material.id} 
                onClick={() => toggleMaterial(material.id)}
                style={{
                  ...styles.tag,
                  backgroundColor: isSelected ? 'var(--color-accent)' : '#FFFFFF',
                  borderColor: isSelected ? 'var(--color-accent)' : '#D9D9D9',
                  color: isSelected ? '#FFFFFF' : 'var(--color-text-main)'
                }}
              >
                <span style={{ marginLeft: '6px' }}>{material.icon}</span>
                <span>{material.name}</span>
                {isSelected && <span style={{ marginRight: '6px', fontSize: '12px' }}>✓</span>}
              </div>
            );
          })}
        </div>

        <h3 style={styles.sectionTitle}>2. גיל הילד/ה:</h3>
        
        {/* בחירת קבוצת גיל בעזרת כפתורי רדיו נקיים */}
        <div style={styles.ageSelector}>
          {['2-3', '4-6', '7-10'].map((range) => (
            <label key={range} style={styles.radioLabel}>
              <input 
                type="radio" 
                name="age" 
                value={range} 
                checked={age === range} 
                onChange={(e) => setAge(e.target.value)}
                style={styles.radioInput}
              />
              <span>גילאי {range}</span>
            </label>
          ))}
        </div>

        {/* לחצן הפעולה המרכזי (CTA) המבוסס על צבע הכתום הראשי של האפליקציה */}
        <button style={styles.ctaButton} onClick={() => setCurrentPage('results')}>
          <Sparkles size={18} style={{ marginLeft: '8px' }} />
          מצא לי פעילות! 🎉
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    maxWidth: '800px', 
    margin: '40px auto', 
    padding: '0 16px' 
  },
  hero: { 
    textAlign: 'center', 
    marginBottom: '32px' 
  },
  title: { 
    fontSize: '32px', 
    fontWeight: '700', 
    color: 'var(--color-text-main)', 
    marginBottom: '8px' 
  },
  subtitle: { 
    fontSize: '16px', 
    color: '#666',
    lineHeight: '1.5'
  },
  card: { 
    backgroundColor: '#ffffff', 
    padding: '32px', 
    borderRadius: 'var(--radius-lg)', /* 16px על פי מפרט העיצוב המלא */
    boxShadow: 'var(--shadow-soft)' 
  },
  sectionTitle: { 
    fontSize: '18px', 
    fontWeight: '700', 
    margin: '24px 0 12px 0',
    color: 'var(--color-text-main)'
  },
  grid: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '12px' 
  },
  tag: { 
    padding: '12px 20px', 
    borderRadius: 'var(--radius-lg)', 
    border: '1px solid', 
    cursor: 'pointer', 
    fontWeight: '500', 
    fontSize: '14px',
    display: 'flex', 
    alignItems: 'center',
    userSelect: 'none',
    transition: 'all 0.2s ease-in-out'
  },
  ageSelector: { 
    display: 'flex', 
    gap: '24px', 
    margin: '16px 0',
    flexWrap: 'wrap'
  },
  radioLabel: { 
    display: 'flex', 
    alignItems: 'center', 
    cursor: 'pointer', 
    fontSize: '16px',
    fontWeight: '500'
  },
  radioInput: { 
    marginLeft: '8px', 
    width: '18px',
    height: '18px',
    accentColor: 'var(--color-primary)' 
  },
  ctaButton: { 
    width: '100%', 
    padding: '16px', 
    backgroundColor: 'var(--color-primary)', /* צבע כתום שקיעה */
    color: '#FFFFFF', 
    fontSize: '16px', 
    fontWeight: '700', 
    borderRadius: 'var(--radius-lg)', 
    marginTop: '32px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(255, 122, 69, 0.15)'
  }
};