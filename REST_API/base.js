const { exec } = require('child_process');
const express = require('express')
const app = express()
const cors = require('cors');

app.use(cors()); 
const PATH = '/home/jay/PycharmProjects/fs_research'

app.get('/run/:id', (req, res) =>{
    execute(req.params.id)
    res.send()
})

function execute(id){
    exec(`python ${PATH}/${id}`, (error, stdout, stderr) => {}); 
}

app.listen(3004)
