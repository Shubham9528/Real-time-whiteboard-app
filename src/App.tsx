import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { FeaturesPage } from './pages/FeaturesPage';
import { AboutPage } from './pages/AboutPage';
import { PricingPage } from './pages/PricingPage';
import { LandingLayout } from './components/Layout/LandingLayout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={
          <LandingLayout>
            <FeaturesPage />
          </LandingLayout>
        } />
        <Route path="/about" element={
          <LandingLayout>
            <AboutPage />
          </LandingLayout>
        } />
        <Route path="/pricing" element={
          <LandingLayout>
            <PricingPage />
          </LandingLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
