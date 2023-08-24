const express = require('express');
const app = express();
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const cors = require('cors');

app.use(express.json());
app.use(cors());

transfer_rate = 0
file_name = ""
file_size = ""
ip = ""
status_code = ""
host = ""
file_path = ""
progress = 0
status_1 = ""

app.post('/transfer_rate', (req, res) => {

  transfer_rate = req.body["transfer_rate"]
  file_name = req.body["file_name"]
  file_size = req.body["file_size"]
  ip = req.body["ip"]
  status_1 = req.body["status"]
  host = req.body["host"]
  file_path = req.body["file_path"]
  progress = req.body["progress"]

  res.send()
})

app.post("/get-data", (req, res) => {
  res.json({
    "ip": ip,
    "status": status_1,
    "host": host,
    "file_name": file_name,
    "file_size": file_size,
    "file_path": file_path,
    "transfer_rate": transfer_rate,
    "progress": progress
  })
})

app.listen(3001, () => {
  console.log('Server started on port 3000');
});