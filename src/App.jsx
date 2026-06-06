import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import Guide from './pages/Guide';
import News from './pages/News';
import Upload from './pages/Upload';
import Gallery from './pages/Gallery';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed transition-colors duration-300">
          {/* Header */}
          <Header />

          {/* Main Content Pages */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/news" element={<News />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />

          {/* Global Login Modal */}
          <LoginModal />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
