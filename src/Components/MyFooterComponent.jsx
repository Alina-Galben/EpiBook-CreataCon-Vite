import React from "react"
import { Container, Row, Col } from "react-bootstrap";

export default function MyFooterComponent() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
        <Container>
            <Row>
                <Col>
                    <h5>Contatti</h5>
                    <p>Email: info@example.com</p>
                    <p>Telefono: +39 123 456 7890</p>
                </Col>
                <Col className="text-center">
                    <h5>Seguici</h5>
                    <p>
                        <a href="https://www.facebook.com/" className="text-light">Facebook</a>
                    </p>
                    <p>
                        <a href="https://x.com/" className="text-light"> Twitter</a> 
                    </p>
                    <p>
                        <a href="https://www.instagram.com/" className="text-light"> Instagram</a>
                    </p>
                </Col>
                <Col className="text-md-end">
                    <h5>© 2025 Nome Azienda</h5>
                    <p>Tutti i diritti riservati.</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}