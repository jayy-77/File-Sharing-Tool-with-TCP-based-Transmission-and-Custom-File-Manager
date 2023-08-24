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
        transfer_rate: "transfer_rate",
        progress: "0%"
    })

    useEffect(() => {
        const interval = setInterval(() => {
            axios.post('http://localhost:3001/get-data', { req: null })
                .then(response => {
                    setConfig(response.data);
                    console.log(response.data);
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
            <div className="border p-3 container mt-5">
                {(config["status"] === true) && (<>
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
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">Transfer Rate</span>
                        <input type="text" value={`${config["transfer_rate"]} MB`} className="text-light form-control bg-dark" disabled />
                    </div>

                    <div className="progress bg-secondary" role="progressbar" style={{ height: " 30px" }}>

                        <div class="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${config["progress"]}%` }}>
                            <h4>{String(config["progress"]).split(".")[0] + "%"}</h4>
                        </div>
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