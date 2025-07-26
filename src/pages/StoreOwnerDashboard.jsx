import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';

const StoreOwnerDashboard = () => {
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [stores, setStores] = useState([]);

  const ownerId = localStorage.getItem('userId'); // assuming login stores userId

  const fetchStores = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/stores/owner/${ownerId}`);
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching stores:', err);
    }
  };

  useEffect(() => {
    if (ownerId) fetchStores();
  }, [ownerId]);

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/stores', {
        name: storeName,
        address,
        owner_id: ownerId,
      });
      setStoreName('');
      setAddress('');
      fetchStores(); // Refresh list
    } catch (err) {
      console.error('Error adding store:', err);
    }
  };

  return (
    <DashboardLayout>
    <div className="container mt-5">
      <h2>Store Owner Dashboard</h2>
      <p>Here store owners can add and view their stores with ratings.</p>

      <Form onSubmit={handleAddStore} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Store Name</Form.Label>
          <Form.Control
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">Add Store</Button>
      </Form>

      <h4>My Stores</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th><th>Address</th><th>Avg Rating</th><th>Rating Count</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
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

export default StoreOwnerDashboard;
