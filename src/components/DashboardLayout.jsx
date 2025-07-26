// src/components/DashboardLayout.jsx
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{user?.role?.replace('_', ' ').toUpperCase()} Dashboard</h2>
        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
      </div>
      {children}
    </Container>
  );
};

export default DashboardLayout;
