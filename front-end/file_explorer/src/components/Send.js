import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios'
import { useEffect, useState } from "react";

function Send() {
    const [structure, setStructure] = useState(null)

    function directory_operation(item){
        axios.post('http://127.0.0.1:4545/post-data', {item_object: item})
            .then(response => { setStructure(response.data);})
            .catch(error => console.log(error))
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:4545/directory', { directory: null })
            .then(response => { setStructure(response.data) })
            .catch(error => console.log(error))
    }, [])

    return ( 
        <>
            <div className="container">
                <div className="row row-cols-2 row-cols-lg-5">
                    {structure ? (
                        structure[0].map((item) => (<div className="col p-3" onDoubleClick={() => directory_operation(item)}>
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