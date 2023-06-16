fetch('http://localhost:3000/get-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ })
    })
    .then(response => response.json())
    .then(data => {
        down_speed = 0
        const file_name = data.file_name;
        const file_size = data.file_size;
        rate = parseInt(file_size)

        document.getElementById("fileName").innerHTML = file_name
        document.getElementById("fileSize").innerHTML = file_size

        setInterval(()=>{
          if(rate > 0){
              document.getElementById("progress-bar").innerHTML = `${rate}/${file_size}`
          }
          rate -= 4096
        }, 1000)
    })

    .catch(error => {
        console.error('Error:', error);
    });