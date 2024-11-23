import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function UserView({ products }) {
    return (
        <Container>
            <h1 className="my-4">Welcome to Our Store</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text><strong>{product.price}</strong></Card.Text>
                                <Button variant="primary">Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}