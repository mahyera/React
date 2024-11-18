import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'; 
function BasicExample(props) {
  
  const handelOnChange = (e) => {
    setText(e.target.value); // Update state when user types
  };

  // Handles button click
  const handleClick = () => {
    setText(text.toUpperCase()); // Convert the current text to uppercase
  };

  //we have set the initial state of the text to 'Enter your text here'
  const [text, setText] = useState('Enter your text here');
  ///console.log(text); 
  // to change the value of text we will use setText function
  //text="new text" will not work
  // setText('new text') will change the value of text to 'new text'

  return (
    <>
      <div className="container">
        <h2>{props.heading}</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control 
              as="textarea" 
              rows={5} 
              value={text} 
              onChange={handelOnChange} // Updates the text state
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleClick}>
            Convert to Uppercase
          </Button>
        </Form>
      </div>
      <div className="container">
        <h2>Text Preview</h2>
        
      </div>
    </>
  );
}



export default BasicExample;