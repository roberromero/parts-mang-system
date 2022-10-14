import './EditPart.css'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'


const EditPart = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState([]);

  const {id} = useParams();

  useEffect(() => {
      getUser();
  }, []);

  function getUser() {
      axios.get(`http://localhost/api/part/${id}/edit`).then(function(response) {
          console.log(response.data);
          setInput(response.data);
      });
  }

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInput(values => ({...values, [name]: value}));
  }
  const handleSubmit = (event) => {
      event.preventDefault();

      axios.put(`http://localhost/api/part/${id}/edit`, input).then(function(response){
          console.log(response.data);
          navigate('/');
      });
      
  }

  return (
    <div className='editPart'>
        <form onSubmit={handleSubmit}> 
            <div className="form-div">
                <label>Part Number: </label>
                <input value={input.part_number} type="text" name="part_number" onChange={handleChange} />
            </div>       
            <div className="form-div">
                <label>Part Description: </label>
                <textarea name="part_description"  value={input.part_description} cols="30" rows="10"onChange={handleChange}></textarea>
            </div>
            <div className="form-div">
                <label>Quantity: </label>
                <input value={input.stock_quantity} type="text" name="stock_quantity" onChange={handleChange} />
            </div>   
            <button>Save</button>                      
        </form>
    </div>
  )
}

export default EditPart