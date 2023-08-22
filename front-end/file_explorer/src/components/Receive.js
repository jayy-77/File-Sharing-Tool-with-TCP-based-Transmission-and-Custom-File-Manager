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
        progress: "75%"
    })

    return (
        <>
            <div className="container mt-5">
                {config["status"] === true && (<>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">IP Address</span>
                        <input type="text" value={config["ip"]} className="text-light form-control bg-dark" disabled />
                    </div>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">Status</span>
                        <input type="text" value={config["status"]} className="text-light form-control bg-dark" disabled />
                    </div>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">Host</span>
                        <input type="text" value={config["host"]} className="text-light form-control bg-dark" disabled />
                    </div>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">File Name</span>
                        <input type="text" value={config["file_name"]} className="text-light form-control bg-dark" disabled />
                    </div>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">File Size</span>
                        <input type="text" value={config["file_size"]} className="text-light form-control bg-dark" disabled />
                    </div>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">File Path</span>
                        <input type="text" value={config["file_path"]} className="text-light form-control bg-dark" disabled />
                    </div>
                    <div className="input-group input-group-lg mb-5">
                        <span className="input-group-text bg-secondary text-light">Transfer Rate</span>
                        <input type="text" value={config["transfer_rate"]} className="text-light form-control bg-dark" disabled />
                    </div>

                    <div className="progress bg-secondary" role="progressbar">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" style={{ width: config["progress"] }}>{config["progress"]}</div>
                    </div>
                </>)}
                
                {config["status"] === false && (<>
                    <img src="waiting.svg" alt="none" className="m-5" />
                    <h1 className="display-1 text-light text-center">Waiting for sender</h1>
                </>)}
            </div>
            <button onClick={() => {
                axios.post(`${URL}/file_config`, { item_object: "item" })
                    .then(response => { setConfig(response.data) })
            }}>Check</button>
        </>
    )
}

export default Receive