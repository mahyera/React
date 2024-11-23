import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import EditProducts from '../components/EditProducts.js';
import ArchiveProducts from '../components/ArchiveProducts.js';

export default function AdminView({ productsData = [], fetchData }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (Array.isArray(productsData)) {
            const productsArr = productsData.map(product => (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td>
                        <EditProducts product={product} fetchData={fetchData} />
                    </td>
                    <td className="text-center">
                        <ArchiveProducts
                            product={product}
                            isActive={product.isActive}
                            fetchData={fetchData}
                        />
                    </td>
                </tr>
            ));

            setProducts(productsArr);
        } else {
            console.error("Products Data is not an array:", productsData);
        }
    }, [productsData, fetchData]);

    return (
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
            </Table>
        </>
    );
}