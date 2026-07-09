// src/pages/ResultsPage.jsx
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import React from 'react';
import { Clock, ArrowRight } from 'lucide-react'; 

export default function ResultsPage({ setCurrentPage, setSelectedActivityId, selectedMaterials = [], selectedAgeRange = 'עד גיל 6' }) { 
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      const { data, error } = await supabase.from('activities').select('*');
      if (error) {
        console.error('Error fetching activities:', error);
      } else {
        setActivities(data || []);
      }
      setIsLoading(false);
    }
    fetchActivities();
  }, []);

  // 🪄 מנוע הסינון המרכזי: חומרים + טווחי הגילאים החדשים (עד גיל 3 / עד גיל 6)
  const filteredActivities = activities.filter(activity => {
    // 1. הגנה: אם המשתמש לא בחר אף חומר, לא מציגים פעילויות בכלל
    if (selectedMaterials.length === 0) return false;

    // 2. סינון לפי קבוצת הגיל החדשה
    const minAge = activity.min_age;
    // אם נבחר "עד גיל 3", נסתיר פעילויות שדורשות גיל מינימלי גבוה מ-3
    if (selectedAgeRange === 'עד גיל 3' && minAge > 3) return false;
    // אם נבחר "עד גיל 6", נסתיר פעילויות שדורשות גיל מינימלי גבוה מ-6
    if (selectedAgeRange === 'עד גיל 6' && minAge > 6) return false;

    // 3. סינון לפי חומרי גלם
    let actMats = [];
    if (Array.isArray(activity.materials)) {
      actMats = activity.materials;
    } else if (typeof activity.materials === 'string') {
      actMats = activity.materials.split(',').map(m => m.trim()).filter(Boolean);
    }

    if (actMats.length === 0) return false; 

    return actMats.every(material => selectedMaterials.includes(material));
  });

  // מנגנון ניהול כותרות והודעות דינמיות עם הניסוחים החדשים
  let pageTitle = '';
  if (isLoading) {
    pageTitle = 'מחפש פעילויות... ⏳';
  } else if (selectedMaterials.length === 0) {
    pageTitle = 'אופס! שכחתם לסמן חומרים. נא לחזור ולבחור מה יש בבית 🏠';
  } else if (filteredActivities.length > 0) {
    pageTitle = `מצאנו ${filteredActivities.length} פעילויות מושלמות המתאימות לילדים ${selectedAgeRange}! ✨`;
  } else {
    pageTitle = `לא מצאנו פעילויות שמתאימות בדיוק לחומרים וגם מותאמות לילדים ${selectedAgeRange}. נסו לסמן עוד חומרים! 🤷‍♂️`;
  }

  return (
    <div style={styles.container}>
      <div style={styles.breadcrumbs} onClick={() => setCurrentPage('home')}>
        <ArrowRight size={16} style={{ marginLeft: '4px' }} /> 
        <span>חזרה לשינוי חומרים וגיל</span>
      </div>

      <h2 style={styles.title}>{pageTitle}</h2>
      
      <div style={styles.grid}>
        {filteredActivities.map((activity) => (
          <div key={activity.id} style={styles.card}>
            
            {activity.image_url ? (
              <img 
                src={activity.image_url} 
                alt={activity.title} 
                className="activity-card-image" 
              />
            ) : (
              <div style={styles.imagePlaceholder}>
                <span style={{ fontSize: '48px' }}>🎨</span> 
              </div>
            )}
    
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{activity.title}</h3>
      
              <div style={styles.badgeContainer}>
                <span style={styles.badge}>
                  <Clock size={14} style={{ marginLeft: '4px' }} /> 
                  {activity.duration_minutes} דקות
                </span>
                <span style={{ ...styles.badge, backgroundColor: '#FFEC3D', marginRight: '8px' }}>
                  גיל {activity.min_age}+
                </span>
              </div>
      
              <button 
                style={styles.cardButton} 
                onClick={() => {
                  setSelectedActivityId(activity.id);
                  setCurrentPage('detail');
                }}
              >
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
  container: { maxWidth: '1000px', margin: '40px auto', padding: '0 16px', direction: 'rtl' },
  breadcrumbs: { color: 'var(--color-primary)', cursor: 'pointer', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', fontSize: '14px', userSelect: 'none' },
  title: { fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: 'var(--color-text-main)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' },
  card: { backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s ease-in-out' },
  imagePlaceholder: { height: '150px', backgroundColor: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' },
  cardContent: { padding: '0 20px 20px 20px', display: 'flex', flexDirection: 'column', flexGrow: 1 },
  cardTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '12px', minHeight: '50px', lineHeight: '1.4', color: 'var(--color-text-main)' },
  badgeContainer: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
  badge: { backgroundColor: '#F0F0F0', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', color: 'var(--color-text-main)' },
  cardButton: { width: '100%', padding: '12px', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontWeight: '700', fontSize: '14px', borderRadius: 'var(--radius-lg)', marginTop: 'auto', cursor: 'pointer', border: 'none' }
};