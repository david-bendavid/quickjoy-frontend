// src/App.jsx
import React, { useState } from 'react';
import './styles/globals.css'; // טעינת משתני הסטייל והטוקנים הגלובליים של מערכת העיצוב
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import ActivityDetailPage from './pages/ActivityDetailPage';

export default function App() {
  // ניהול עמוד נוכחי באמצעות State (מדמה החלפת עמודים מהירה ללא ספריות חיצוניות)
  const [currentPage, setCurrentPage] = useState('home');

  // פונקציית עזר שמחליטה איזה מסך להציג למשתמש על המסך בהתאם למצב הנוכחי
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'results':
        return <ResultsPage setCurrentPage={setCurrentPage} />;
      case 'detail':
        return <ActivityDetailPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* סרגל הניווט העליון המשותף לכל העמודים */}
      <Navbar setCurrentPage={setCurrentPage} />
      
      {/* התוכן המשתנה דינמית בהתאם ללחיצות המשתמש */}
      <main style={styles.mainContent}>
        {renderPage()}
      </main>
      
      {/* תחתית העמוד המשותפת לכל העמודים */}
      <Footer />
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh' /* מבטיח שהאפליקציה תפרוס תמיד על כל גובה המסך */
  },
  mainContent: {
    flex: 1, /* דוחף את הפוטר לתחתית בצורה נקייה */
    paddingBottom: '40px'
  }
};