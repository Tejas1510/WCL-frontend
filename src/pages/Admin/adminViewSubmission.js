import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button } from '@material-ui/core'
import axios from 'axios';
import env from "react-dotenv";
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';
import './adminDashboard.css'
import Table from 'react-bootstrap/Table';
import DownloadIcon from '@mui/icons-material/Download';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function AdminViewSubmission() {

    const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
    const [progressAlert, setProgressAlert] = React.useState(false);
    const [batchData, setBatchData] = useState([])
    const [batch, setBatch] = useState("")
    const fetchBatchData = async () => {
        console.log(batch)
        await axios.get(`http://localhost:5000/api/userData/get_batchwise_list/?batch=${batch}`).
            then((response) => {
                setBatchData(response.data)
            })
    }

    const downloadAllFiles = async () => {
        console.log(batchData.length)
        setProgressAlert(true)
        for (let i = 0; i < batchData.length; i++) {
            await axios.get(`http://localhost:5000/api/download/single_file/?username=${batchData[i][0]}`, {
                responseType: 'blob'
            }).
                then((response) => {
                    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));

                    const link = document.createElement('a');

                    link.href = downloadUrl;

                    link.setAttribute('download', batchData[i][0]+".pdf"); //any other extension

                    document.body.appendChild(link);

                    link.click();

                    link.remove();

                })
                console.log("Downloaded")
        }
        setProgressAlert(false)
        setOpenSuccessAlert(true)

        console.log("For is completed")
    }
    return (
        <div>

            <AdminNavbar />

            <div className="container">
            <Collapse in={openSuccessAlert}>
                    <Alert
                        style={{position:'absolute',zIndex:'1',float:'right',marginTop:'20px'}}
                        severity="success"
                        variant="filled"
                        size="medium"
                        action={
                            <IconButton
                                aria-label="close"
                                severity="success"
                                variant="filled"
                                size="small"
                                onClick={() => {
                                    setOpenSuccessAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ width: 500, float: 'right', marginTop: '10px' }}
                    >
                        All Files Downloaded Successfully
                    </Alert>
                </Collapse>
                <Collapse in={progressAlert}>
                    <Alert
                        style={{position:'absolute',zIndex:'1',float:'right',marginTop:'20px'}}
                        severity="warning"
                        variant="filled"
                        size="medium"
                        action={
                            <IconButton
                                aria-label="close"
                                severity="success"
                                variant="filled"
                                size="small"
                                onClick={() => {
                                    setProgressAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ width: 500, float: 'right', marginTop: '10px' }}
                    >
                        Download in Progress....
                    </Alert>
                </Collapse>
                <div>
                    <h2 className="display-6 text-center my-3"><b>View Submissions</b></h2>
                    <div className="row m-5">
                        <div className="col-md-6 col-12">
                            <h5 style={{ marginLeft: '10px' }}>Please Select the Batch</h5>
                            <select style={{ width: '100%', border: 'none', padding: '10px', borderRadius: '20px' }} name="Select Batch"
                                onChange={(e) => setBatch(e.target.value)}>
                                <option value="10:30 AM">Select a Batch</option>
                                <option value="10:30 AM">10:30 AM IST</option>
                                <option value="11:30 AM">11:30 AM IST</option>
                                <option value="12:30 PM">12:30 PM IST</option>

                            </select>
                        </div>

                        <div className="col-md-6 col-12">
                            <Button variant="contained" color="primary" endIcon={<DownloadIcon />} onClick={fetchBatchData}>Fetch Batch Data</Button>
                        </div>
                    </div>
                    <center> <div className="col-md-6 col-12">
                        <Button variant="contained" color="primary" endIcon={<DownloadIcon />} onClick={downloadAllFiles}>Download All Submission</Button>
                    </div></center>
                </div>

                {/* Add Individual Submission */}

                <Table striped bordered hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Roll Number</th>
                            <th>Submission Link</th>
                        </tr>
                    </thead>
                    <tbody>


                        <tr style={{ padding: "5px" }}>
                            <td>1</td>
                            <td>30001</td>
                            <td>https.//drivejihihde.com</td>

                        </tr>

                        )
                        )



                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AdminViewSubmission