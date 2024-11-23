import { Button } from 'react-bootstrap';
import {Notyf}  from 'notyf';
import {useState}  from 'react';


export default function ArchiveProducts({ product, isActive, fetchData }) {
    const notyf= new Notyf();
    const [productId,setProductId]=useState(product._id);
    const archiveToggle = () => {
        fetch(`http://ec2-3-16-131-196.us-east-2.compute.amazonaws.com/b1/products/${productId}/archive`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        //response
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.success===true) {
                // Display notification
               notyf.success('Successfully archived');
                 // Fetch updated data
                fetchData();
            } else {
                notyf.error('Something went wrong');
                fetchData();
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const activateToggle = () => {
        fetch(`http://ec2-3-16-131-196.us-east-2.compute.amazonaws.com/b1/products/${productId}/activate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        //response
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.success===true) {
                // Display notification
               notyf.success("Successfully activated");
                 // Fetch updated data
                fetchData();
            } else {
                notyf.error('Something went wrong');
                fetchData();
            }
        })
        .catch(error => console.error('Error:', error));
    };



    return (

        <>
         {isActive ?

                <Button variant="danger" size="sm" onClick={() => archiveToggle()}>Archive</Button>

                :

                <Button variant="success" size="sm" onClick={() => activateToggle()}>Activate</Button>

            }
</>

    );
}
