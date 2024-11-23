import React, { useEffect, useState } from 'react';
import AdminView from '../components/AdminView.js';
import UserView from '../components/UserView.js';

export default function Products({ isAdmin }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://ec2-3-16-131-196.us-east-2.compute.amazonaws.com/b1/products/active`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return isAdmin ? (
        <AdminView productsData={products} fetchData={() => {}} />
    ) : (
        <UserView products={products} />
    );
}