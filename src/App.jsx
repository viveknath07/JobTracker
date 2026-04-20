import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApplicationProvider } from './context/ApplicationContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import EditApplication from './pages/EditApplication';
import Analytics from './pages/Analytics';
import Bookmarks from './pages/Bookmarks';
import './App.css';

export default function App() {
  return (
    <ApplicationProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/new" element={<AddApplication />} />
            <Route path="/applications/:id" element={<EditApplication />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          theme="dark"
          toastStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
        />
      </BrowserRouter>
    </ApplicationProvider>
  );
}
