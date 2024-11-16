import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'; 
function BasicExample(props) {
  const [text, setText] = useState('Enter your text here');
  return (
    <>

    <div className="container">
    <h2>{props.heading}</h2>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control  as="textarea" rows={5}  placeholder="Enter your text"/>
      </Form.Group>
      <Button variant="primary" type="submit">
       Convert to Uppercase
      </Button>
    </Form>
    </div>
    </>
  );
}

export default BasicExample;