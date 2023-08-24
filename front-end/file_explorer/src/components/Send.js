import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios'
import { useEffect, useState } from "react";

function Send() {
    const [structure, setStructure] = useState(null)
    const [path, setPath] = useState("")
    const URL = 'http://127.0.0.1:4544'

    function directory_operation(item, end_point) {
        axios.post(`${URL}/${end_point}`, { item_object: item })
            .then(response => { setStructure(response.data); setPath(response.data[1]); })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:4544/directory', { directory: null })
            .then(response => { setStructure(response.data); setPath(response.data[1]) })
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <div className="container">
                <div className="mt-3 border-bottom border-primary d-flex">
                    <img alt="none" src="back.png" className="p-3" onClick={() => directory_operation(null, 'back-dir')} />
                    <h5 className="p-3 m-2 text-light">{path}</h5>
                </div>

                <div className="row row-cols-2 row-cols-lg-5" style={{ maxHeight: '800px', overflowY: 'auto' }}>
                    {structure ? (
                        structure[0].map((item) => (<div className="col p-3" onDoubleClick={() => directory_operation(item, 'post-data')}>
                            <img className="justify-content-center" src={item["type"] === "directory" ? "folder.png" : "file.svg"} alt="none" />
                            <h6 className="text-light">{item["content"]}</h6>
                        </div>))
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Send