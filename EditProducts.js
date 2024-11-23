import {Button, Modal, Form} from 'react-bootstrap';
import {useState} from 'react';
import {Notyf}  from 'notyf';


export default function EditProduct({product, fetchData}){
const notyf= new Notyf();

	const [productId, setproductId]= useState(product._id);
	const[name, setName] = useState(product.name);
	const[description,setDescription]= useState(product.description);
	const[price,setPrice]= useState(product.price);
	const[showEdit,setShowEdit]=useState(false);

	const openEdit=()=>{
		setShowEdit(true)
	}
	const closeEdit =() =>{
		setShowEdit(false);
		setName('');
		setDescription('');
		setPrice(0);
	}

	const editCourse = (e, productId)=>{
		e.preventDefault();
		fetch(`http://ec2-3-16-131-196.us-east-2.compute.amazonaws.com/b1/products/${productId}`,{
			method:'PATCH',
			Headers:{
				'Content-type':'application/json',
				Authorization:`Bearer ${localStorage.getItem('token')}`
			},
			Body:JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res=> res.json())
		.then(data=>{
			console.log(data);
			if(data.success === true){
				notyf.success("Successfully Updated");
				closeEdit();
				fetchData();
			}
			else{
				notyf.error("Something went wrong");
				closeEdit();
				fetchData();			}
		})

	}

	return(
			<>
				<Button variant="primary" size="sm" onClick={()=>openEdit(product)}>Edit</Button>
				{/*Edit Modal*/}

				<Modal show={showEdit} onHide={closeEdit}>
					<Form onSubmit={e=>editCourse(e,productId)}>
						<Modal.Header>
							<Modal.Title>Edit Course</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group controlId="productName">
								<Form.Label>Name</Form.Label>
								<Form.Control 
								type="text"
								value={name}
								onChange={e=>setName(e.target.value)} 
								required/>
							</Form.Group>
							<Form.Group controlId="productDescription">
								<Form.Label>Description</Form.Label>
								<Form.Control
								type="text"
								value={description}
								onChange={e=>setDescription(e.target.value)} 
								required
								/>
							</Form.Group>
							<Form.Group controlId="prodductPrice">
								<Form.Label>Price</Form.Label>
								<Form.Control 
								type="number"
								value={price}
								onChange={e=>setPrice(e.target.value)} 
								required/>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={closeEdit}>Close</Button>
							<Button variant="success" type="submit">Submit</Button>
						</Modal.Footer>


					</Form>
				
				</Modal>

			</>
		) 

}