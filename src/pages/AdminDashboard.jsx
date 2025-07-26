import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Row, Col } from 'react-bootstrap';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
  const [search, setSearch] = useState('');
  const [storeSearch, setStoreSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [usersRes, storesRes, statsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/users/with-rating-count'),
          axios.get('http://localhost:5000/api/stores/with-owner-info'),
          axios.get('http://localhost:5000/api/stats'),
        ]);

        setUsers(usersRes.data);
        setStores(storesRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    };

    fetchAllData();
  }, []);

  // Filter users
  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.role]
      .some(field => field?.toLowerCase().includes(search.toLowerCase()))
  );

  // Filter stores
  const filteredStores = stores.filter((store) =>
    [store.name, store.address, store.owner_name, store.owner_email]
      .some(field => field?.toLowerCase().includes(storeSearch.toLowerCase()))
  );

  return (
    <DashboardLayout>
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <div className="my-4">
        <h5>Statistics</h5>
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Stores: {stats.totalStores}</p>
        <p>Total Ratings: {stats.totalRatings}</p>
      </div>

      <h5>All Users</h5>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Name, Email or Role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Ratings Given</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.rating_count || 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5 className="mt-5">All Stores</h5>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Store Name, Address, Owner Name or Email"
          value={storeSearch}
          onChange={(e) => setStoreSearch(e.target.value)}
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Owner Name</th>
            <th>Owner Email</th>
            <th>Avg Rating</th>
            <th>Rating Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.owner_name || 'N/A'}</td>
              <td>{store.owner_email || 'N/A'}</td>
              <td>{store.avg_rating || 0}/5</td>
              <td>{store.rating_count || 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
