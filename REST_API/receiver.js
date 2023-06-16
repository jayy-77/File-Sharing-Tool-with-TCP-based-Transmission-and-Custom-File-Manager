const express = require('express');
const app = express();
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const cors = require('cors');

app.use(express.json());
app.use(cors()); 

file_name = null
file_size = null

app.post('/', (req, res, next) => {
   file_size = req.body.file_size;
   file_name = req.body.file_name;

  console.log(file_size, file_name)

  localStorage.setItem("file_name", file_name)
  localStorage.setItem("file_size", file_size)

  res.send()
})

app.post('/transfer_rate', (req, res, next) => {
  transfer_rate = req.body.transfer_rate;
  localStorage.setItem("transfer_rate", transfer_rate)
  res.send()
})

app.post("/get-data", (req, res) =>{
  res.json({"file_name": file_name, "file_size": file_size})
})

app.listen(3000, () => {  
  console.log('Server started on port 3000');
});