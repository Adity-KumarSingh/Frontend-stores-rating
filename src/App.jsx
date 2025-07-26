
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/*" element={<ProtectedRoute role="admin" />}>
        <Route index element={<AdminDashboard />} />
      </Route>
      <Route path="/user/*" element={<ProtectedRoute role="user" />}>
        <Route index element={<UserDashboard />} />
      </Route>
      <Route path="/store-owner/*" element={<ProtectedRoute role="store_owner" />}>
        <Route index element={<StoreOwnerDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
