// src/App.jsx
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import LoginPage from './pages/LoginPage'; // הוספת הייבוא
import { supabase } from './lib/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });
  
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedAgeRange, setSelectedAgeRange] = useState('4-6');
  
  // הוספת ניהול מצב התחברות
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // בדיקת סטטוס התחברות בטעינה
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setIsCheckingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    window.location.hash = currentPage;
  }, [currentPage]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPage(hash || 'home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isCheckingAuth) return <div>טוען...</div>;

  // אם לא מחוברים - מראים רק את דף הלוגין
  if (!isLoggedIn) {
    return (
      <div className="app-container">
        <Navbar />
        <main>
          <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
        </main>
        <Footer />
      </div>
    );
  }

  // הצגת האפליקציה למחוברים
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            setCurrentPage={setCurrentPage} 
            selectedMaterials={selectedMaterials} 
            setSelectedMaterials={setSelectedMaterials} 
            selectedAgeRange={selectedAgeRange}
            setSelectedAgeRange={setSelectedAgeRange}
          />
        );
      case 'results':
        return (
          <ResultsPage 
            setCurrentPage={setCurrentPage} 
            setSelectedActivityId={setSelectedActivityId} 
            selectedMaterials={selectedMaterials}
            selectedAgeRange={selectedAgeRange}
          />
        );
      case 'detail':
        return (
          <ActivityDetailPage 
            setCurrentPage={setCurrentPage} 
            activityId={selectedActivityId} 
          />
        );
      default:
        return (
          <HomePage 
            setCurrentPage={setCurrentPage} 
            selectedMaterials={selectedMaterials} 
            setSelectedMaterials={setSelectedMaterials} 
            selectedAgeRange={selectedAgeRange}
            setSelectedAgeRange={setSelectedAgeRange}
          />
        );
    }
  };

  return (
    <div className="app-container">
      <Navbar setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;