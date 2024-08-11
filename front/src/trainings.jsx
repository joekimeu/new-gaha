import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Trainings() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const documents = [
    { name: 'Document 1', link: '#document1' },
    { name: 'Document 2', link: '#document2' },
    { name: 'Document 3', link: '#document3' },
    { name: 'Document 4', link: '#document4' },
    { name: 'Document 5', link: '#document5' }
  ];

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="bg-light text-dark rounded p-5 shadow-lg mb-5">
            <Card.Body>
              <Card.Title className="text-center display-4 mb-5" style={{ fontWeight: 'bold', color: '#007bff' }}>
                Monthly Trainings
              </Card.Title>
              
              <Row>
                <Col md={6} className="mb-4">
                  <Card className="h-100 bg-white shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center" style={{ fontSize: '1.75rem', color: '#007bff' }}>
                        Nurses Training
                      </Card.Title>
                      <Card.Text className="text-center" style={{ fontSize: '1.25rem' }}>
                        Access the latest training materials for nurses by month.
                      </Card.Text>
                      <div className="text-center">
                        {months.map((month, index) => (
                          <Button 
                            key={index} 
                            variant="outline-primary" 
                            href={`#nurses-training-${month.toLowerCase()}`} 
                            className="m-1"
                            style={{ minWidth: '120px' }}
                          >
                            {month}
                          </Button>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="mb-4">
                  <Card className="h-100 bg-white shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center" style={{ fontSize: '1.75rem', color: '#007bff' }}>
                        Home Health Aides Training
                      </Card.Title>
                      <Card.Text className="text-center" style={{ fontSize: '1.25rem' }}>
                        Access the latest training materials for home health aides by month.
                      </Card.Text>
                      <div className="text-center">
                        {months.map((month, index) => (
                          <Button 
                            key={index} 
                            variant="outline-primary" 
                            href={`#aides-training-${month.toLowerCase()}`} 
                            className="m-1"
                            style={{ minWidth: '120px' }}
                          >
                            {month}
                          </Button>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card.Title className="text-center display-4 mb-5" style={{ fontWeight: 'bold', color: '#007bff' }}>
                Employee Documents
              </Card.Title>

              <Row>
                <Col>
                  <Card className="bg-white shadow-sm">
                    <Card.Body>
                      <Card.Text className="text-center" style={{ fontSize: '1.25rem' }}>
                        Employees can print the following documents:
                      </Card.Text>
                      <div className="text-center">
                        {documents.map((doc, index) => (
                          <Button 
                            key={index} 
                            variant="outline-secondary" 
                            href={doc.link} 
                            className="m-1"
                            style={{ minWidth: '120px' }}
                          >
                            {doc.name}
                          </Button>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="text-center mt-5">
                <Button variant="success" href="#cpr-training" className="me-3">CPR Training</Button>
                <Button variant="warning" href="#mental-health-quiz">Mental Health Quiz</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}