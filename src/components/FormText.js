import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'; 
function BasicExample(props) {
  
  const handelOnChange = (e) => {
    setText(e.target.value); // Update state when user types
  };

  // Handles button click
  const handleupClick = () => {
    setText(text.toUpperCase()); // Convert the current text to uppercase
  };
  const handledownClick = () => {
    setText(text.toLowerCase()); // Convert the current text to uppercase
  };

  const handleclear = () => {
    setText(''); // Convert the current text to uppercase
  };

  const handleBase = () => {
    setText(btoa(text)); // Convert the current text to uppercase
  };

  
  const handleASCII = () => {
    setText(atob(text)); // Convert the current text to uppercase
  };

    // Reverse the text
    const handleReverse = () => {
      setText(text.split("").reverse().join(""));
    };
  
    // Remove extra spaces
    const handleRemoveSpaces = () => {
      setText(text.replace(/\s+/g, " ").trim());
    };
  
    // Copy text to clipboard
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(text);
        alert("Text copied to clipboard!");
      } catch (error) {
        alert("Failed to copy text");
      }
    };

    const speak = () => {
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      window.speechSynthesis.speak(msg);
    }
  //we have set the initial state of the text to 'Enter your text here'
  const [text, setText] = useState('');
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
          <Button className='mx-2' variant="primary" type="button" onClick={handleupClick}> Convert to Uppercase</Button>
          <Button variant="primary" type="button" onClick={handledownClick}> Convert to Lowercase</Button>
          <Button variant="primary mx-2" type="button" onClick={handleclear}> Clear Text</Button>
          <Button variant="primary mx-2" type="button" onClick={handleBase}> Base64</Button>
          <Button variant="primary mx-2" type="button" onClick={handleASCII}> ASCII</Button>
          <Button variant="primary mx-2" type="button" onClick={handleReverse}> Reverse</Button>
          <Button variant="primary mx-2" type="button" onClick={handleRemoveSpaces}> Remove White Space</Button>
          <Button variant="primary mx-2" type="button" onClick={handleCopy}> Copy Text</Button>
          <button type="submit" onClick={speak} className="btn btn-warning mx-2 my-2">Speak</button>
          

        </Form>
      </div>
      <div className="container my-2">
    <h2>Text Preview</h2>
    <p>{text.trim() === "" ? 0 : text.trim().split(/\s+/).length} words and {text.length} characters</p>
    <p>{0.008 * text.split(" ").length} Minutes read</p>
    <h3>Preview</h3>
    <p>{text}</p>
</div>

    </>
  );
}



export default BasicExample;