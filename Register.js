import { Form, Button } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { Notyf } from "notyf";

import { Navigate } from 'react-router-dom';

import UserContext from '../context/UserContext.js';

export default function Register() {
    const notyf = new Notyf();
    const { user, setUser } = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (
            firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            mobileNo !== "" &&
            password !== "" &&
            confirmPassword !== "" &&
            password === confirmPassword &&
            mobileNo.length === 11
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    function registerUser(e) {
        e.preventDefault();

        fetch('http://ec2-3-16-131-196.us-east-2.compute.amazonaws.com/b1/users/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password,
                isAdmin: false // Default value as per the schema
            })
        })
            .then(res => {
                console.log("Response status:", res.status);
                return res.json();
            })
            .then(data => {
                console.log("API Response:", data);
                if (data.message === "Registered Successfully") {
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setMobileNo('');
                    setPassword('');
                    setConfirmPassword('');
                    notyf.success("Registration successful");
                    console.log(data.message);
                } else if (data.message === "Email invalid") {
                    notyf.error("Email is invalid");
                } else if (data.message === "Mobile number is invalid") {
                    notyf.error("Mobile number is invalid");
                } else if (data.message === "Password must be at least 8 characters long") {
                    notyf.error("Password must be at least 8 characters");
                } else {
                    notyf.error("Something went wrong.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                notyf.error("Something went wrong.");
            });
    }

    return (
        <Form onSubmit={(e) => registerUser(e)}>
            <h1 className="my-5 text-center">Register</h1>
            <Form.Group>
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Mobile No:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter 11 Digit No."
                    required
                    value={mobileNo}
                    onChange={e => setMobileNo(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="danger" type="submit" id="submitBtn" disabled={!isActive}>
                Submit
            </Button>
        </Form>
    );
}