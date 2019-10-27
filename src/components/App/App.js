import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

const AgriculturesEndpoint =
  process.env.REACT_APP_AGRICULTURE_BASE_URL + "/api/v1/agricultures/";

function App() {
  const initialAgricultures = [
    {
      id: null,
      name: null,
      soil_moisture: null,
      lighting_level: null,
      location: null
    }
  ];

  const [agricultures, setAgricultures] = useState(initialAgricultures);

  useEffect(() => {
    axios.get(AgriculturesEndpoint).then(result => {
      setAgricultures(result.data);
    });
  }, []);

  const removeAgriculture = id => {
    axios.delete(AgriculturesEndpoint + id).then(result => {
      axios.get(AgriculturesEndpoint).then(result => {
        setAgricultures(result.data);
      });
    });
  };
  
  const addAgriculture = agriculture => {
    axios.post(AgriculturesEndpoint, agriculture).then(result => {
      axios.get(AgriculturesEndpoint).then(result => {
        setAgricultures(result.data);
      });
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const agriculture = {
      name: event.target.name.value,
      soil_moisture: event.target.soil_moisture.value,
      lighting_level: event.target.lighting_level.value,
      location: event.target.location.value
    };
    event.target.reset();
    addAgriculture(agriculture);
  };

  const agriculturesRows = agricultures.map(agriculture => {
    return (
      <tr key={agriculture.id}>
        <td>{agriculture.id}</td>
        <td>{agriculture.name}</td>
        <td>{agriculture.soil_moisture}</td>
        <td>{agriculture.lighting_level}</td>
        <td>{agriculture.location}</td>
        <td
          className="remove"
          onClick={() => removeAgriculture(agriculture.id)}
        >
          <i className='fa fa-trash'></i>
        </td>
      </tr>
    );
  });

  return (
    <div className="app">
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>soil_moisture</th>
            <th>lighting_level</th>
            <th>location</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{agriculturesRows}</tbody>
      </table>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" placeholder="Name" />
        </label>
        <label>
          Soil moisture:
          <input type="text" name="soil_moisture" placeholder="Soil moisture" />
        </label>
        <label>
          Lighting level:
          <input
            type="text"
            name="lighting_level"
            placeholder="Lighting level"
          />
        </label>
        <label>
          Location:
          <input type="text" name="location" placeholder="Location" />
        </label>
        <input type="submit" value="Send"/>
      </form>
    </div>
  );
}

export default App;
