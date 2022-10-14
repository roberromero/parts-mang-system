import React, { useState } from 'react'
import './CreatePart.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 


const CreatePart = () => {

//This object stores all inputs from our form
const [ input, setInput ] = useState([]);
const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  
  axios.post('http://localhost/api/part/save', input)
  .then((res)=>console.log(res))
  .catch((e)=>console.log(e.message));
  navigate('/');
  
}


const handleChange = (e)=> {
  const val = e.target.value;
  const name = e.target.name;
  setInput(current=>({...current, [name] : val }));
} 
console.log(input);

  return (
    <div className='createPart'>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label>Part Number</label>
          <input type="text" name='part_number' onChange={handleChange}/>
        </div>
        <div className="form-div">
          <label>Quantity: </label>
          <input type="number" name='stock_quantity' onChange={handleChange}/>
        </div>
        <div className="form-div">
          <label>Part Description: </label>
          <textarea name="part_description" cols="30" rows="10" onChange={handleChange}></textarea>    
        </div>            
        <button>Save</button>     
      </form>
    </div>
  )
}

export default CreatePart