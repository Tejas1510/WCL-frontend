import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {Button} from '@material-ui/core'
import axios from 'axios';
import env from "react-dotenv";
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';
import './adminDashboard.css'
import Table from 'react-bootstrap/Table';
import DownloadIcon from '@mui/icons-material/Download';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'


function AdminViewSubmission() {

    return(
    <div>

    <AdminNavbar/>

        <div className="container">
        
                <div>
                <h2 className="display-6 text-center my-3"><b>View Submissions</b></h2>
                    <div className="row m-5">
                        <div className="col-md-6 col-12">
                        <h5 style={{marginLeft:'10px'}}>Please Select the Batch</h5>
                        <select style={{width:'100%',border:'none',padding:'10px',borderRadius:'20px'}} name="Select Batch" >
                                <option value="10:30 AM">Select a Batch</option>
                                <option value="10:30 AM">10:30 AM IST</option>
                                <option value="11:30 AM">11:30 AM IST</option>
                                <option value="12:30 PM">12:30 PM IST</option>

                        </select>
                        </div>

                        <div className="col-md-6 col-12">
                            <Button variant="contained" color="primary" endIcon={<DownloadIcon />}>Download Submission</Button>
                        </div>
                    </div>
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
                   
                    
                            <tr  style={{padding:"5px"}}>
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