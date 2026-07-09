// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase'; 

const MATERIAL_ICONS = {
  'כריות': '🛋️',
  'בקבוקים ריקים': '🍾',
  'כדור': '⚽',
  'דבק פלסטי לבן': '🧴',
  'דפים': '📄',
  'מלח': '🧂',
  'מכחול': '🖌️',
  'מים': '💧',
  'צבע מים': '🎨',
  'פנס': '🔦',
  'גליל ריק': '🧻',
  'צבעים': '🖍️',
  'מספריים': '✂️'
};

export default function HomePage({ setCurrentPage, selectedMaterials, setSelectedMaterials, selectedAgeRange, setSelectedAgeRange }) {
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const { data, error } = await supabase.from('activities').select('materials');
        
        if (error) {
          console.error('Error fetching materials:', error);
          setErrorMsg('שגיאה בטעינת החומרים. ודא שעמודת materials קיימת בטבלה.');
          setIsLoading(false);
          return;
        }

        if (data) {
          const allMaterials = data.flatMap(activity => {
            if (!activity.materials) return [];
            if (Array.isArray(activity.materials)) return activity.materials;
            if (typeof activity.materials === 'string') {
              return activity.materials.split(',').map(item => item.trim());
            }
            return [];
          });
          
          const uniqueMaterials = [...new Set(allMaterials.filter(Boolean))];
          
          const formattedMaterials = uniqueMaterials.map((mat) => ({
            id: mat,
            name: mat,
            icon: MATERIAL_ICONS[mat] || '✨'
          }));

          setAvailableMaterials(formattedMaterials);
        }
      } catch (err) {
        setErrorMsg('תקלת רשת.');
      }
      setIsLoading(false);
    }

    fetchMaterials();
  }, []);

  const toggleMaterial = (matName) => {
    if (selectedMaterials.includes(matName)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== matName));
    } else {
      setSelectedMaterials([...selectedMaterials, matName]);
    }
  };

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.title}>מה יש לכם בבית עכשיו? 🏠</h1>
        <p style={styles.subtitle}>סמנו את חומרי היצירה הזמינים ותקבלו רעיון לפעילות תוך פחות מ-60 שניות!</p>
      </section>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>1. בחרו חומרי גלם זמינים בארון:</h3>
        
        <div style={styles.grid}>
          {isLoading ? (
            <p style={{ color: '#666' }}>שולף את החומרים מהארון (Supabase)... ⏳</p>
          ) : errorMsg ? (
            <p style={{ color: 'red' }}>{errorMsg}</p>
          ) : availableMaterials.length === 0 ? (
            <p style={{ color: '#FF7A45' }}>עדיין אין חומרים ב-Supabase.</p>
          ) : (
            availableMaterials.map((material) => {
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
            })
          )}
        </div>

        <h3 style={styles.sectionTitle}>2. גיל הילד/ה:</h3>
        
        <div style={styles.ageSelector}>
          {/* עדכון הערכים והתצוגה לטקסט החדש שביקשת */}
          {['עד גיל 3', 'עד גיל 6'].map((range) => (
            <label key={range} style={styles.radioLabel}>
              <input 
                type="radio" 
                name="age" 
                value={range} 
                checked={selectedAgeRange === range}
                onChange={(e) => setSelectedAgeRange(e.target.value)}
                style={styles.radioInput}
              />
              <span>{range}</span>
            </label>
          ))}
        </div>

        <button style={styles.ctaButton} onClick={() => setCurrentPage('results')}>
          <Sparkles size={18} style={{ marginLeft: '8px' }} />
          מצא לי פעילות! 🎉
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '800px', margin: '40px auto', padding: '0 16px', direction: 'rtl' },
  hero: { textAlign: 'center', marginBottom: '32px' },
  title: { fontSize: '32px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '8px' },
  subtitle: { fontSize: '16px', color: '#666', lineHeight: '1.6' },
  card: { background: '#ffffff', padding: '32px', borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.03)' },
  sectionTitle: { fontSize: '18px', fontWeight: '700', margin: '24px 0 12px 0', color: '#262626' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '12px' },
  tag: { padding: '12px 20px', borderRadius: '16px', border: '1px solid #D9D9D9', cursor: 'pointer', fontWeight: '500', fontSize: '16px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' },
  ageSelector: { display: 'flex', gap: '24px', margin: '16px 0', flexWrap: 'wrap' },
  radioLabel: { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '16px', fontWeight: '500', color: '#262626' },
  radioInput: { marginLeft: '8px', width: '18px', height: '18px', accentColor: '#FF7A45' },
  ctaButton: { width: '100%', padding: '16px', backgroundColor: '#FF7A45', color: '#FFFFFF', fontWeight: '700', fontSize: '16px', borderRadius: '16px', border: 'none', marginTop: '32px', cursor: 'pointer' }
};