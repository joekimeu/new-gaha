import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Prospective() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="bg-light text-dark rounded p-5 shadow-lg mb-5">
            <Card.Body>
              <Card.Title className="text-center display-4 mb-5" style={{ fontWeight: 'bold', color: '#007bff' }}>
                Join Guardian Angel Health Agency
              </Card.Title>
              
              <Card.Text className="text-center mb-4" style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
                <strong style={{ color: '#007bff' }}>Commitment to Positive Patient Outcomes</strong> <br />
                We work with patients to provide care of the utmost quality.
              </Card.Text>

              <Card.Text className="text-center mb-4" style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
                <strong style={{ color: '#007bff' }}>Experienced Medical Professionals</strong> <br />
                We host nursing staff with 20+ years of experience.
              </Card.Text>

              <Card.Text className="text-center mb-4" style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
                <strong style={{ color: '#007bff' }}>Competitive Pay & Flexible Hours</strong> <br />
                We offer great pay and flexible hours that can fit into your tight schedule.
              </Card.Text>

              <Card.Text className="text-center mb-4" style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
                <strong style={{ color: '#007bff' }}>Start as Soon as You Are Available</strong> <br />
                We offer a quick yet comprehensive onboarding and training process.
              </Card.Text>

              <Card.Text className="text-center mb-4" style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
                <strong style={{ color: '#007bff' }}>Exceptional Home Health Care that Benefits the Society</strong> <br />
                We improve communities by following core principles, placing patients first, promoting employee well-being, and giving back.
              </Card.Text>

              <Card.Text className="text-center mb-5" style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
                <strong style={{ color: '#007bff' }}>Help Better Our Community and Our World!</strong> <br />
                Complete an Application!
              </Card.Text>

              <div className="text-center">
                <Button variant="primary" href="#application" className="me-3">Application</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}