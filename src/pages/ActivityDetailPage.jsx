import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function ActivityDetailPage({ activityId, setCurrentPage }) {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!activityId) return;
      
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('id', activityId)
        .single();
        
      if (error) {
        console.error("Error fetching activity:", error);
      } else {
        setActivity(data);
      }
    };
    fetchDetails();
  }, [activityId]);

  if (!activity) return <div>טוען...</div>;

  const renderSteps = (stepsText) => {
    if (!stepsText) return null;
    const stepsArray = stepsText.split(/(?=\d+\.)/); 
    return stepsArray.map((step, index) => (
      <div key={index} className="step-item" style={{ marginBottom: '12px' }}>
        {step.trim()}
      </div>
    ));
  };

  return (
    <div className="activity-detail-container">
      <button onClick={() => setCurrentPage('results')}>
        ← חזור לתוצאות
      </button>

      {/* הוספת התמונה כאן */}
      {activity.image_url && (
        <img src={activity.image_url} alt={activity.title} className="activity-image" />
      )}

      <h1 className="activity-header">{activity.title}</h1>
      <p>{activity.description}</p>
      
      <div className="activity-tags">
        <span className="tag tag-age">גיל: {activity.min_age}+</span>
        <span className="tag tag-time">זמן: {activity.duration_minutes} דק׳</span>
      </div>

      <h3>שלבי ביצוע:</h3>
      <div className="instructions-section">
        {renderSteps(activity.instructions)}
      </div>
    </div>
  );
}

export default ActivityDetailPage;