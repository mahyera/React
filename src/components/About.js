import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import { useState } from "react";

export default function About() {
 let [mystyle, setmyStyle] = useState({
    color: "white",
    backgroundColor: "black",
    padding: "10px",
    fontFamily: "Arial"
  })

  const [btnText, setbtnText] = useState("Enable Dark Mode");

  const toggleStyle = () => {
      if(mystyle.color === "white"){
          setmyStyle({
            color: "black",
            backgroundColor: "white",
            padding: "10px",
            fontFamily: "Arial"
          })
          setbtnText("Enable dark Mode");
      }else {
          setmyStyle({
            color: "white",
            backgroundColor: "black",
            padding: "10px",
            fontFamily: "Arial"
          })
          setbtnText("Enable light Mode");
  }
}
    return(
        <div className="container" style={mystyle}>
            <h2>About us</h2>
    <Accordion defaultActiveKey="0" style={mystyle}>
      <Accordion.Item eventKey="0" style={mystyle}>
        <Accordion.Header style={mystyle}>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1"style={mystyle}>
        <Accordion.Header style={mystyle}>Accordion Item #2</Accordion.Header>
        <Accordion.Body style={mystyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
            <div className="container">
              <button onClick= {toggleStyle} type="button" class="btn btn-primary">{btnText}</button>
            </div>
              </div>
    )
}
    