import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function OperatingCommittee() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="bg-light text-dark rounded p-5 shadow-lg">
            <Card.Body>
              <Card.Title className="text-center display-4 mb-5" style={{ fontWeight: 'bold', color: '#007bff' }}>
                Operating Committee
              </Card.Title>
              
              <Card.Text className="mb-5" style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
                <strong style={{ color: '#007bff' }}>Thomas Kamau, PhD, MPH, MBA</strong> <br />
                <em>Founder and Board Member</em> <br />
                Thomas Kamau is the Founder and a current Board Member of Guardian Angel Health Agency. He is also an Associate Professor of Health Sciences at Ohio University in Athens, Ohio, where he has published papers on epidemiology, teaches about Health Service Administration, and coordinates the Health Services Administration Program. <br />
                <strong>Contact:</strong> <a href="mailto:thomas@guardianangelha.com" style={{ color: '#007bff' }}>thomas@guardianangelha.com</a>
              </Card.Text>

              <Card.Text className="mb-5" style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
                <strong style={{ color: '#007bff' }}>Anne Mulama, RN, BSN</strong> <br />
                <em>Chief Executive Officer and Director of Clinical Services</em> <br />
                Anne Mulama is the Director of Clinical Services at Guardian Angel Health Agency. She brings more than 15 years of nursing experience from various hospitals, including The Ohio State University, the Cleveland Clinic, OhioHealth, and Alta Bates Summit Medical in San Francisco, California. <br />
                <strong>Contact:</strong> <a href="mailto:anne@guardianangelha.com" style={{ color: '#007bff' }}>anne@guardianangelha.com</a>
              </Card.Text>

              <Card.Text style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
                <strong style={{ color: '#007bff' }}>Lora Dickerson</strong> <br />
                <em>Office Manager</em> <br />
                Lora Dickerson is the Office Manager at Guardian Angel Health Agency. <br />
                <strong>Contact:</strong> <a href="mailto:office.manager@guardianangelha.com" style={{ color: '#007bff' }}>office.manager@guardianangelha.com</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}