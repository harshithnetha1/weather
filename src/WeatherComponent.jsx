import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = '47dee84fa577b34417e412408dca598e'; 

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (!city) {
        setError('Please enter a city name');
        setWeather(null);
        return;
      }

      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      axios.get(url)
        .then(response => {
          console.log(response.data);
          setWeather(response.data);
          setError(null);
        })
        .catch(error => {
          console.error('Error fetching the weather data:', error);
          setError('Error fetching the weather data');
          setWeather(null);
        });
    }, 2000); 

    // Cleanup function to clear interval
    return () => clearTimeout(intervalId);
  }, [city]); 

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div style={{backgroundImage: `url('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?cs=srgb&dl=pexels-jplenio-1118873.jpg&fm=jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
       <Container>
      <Row>
        <Col>
        <input
        type="text"
        value={city}
        style={{
          width: '500px',  
          height: '40px',  
          padding: '10px', 
          fontSize: '16px', 
          fontFamily:'sans-serif',
          borderRadius: '2px', 
          border: '1px solid #ccc',  
        }}
        onChange={handleInputChange}
        placeholder="Enter city"
      />
      
        </Col>
        <Col>
        <br/>
        <Button variant="success"  onClick={() => setCity(city)}  
        style={{backgroundColor:"Green",
          color:"white",
          width: '200px',  
          height: '50px',  
          padding: '10px', 
          marginLeft:"150px",
          fontSize: '16px', 
          borderRadius: '10px', 
          border: '1px solid #ccc',}} >Get Weather Details</Button>
        
        </Col>
        <Col>
        <div>
        {error && <p style={{color:"white"}}>{error}</p>}
        {weather ? (
          <div style={{color:"white",  fontSize: '25px', fontFamily:'sans-serif'}}>
            
            <h1>Weather in {city}</h1>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Feels Like: {weather.main.feels_like} °C</p>
            <p>Wind Speed:{weather.wind.speed}</p>
            <p>Country:{weather.sys.country}</p>
            </div>
            ) : (
            <p style={{color:"white"}}>Please enter a city to get weather data.</p>
            )}
          </div>
       
        </Col>
     
      </Row>
      
    </Container>
    </div>
  );
};

export default WeatherComponent;
