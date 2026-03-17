import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import SearchResults from './pages/SearchResults';
import DoctorDetail from './pages/DoctorDetail';
import BloodBank from './pages/BloodBank';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DoctorProvider } from './context/DoctorContext';
import { MessageProvider } from './context/MessageContext';
import { StaffProvider } from './context/StaffContext';
import { LanguageProvider } from './context/LanguageContext';
import { BloodBankProvider } from './context/BloodBankContext';
import ConfigCheck from './components/ConfigCheck';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-medical-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DoctorProvider>
          <MessageProvider>
            <StaffProvider>
              <BloodBankProvider>
                <ConfigCheck>
                <Router>
                  <ScrollToTop />
                  <div className="flex flex-col min-h-screen">
                    <Routes>
                      {/* Admin Routes - No Navbar/Footer */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route 
                        path="/admin/dashboard" 
                        element={
                          <ProtectedRoute>
                            <AdminDashboard />
                          </ProtectedRoute>
                        } 
                      />

                      {/* Public Routes */}
                      <Route
                        path="*"
                        element={
                          <>
                            <Navbar />
                            <main className="flex-grow">
                              <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/services" element={<Services />} />
                                <Route path="/doctors" element={<Doctors />} />
                                <Route path="/doctors/:id" element={<DoctorDetail />} />
                                <Route path="/blood-bank" element={<BloodBank />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/search" element={<SearchResults />} />
                              </Routes>
                            </main>
                            <Footer />
                          </>
                        }
                      />
                    </Routes>
                  </div>
                </Router>
              </ConfigCheck>
            </BloodBankProvider>
          </StaffProvider>
        </MessageProvider>
      </DoctorProvider>
    </AuthProvider>
  </LanguageProvider>
  );
}
