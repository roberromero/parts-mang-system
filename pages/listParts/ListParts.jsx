import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ListParts.css'
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  head: {
    boxShadow: '0 3px 5px 2px rgba(5, 27, 242, .3)',
    height: 48,
    padding: '0 30px',
    fontWeight: 400,
  },
  tds: {
    color: '#95989A'
  },
  ico: {
    color: '#161c68'
  }
});



const ListParts = () => {
  
  const [parts, setParts] = useState([]);
  useEffect(()=>{
    getParts();
  }, [])
  
  const getParts = ()=>{
    axios.get('http://localhost/api/part')
    .then(function(res){
      console.log(res.data);
      setParts(res.data);
    })
  }

  const deleteUser = (id)=> {
    axios.delete(`http://localhost/api/part/${id}/delete`)
    .then(function(res){
      console.log(res.data);
      getParts();
    })
  }
  
  const classes = useStyles();

  return (
    <div className='listParts'>
      <TableContainer component={Paper}>
      <Table 
      sx={{ minWidth: 650, color: 'red'}} 
      aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.head} align="right">ID</TableCell>
            <TableCell className={classes.head} align="right">Number</TableCell>
            <TableCell className={classes.head} align="right">Description</TableCell>
            <TableCell className={classes.head} align="right">Quantity</TableCell>
            <TableCell className={classes.head} align="right">Created at</TableCell>
            <TableCell className={classes.head} align="right">Updated at</TableCell>
            <TableCell className={classes.head} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parts.map((part, key) => (
             <TableRow
             key={key}
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
              <TableCell className={classes.tds} component="th" scope="row">
              {part.id}
              </TableCell>
              <TableCell className={classes.tds} align="right">{part.part_number}</TableCell>
              <TableCell className={classes.tds} align="right">{part.part_description}</TableCell>
              <TableCell className={classes.tds} align="right">{part.stock_quantity}</TableCell>
              <TableCell className={classes.tds} align="right">{part.created_at}</TableCell>
              <TableCell className={classes.tds} align="right">{part.created_at}</TableCell>
              <TableCell className={classes.tds} align="right">
                <Link to={`parts/${part.id}/edit`} ><EditIcon className={classes.ico}/></Link>
                <DeleteIcon className={classes.ico} onClick={() => deleteUser(part.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
    </div>
  )
}

export default ListParts