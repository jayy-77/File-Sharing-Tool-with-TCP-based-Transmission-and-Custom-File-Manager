import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material"
import { useState } from 'react';
import Send from './components/Send'
import Receive from './components/Receive';

function App() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState("home")

  { document.body.style.backgroundColor = "#121212" }

  return (
    <>
      <Navbar />

      {state === 'home' && (<>
        <div className='container' style={{ marginTop: '250px' }}>
          <div className='row align-items-center text-light text-center'>
            <button className='col p-5 btn btn-outline-primary btn-lg text-light'>
              <h1 className='display-1' onClick={() => setOpen(true)}>SEND</h1>
            </button>
            <div className='col p-5 btn btn-outline-primary btn-lg text-light'>
              <h1 className='display-1' onClick={() => setState("receive")}>RECEIVE</h1>
            </div>
          </div>
        </div>
      </>)}

      {state === "send" && <Send/>}
      {state === "receive" && <Receive/>}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>IP</DialogTitle>

        <DialogContent>
          <DialogContentText> Enter receivers IP Address to connect</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="IP Address" type="email" fullWidth variant="standard" />
        </DialogContent>

        <DialogActions>
          <Button onClick={() =>  setOpen(false)}>Cancel</Button>
          <Button onClick={() => { setOpen(false); setState("send") }}>Connect</Button>
        </DialogActions>

      </Dialog>
    </>
  );
}

export default App;
