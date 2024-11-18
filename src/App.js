import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import PropTypes from 'prop-types';
import Formtext from './components/FormText.js';

function App() {
  return (
    <>
    <div className="App">
      <Navbar title="Text-ies" about="About Text-ies"/>
      {/* If we aren't going to pass the values as above. we can use defaultProps
      Navbar.defaultProps ={
      title: 'text-ies',
      about: 'About text-ies'
      }; 
       We can also use propTypes to check the type of the props passed
      Navbar.propTypes ={
      title: PropTypes.string,
      about: PropTypes.string isRequired
      };      
      */}
    </div>
    <Formtext heading="Enter your text" />
    </>
  );
}
Navbar.propTypes ={
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired
  };
export default App;
