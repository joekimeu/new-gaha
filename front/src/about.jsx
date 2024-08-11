import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function AboutPage() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="bg-light text-dark rounded p-5 shadow-lg">
            <Card.Body>
              <Card.Title className="text-center display-4 mb-4" style={{ fontWeight: 'bold', color: '#007bff' }}>
                Guardian Angel Health Agency LLC
              </Card.Title>
              <Card.Subtitle className="text-center mb-5" style={{ fontSize: '1.5rem', color: '#6c757d' }}>
                Close to Heart, Close to Home
              </Card.Subtitle>
              
              <Card.Text className="mb-4" style={{ fontSize: '1.25rem' }}>
                <strong>Contact Information:</strong> <br />
                639 S. Hamilton Road, Whitehall, Ohio 43213 <br />
                Phone: (614) 868-3225 / (614) 717-8151 <br />
                Fax: (614) 868-3437 <br />
                Email: <a href="mailto:office.manager@guardianangelha.com" style={{ color: '#007bff' }}>office.manager@guardianangelha.com</a>
              </Card.Text>

              <Card.Text className="mb-4" style={{ fontSize: '1.25rem' }}>
                <strong>About Us:</strong> <br />
                Our mission is to nurture health to promote the welfare of individuals and families by providing compassionate and comprehensive patient-centered quality home health care that is safe and dependable.
              </Card.Text>

              <Card.Text className="mb-4" style={{ fontSize: '1.25rem' }}>
                <strong>Now Offering:</strong> <br />
                TB Tests, FBI and BCI Background Checks
              </Card.Text>

              <Card.Text className="mb-4" style={{ fontSize: '1.25rem' }}>
                <strong>Our Trained Staff Consists of:</strong> <br />
                Registered Nurses (RN), Licensed Practical Nurses (LPN), State Tested Nursing Assistants (STNA), Home Health Aides, Physical Therapists, Occupational Therapists, Speech Therapists
              </Card.Text>

              <Card.Text className="mb-4" style={{ fontSize: '1.25rem' }}>
                <strong>Our Staff Provide Exceptional Services in:</strong> <br />
                Skilled Nursing, Physical Therapy, Occupational Therapy, Speech Therapy, Case Management, Home Health Aides, 24/7 On-call Staff
              </Card.Text>

              <Card.Text style={{ fontSize: '1.25rem' }}>
                <strong>We Accept These Insurances:</strong> <br />
                Medicare, Medicaid, DODD, Aetna, Molina, Buckeye, Passport and more
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}