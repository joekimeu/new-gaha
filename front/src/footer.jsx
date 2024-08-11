import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Guardian Angel Health Agency LLC. All rights reserved.</p>
            <p>639 S. Hamilton Road, Whitehall, Ohio 43213 | Phone: (614) 868-3225 | Fax: (614) 868-3437</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}