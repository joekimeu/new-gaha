import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import emailjs from 'emailjs-com';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      formData,
      'YOUR_USER_ID' // Replace with your EmailJS user ID
    ).then((result) => {
      alert('Message sent successfully!');
    }, (error) => {
      alert('An error occurred, please try again.');
    });

    setFormData({ fullName: '', email: '', message: '' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="bg-light text-dark rounded p-5 shadow-lg mb-5">
            <Card.Body>
              <Card.Title className="text-center display-4 mb-5" style={{ fontWeight: 'bold', color: '#007bff' }}>
                Contact Us
              </Card.Title>
              
              <Card.Text className="text-center mb-4" style={{ fontSize: '1.25rem' }}>
                <strong>Address:</strong> <br />
                639 S. Hamilton Road, Whitehall, Ohio 43213
              </Card.Text>

              <Card.Text className="text-center mb-4" style={{ fontSize: '1.25rem' }}>
                <strong>Email:</strong> <br />
                <a href="mailto:office.manager@guardianangelha.com" style={{ color: '#007bff' }}>office.manager@guardianangelha.com</a>
              </Card.Text>

              <Card.Text className="text-center mb-4" style={{ fontSize: '1.25rem' }}>
                <strong>Numbers:</strong> <br />
                Phone: (614) 868-3225 / (614) 717-8151 <br />
                Fax: (614) 868-3437
              </Card.Text>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your full name" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Enter your message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}