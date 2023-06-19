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

        document.getElementById("fileName").innerHTML = file_name
        document.getElementById("fileSize").innerHTML = file_size
        
        rate()
    })

    .catch(error => {
        console.error('Error:', error);
    });

function rate(){
    setInterval(()=>{
        fetch('http://localhost:3000/get_transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ })
        })

        .then(response => response.json())
        .then(data => {
            document.getElementById("progress-bar").innerHTML = data.transfer_rate
        })

        .catch(error => {
            console.error('Error:', error);
        });
    },1000)
}