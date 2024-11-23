import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { Notyf } from "notyf";
import UserContext from '../context/UserContext.js';

export default function Login() {
    const notyf = new Notyf();
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {
        e.preventDefault();
        fetch('http://ec2-3-16-131-196.us-east-2.compute.amazonaws.com/b1/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access !== undefined) {
                console.log(data.access);
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access); // Call retrieveUserDetails here
                setEmail('');
                setPassword('');
                notyf.success(`Logged In Successfully`);
            } else if (data.message === "Incorrect email or password") {
                notyf.error(`Incorrect email or password`);
            } else {
                notyf.error(`${email} does not exist`);
            }
        });
    }
function retrieveUserDetails(token) {
    fetch('http://ec2-3-16-131-196.us-east-2.compute.amazonaws.com/b1/users/details', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        // Access the nested 'user' object
        const userDetails = data.user;
        if (userDetails && userDetails._id && userDetails.isAdmin !== undefined) {
            setUser({
                id: userDetails._id,
                isAdmin: userDetails.isAdmin
            });
        } else {
            console.error("User details response is missing required fields", data);
        }
    })
    .catch(err => {
        console.error("Failed to retrieve user details", err);
    });
}

    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    return (
        (user.id !== null) ?
            <Navigate to="/products" />
            :
            <Form onSubmit={(e) => authenticate(e)}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                {isActive ?
                    <Button variant="primary" type="submit" id="loginBtn">
                        Login
                    </Button>
                    :
                    <Button variant="danger" type="submit" id="loginBtn" disabled>
                        Login
                    </Button>
                }
            </Form>
    );
}