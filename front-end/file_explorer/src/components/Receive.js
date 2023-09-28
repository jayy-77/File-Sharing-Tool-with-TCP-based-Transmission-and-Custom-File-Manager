import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios'
import { useEffect, useState } from "react";

function Receive() {
    const URL = 'http://127.0.0.1:4546'

    const [config, setConfig] = useState({
        ip: "ip",
        status: false,
        host: "host",
        file_name: "file_name",
        file_size: "file_size",
        file_path: "file_path",
    })

    useEffect(() => {
        const interval = setInterval(() => {
            axios.post('http://localhost:3001/get-data', { req: null })
                .then(response => {
                    console.log(response.data)
                    setConfig(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
        {console.log(config)}
            <div className="border p-3 container mt-5">
                {config && (<>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">IP Address</span>
                        <input type="text" value={config["ip"]} className="text-warning form-control bg-dark" disabled />
                    </div>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">Status</span>
                        <input type="text" value={config["status"] ? "200 OK" : "400 Error"} className="text-success form-control bg-dark" disabled />
                    </div>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">Host</span>
                        <input type="text" value={config["host"]} className="text-warning form-control bg-dark" disabled />
                    </div>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">File Name</span>
                        <input type="text" value={config["file_name"]} className="text-warning form-control bg-dark" disabled />
                    </div>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">File Size</span>
                        <input type="text" value={`${config["file_size"]} MB`} className="text-light form-control bg-dark" disabled />
                    </div>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">File Path</span>
                        <input type="text" value={config["file_path"]} className="text-light form-control bg-dark" disabled />
                    </div>
                    <button className="mt-3 btn btn-danger w-100">Cancel transfer</button>
                </>)}

                {config["status"] === false && (<>
                    <img src="waiting.svg" alt="none" className="m-5" />
                    <h1 className="display-1 text-light text-center">Waiting for sender</h1>
                </>)}
            </div>
        </>
    )
}

export default Receive