import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import DashboardLayout from '../components/DashboardLayout';

const UserDashboard = () => {
  const userId = localStorage.getItem('userId');
  const [unratedStores, setUnratedStores] = useState([]);
  const [ratedStores, setRatedStores] = useState([]);
  const [ratings, setRatings] = useState({}); 

  const fetchStores = async () => {
    try {
      const unratedRes = await axios.get(`https://backend-stores-rating-production.up.railway.app/api/stores/unrated/${userId}`);
      const ratedRes = await axios.get(`https://backend-stores-rating-production.up.railway.app/api/stores/rated/${userId}`);
      setUnratedStores(unratedRes.data);
      setRatedStores(ratedRes.data);
    } catch (err) {
      console.error('Error fetching stores:', err);
    }
  };

  useEffect(() => {
    if (userId) fetchStores();
  }, [userId]);

  const handleRate = async (storeId) => {
    try {
      const ratingValue = ratings[storeId];
      if (!ratingValue) return;

      await axios.post('https://backend-stores-rating-production.up.railway.app/api/ratings', {
        store_id: storeId,
        user_id: userId,
        rating: ratingValue,
      });

      fetchStores(); 
    } catch (err) {
      console.error('Rating error:', err);
    }
  };

  return (
    <DashboardLayout>
    <div className="container mt-4">
      <h2>User Dashboard</h2>

      <h4 className="mt-4">Stores You Have Not Rated</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Avg Rating</th>
            <th>Total Ratings</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {unratedStores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.avg_rating || 0}/5</td>
              <td>{store.rating_count || 0}</td>
              <td>
                <Form.Select
                  size="sm"
                  value={ratings[store.id] || ''}
                  onChange={(e) =>
                    setRatings({ ...ratings, [store.id]: parseInt(e.target.value) })
                  }
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleRate(store.id)}
                  disabled={!ratings[store.id]}
                >
                  Submit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4 className="mt-4">Stores You Have Rated</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Your Rating</th>
            <th>Avg Rating</th>
            <th>Total Ratings</th>
          </tr>
        </thead>
        <tbody>
          {ratedStores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.user_rating}/5</td>
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

export default UserDashboard;
