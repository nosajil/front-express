import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function App() {
  const [users, setUsers] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  })

  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await axios.get('http://localhost:3003/users');
        setUsers(response.data);
      } catch (error) {
        console.log(error.message);
      }
      finally {
        setIsloading(false)
      }
    };
    apiCall();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/users', users);
      console.log('heyu');
      console.log('User created:', response.data);
      setUsers({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  const renderUserCards = () => {
    // if (isLoading) return <p>Loading...</p>
    console.log(users);

    return (users && users.map((user) => {
      <>
        <Card style={{ width: '18rem' }} key={user.id}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{user.first_name} {user.last_name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </>
    }));
  };

  // if (isLoading) return <p>Loading...</p>

  return (
    <>
      <Form onSubmit={handleSubmit} method="post">
        <InputGroup className="mb-3">
          <InputGroup.Text>First name</InputGroup.Text>
          <br />
          <Form.Control
            name="first_name"
            onChange={handleInputChange}
          />
        </InputGroup>
        <br />
        <InputGroup className="mb-3">
          <InputGroup.Text>Last name</InputGroup.Text>
          <br />
          <Form.Control
            name="last_name"
            onChange={handleInputChange}
          />
        </InputGroup>
        <br />
        <InputGroup className="mb-3">
          <InputGroup.Text>Email</InputGroup.Text>
          <br />
          <Form.Control
            name="email"
            type="email"
            onChange={handleInputChange}
          />
        </InputGroup>
        <br />
        <InputGroup className="mb-3">
          <InputGroup.Text>Password</InputGroup.Text>
          <br />
          <Form.Control
            name="password"
            type="password"
            onChange={handleInputChange}
          />
        </InputGroup>
        <br />
        <Button type="submit">Create User</Button>
      </Form >

      <div>
        {renderUserCards()}
      </div>
    </>
  )
}

export default App
