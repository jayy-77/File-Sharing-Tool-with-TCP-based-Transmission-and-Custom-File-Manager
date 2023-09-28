import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from "react";
import share from './../Animations/share.json'
import Lottie from 'lottie-web'; 

function Send(props) {
    const [structure, setStructure] = useState(null)
    const [path, setPath] = useState("")
    const [disks, setDisks] = useState([])
    const [open, setOpen] = useState(false);
    const [snack, setSnack] = useState(false)


    const URL = 'http://127.0.0.1:4544'

    function directory_operation(item, end_point) {
        setOpen(true)
        setSnack(false)
        axios.post(`${URL}/${end_point}`, { item_object: item })
            .then(response => {
                setStructure(response.data);
                setPath(response.data[1]);
                setDisks(response.data[2])
                setOpen(false)
                if (response.data[3] === 1) setSnack(true)
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    function change_disk(e) {
        axios.post(`${  URL}/change-disk`, { disk: e.target.value })
            .then(response => {
                setStructure(response.data)
                setPath(response.data[1])
                setDisks(response.data[2])
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.post('http://127.0.0.1:4544/directory', { ip: props.ip })
            .then(response => {
                setStructure(response.data);
                setPath(response.data[1]);
                setDisks(response.data[2])
            })
            .catch(error => console.log(error))
    }, [props.ip])

    // useEffect(() => {
    //     if(snack){
    //         Lottie.loadAnimation({
    //             animationData: share,
    //             container: document.querySelector("#shre")
    //         })
    //     }else{
    //         Lottie.loadAnimation({
    //             container: document.querySelector("#shre")
    //         })
    //     }
    // }, [snack])

    return (
        <>
            <div className="container" id="share">
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Snackbar
                    open={snack}
                    autoHideDuration={6000}
                    onClose={() => setSnack(false)}
                    message="File sent."
                />
                <div className="mt-3 border-bottom border-primary d-flex">
                    <img alt="none" src="back.png" className="p-3" onClick={() => directory_operation(null, 'back-dir')} />
                    <div class="dropdown p-3 d-flex">
                        <select class="form-select" onChange={(e) => change_disk(e)} >
                            {
                                disks && disks.map((d) => (
                                    <option value={d} className="dropdown-item">Disk: {d}</option>
                                ))
                            }
                        </select>
                        <h5 className="m-2 text-light">{path}</h5>
                    </div>
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