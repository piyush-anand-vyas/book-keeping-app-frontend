import * as React from 'react';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddTransaction(props) {
  const refClose = React.useRef(null);
  const [type, setType] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [details, setDetails] = React.useState('');
  const host = "https://book-keeping-app-backend.herokuapp.com";

  const handleChange = (e) => {
    if(e.target.name === "amount"){
      setAmount(e.target.value);
    }
    else if(e.target.name === "details"){
      setDetails(e.target.value);
    }
    // else{
    //   setType(e.target.value);
    // }
  };

  const handleAddTransaction = async()=>{
    let type = props.type;
    const transactionDetails = { amount, details, type};
    const response = await fetch(`${host}/api/transactions/addTransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        "customer-id": props.id
      },
      body: JSON.stringify(transactionDetails)
    });
    let transaction = await response.json();
    console.log(transaction);
    props.setIsTransactionAdded(true);
    refClose.current.click();
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            type="text"
            fullWidth
            variant="standard"
            name="amount"
            onChange={handleChange}
          />
          <TextField
            
            margin="dense"
            id="name"
            label="Details"
            type="text"
            fullWidth
            variant="standard"
            name="details"
            onChange={handleChange}
          />
          {/* <FormControl variant="standard" sx={{ m: 1, minWidth: "50%" }}>
        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={handleChange}
          label="Type"
          name="type"
          placeholder="Select type of transaction"
        >
          
          <MenuItem value="Send">Send</MenuItem>
          <MenuItem value="Receive">Receive</MenuItem>
        </Select>
      </FormControl> */}
        </DialogContent>
        <DialogActions>
          <Button ref={refClose} onClick={props.handleClose}>Cancel</Button>
          <Button onClick={handleAddTransaction}>Add</Button>
        </DialogActions>
      </Dialog>



      {/* <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          Transaction details saved successfully
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Ok</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}
