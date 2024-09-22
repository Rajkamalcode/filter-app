import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css'
function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [isValidJson, setIsValidJson] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const baseURl = process.env.REACT_APP_API_URL;

  // Multi-select dropdown options
  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestLowercase', label: 'Highest Lowercase Alphabet' }
  ];

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    setIsValidJson(true); // Reset validation on change
  };

  const validateJson = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateJson(jsonInput)) {
      setIsValidJson(false);
      return;
    }

    try {
      const response = await axios.post(`api/bfhl`, JSON.parse(jsonInput)); // Adjust the URL if necessary
      setResponseData(response.data);
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!responseData || selectedOptions.length === 0) return null;

    const filteredResponse = selectedOptions.map(option => {
      switch (option.value) {
        case 'alphabets':
          return <div key="alphabets">Alphabets: {responseData.alphabets.join(', ')}</div>;
        case 'numbers':
          return <div key="numbers">Numbers: {responseData.numbers.join(', ')}</div>;
        case 'highestLowercase':
          return <div key="highestLowercase">Highest Lowercase: {responseData.highestLowercase}</div>;
        default:
          return null;
      }
    });

    return <div className='result'>{filteredResponse}</div>;
  };

  return (
    <div className="App">
      <div className='container'>
        <h1>Enter JSON</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={jsonInput}
            onChange={handleJsonChange}
            placeholder='Enter JSON here: e.g., { "data": ["A", "B", "z"] }'
          />
          <button type="submit">Submit</button>
        </form>
        {!isValidJson && <p style={{ color: 'red' }}>Invalid JSON input!</p>}

        {responseData && (
          <>
            <h2>Select Data to Display:</h2>
            <Select
              isMulti
              options={options}
              onChange={handleDropdownChange}
            />
            {renderResponse()}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
