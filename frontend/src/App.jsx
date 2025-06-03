import './App.css'
import { Routes, Route } from 'react-router';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import AuthProvider from './context/AuthContext';
import Home from './pages/Home';
import PrivateGuard from './components/guards/PrivateGuard';
import PublicGuard from './components/guards/PublicGuard';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<PublicGuard><LogIn /></PublicGuard>} />
        <Route path="/register" element={<PublicGuard><Register /></PublicGuard>} />
        <Route path="/" element={<PrivateGuard><Home /></PrivateGuard>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
