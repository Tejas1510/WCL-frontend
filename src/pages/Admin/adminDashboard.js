import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import FileBase from 'react-file-base64';
import { Button } from '@material-ui/core'
import axios from 'axios';
import env from "react-dotenv";
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';
import './adminDashboard.css'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function AdminDashboard() {

    const [adminState, setAdminState] = useState({
        userName: ''
    });

    const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);

    const [openErrorAlert, setOpenErrorAlert] = React.useState(false);

    // Taking env variable
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [loginState, setLoginState] = useState('checking');

    useEffect(() => {
        const token = localStorage.getItem("token") || '';
        axios.post("http://localhost:5000/api/auth/authenticateAdmin", {}, {
            headers: {
                'token': token
            }
        })
            .then(result => {
                if (result.data.status === 'verified') {
                    setLoginState('loggedIn');
                    setAdminState({ ...adminState, userName: result.data.userName });
                }
                else
                    setLoginState('notLoggedIn');
            }).catch((err) => {
                setLoginState('networkError');
            })
    }, []);

    const [questionInformation, setQuestionInformation] = useState({
        fileType: "",
        timeSlot: "",
        password: "",
        selectedFile: null,
    })

    const logoutMethod = () => {
        const token = localStorage.getItem("token") || '';
        axios.post("http://localhost:5000/api/auth/logoutAdmin", {
            'userName': adminState.userName,
            'token': token
        }, {
            headers: {
                'token': token
            }
        })
            .then(result => {
                if (result.data.status === 'logged out') {
                    localStorage.removeItem('token');
                    setAdminState({ ...adminState, userName: '' });
                    setLoginState('notLoggedIn');
                }
                else {

                }
            }).catch((err) => {
                setLoginState('networkError');
            })
    }
    const [file, setFile] = useState(null)

    const handleSubmit = async () => {
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            data.append("fileType", questionInformation.fileType)
            data.append("timeSlot", questionInformation.timeSlot)
            data.append("testPassword", questionInformation.password)
            data.append("key", BASE_URL)
            console.log(data)
            try {
                await axios.post("http://localhost:5000/api/questionData/fileUpload", data);
                setQuestionInformation({
                    fileType: "",
                    timeSlot: "",
                    password: "",
                    selectedFile: null,
                })
                setOpenSuccessAlert(true)
            } catch (err) { 
                setOpenErrorAlert(true)
            }
        }
    }

    if (loginState === 'checking') {
        return (
            <div style={{ textAlign: "center", width: "100%" }}>
                <br /><br />
                <Spinner animation="border" variant="primary" />
                <br /><br />
            </div>
        );
    }
    else if (loginState === 'notLoggedIn') {
        return <Redirect to="/" />
    }
    else if (loginState === 'networkError') {
        return (
            <div style={{ textAlign: "center", width: "100%" }}>
                <br /><br />
                <h3>Network Error</h3>
                <br /><br />
            </div>
        );
    }
    else {

        return (
            <div>
                <Collapse in={openSuccessAlert}>
                    <Alert
                        style={{position:'absolute',zIndex:'1',marginLeft:'850px',marginTop:'20px'}}
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
                        Question Paper Uploaded Successfully
                    </Alert>
                </Collapse>
                <Collapse in={openErrorAlert}>
                    <Alert
                        style={{position:'absolute',zIndex:'1',marginLeft:'850px',marginTop:'20px'}}
                        severity="error"
                        variant="filled"
                        size="medium"
                        action={
                            <IconButton
                                aria-label="close"
                                severity="success"
                                variant="filled"
                                size="small"
                                onClick={() => {
                                    setOpenErrorAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ width: 500, float: 'right', marginTop: '10px' }}
                    >
                        Error Occurred
                    </Alert>
                </Collapse>
                <AdminNavbar userName={adminState.userName} logoutMethod={logoutMethod} />

                <div className="col-8  mt-5 mb-5 p-3" style={{
                    margin: 'auto', backgroundColor: '#FBAB7E',
                    backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)'
                }}>
                    <h4 style={{ textAlign: 'center', padding: '10px' }}> Admin Question Uploading Form</h4>
                    <div className="timeSlot mb-5" style={{ width: '60%', marginLeft: '20px' }}>
                        <h5 style={{ marginLeft: '10px' }}>Please Select the Timeslot</h5>
                        <select style={{ width: '100%', border: 'none', padding: '10px', borderRadius: '20px' }} name="Select Time Slot" onChange={(e) => setQuestionInformation({ ...questionInformation, timeSlot: e.target.value })} >
                            <option value="10:30 AM">Select a Batch</option>
                            <option value="10:30 AM">10:30 AM IST</option>
                            <option value="11:30 AM">11:30 AM IST</option>
                            <option value="12:30 PM">12:30 PM IST</option>
                        </select>
                    </div>
                    <div className="form-outline mb-5" style={{ width: '60%', marginLeft: '20px' }}>
                        <h5 style={{ marginLeft: '10px' }}>Please Enter the Test Passoword</h5>
                        <input type="password" id="form1Example23" onChange={(e) => setQuestionInformation({ ...questionInformation, password: e.target.value })} className="form-control form-control-lg" placeholder="Enter Test Password" style={{ borderRadius: '20px', border: 'none' }} />
                    </div>
                    <div className="timeSlot mb-5" style={{ width: '60%', marginLeft: '20px' }}>
                        <h5 style={{ marginLeft: '10px' }}>Please Select the Question</h5>
                        <select style={{ width: '100%', border: 'none', padding: '10px', borderRadius: '20px' }} name="Select Time Slot" onChange={(e) => setQuestionInformation({ ...questionInformation, fileType: e.target.value })} >
                            <option value="word">Select the file want to upload</option>
                            <option value="word">Microsoft Word Question</option>
                            <option value="excel">Microsoft Excel Question</option>
                            <option value="ppt">Microsoft PPT Question</option>
                        </select>
                    </div>

                    <label class="file">
                        <h5 style={{ marginLeft: '25px', marginBottom: '20px' }}>Please Select the File to upload</h5>
                        <input type="file" id="file" aria-label="File browser example" onChange={(e) => setFile(e.target.files[0])} />
                        <span class="file-custom"></span>
                    </label>
                    <div className="mt-5 mb-5" style={{ width: '70%', margin: 'auto' }}>
                        <button variant="contained" onClick={handleSubmit} color="primary" style={{ margin: "auto" }} type="submit" className="btn btn-primary btn-lg btn-block" style={{ width: '100%', margin: 'auto' }}>Upload Data</button>
                    </div>
                </div>
            </div>
        )

    }


}

export default AdminDashboard
