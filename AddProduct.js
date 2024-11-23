import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../context/UserContext.js';
import { Notyf } from 'notyf';

export default function AddProduct() {
    const notyf = new Notyf();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    function createProduct(e) {
        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch('http://ec2-3-16-131-196.us-east-2.compute.amazonaws.com/b1/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                setName("");
                setDescription("");
                setPrice(0);

                notyf.success("Product Added");
                navigate("/products");
            } else {
                notyf.error("Error: Something Went Wrong.");
            }
        })
        .catch(error => {
            console.error('Error adding product:', error);
            notyf.error('Error adding product');
        });
    }

    return (
        <>
            <h1 className="my-5 text-center">Add Product</h1>
            <Form onSubmit={e => createProduct(e)}>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Description"
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Price"
                        required
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="my-5">Submit</Button>
            </Form>
        </>
    );
}