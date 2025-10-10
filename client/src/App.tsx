import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { FeaturesPage } from './pages/FeaturesPage';
import { AboutPage } from './pages/AboutPage';
import { PricingPage } from './pages/PricingPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Board } from './pages/Board';
import { Dashboard } from './pages/Dashboard';
import { LandingLayout } from './components/Layout/LandingLayout';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/board" element={
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
