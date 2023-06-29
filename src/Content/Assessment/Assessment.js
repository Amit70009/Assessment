import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './Assessment.css'
import '../Sidebar/Sidebar.css'
import Card from "../card/Card";
import Sidebar from "../Sidebar/Sidebar";
import DashBoard from "../Dashboard";
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import { json, useNavigate, useParams } from "react-router-dom";
import Slide from '@mui/material/Slide';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Assessment() {
  const {UniqueID} = useParams()
    const [fetch, setFetch] = React.useState([])
    const [openedit, setOpenEdit] = React.useState(false);
    const [openassessment, setOpenAssessment] = React.useState(false)
    const [openadd, setOpenAdd] = React.useState(false);
    const [assessmentname, setAssessmentName] = React.useState(false)
    const [uniqueid, setUniqueID] = React.useState(false)
    const [assessuniqueid, setAssessUniqueID] = React.useState(false)
    const [page, setPage] = React.useState(1);
 
    const handleChange = (event, value) => {
    setPage(value); }

    const navigate = useNavigate()

    function createData(AssessmentName, AssessmentID, Edit, ViewQuestion, Setting) {
      return { AssessmentName, AssessmentID, Edit, ViewQuestion, Setting };
    }

    const FetchAllAssessment = async () => { 
        const AssessmentData = await axios.get("https://gray-famous-butterfly.cyclic.app/api/users/fetchallassessment", {
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    }
    );
    setFetch(AssessmentData.data.data.AssessmentCheck);
}

useEffect(() => {
    FetchAllAssessment(fetch);
  }, []);


  const handleClickOpen = (id) => {
    setUniqueID(id);
  };

  const handleViewAssessment = (assessid) => {
    setAssessUniqueID(assessid);
    localStorage.setItem("Assessment ID", assessid)
    navigate('/setting/viewquestion');
  }

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleCloseAssessment = () => {
    setOpenAssessment(false);
    window.location.reload()
  }
 const UpdateAssessment = async (id) => { 
        const UpdateData = await axios.put(`https://gray-famous-butterfly.cyclic.app/api/users/updateassessment/${uniqueid}`,
      {
        AssessmentName: assessmentname
      },
      {
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    }
    ).then(res => {
      window.location.reload()
    }).catch(err => {
      console.log(err);
    });
    setOpenEdit(false);
  }

  const DeleteAssessment = async (id) => { 
    const UpdateData = await axios.delete(`https://gray-famous-butterfly.cyclic.app/api/users/deleteassessment/${uniqueid}`,
  {
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
    }
}
).then(res => {
  window.location.reload()
}).catch(err => {
  console.log(err);
});
setOpenEdit(false);
}

  const AddAssessment = async (e) => {
    // e.prevent.default();
    axios.post("https://gray-famous-butterfly.cyclic.app/api/users/addassessment", 
      {
        AssessmentName: assessmentname
      }, 
      {headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
      }
  }).then(res => {
    window.location.reload()
  }).catch(err => console.log(err));
  }
  

    return (
        <>
       <div className="Assessment" onLoad={FetchAllAssessment}>
       <h1>Assessment</h1>
       <button type="button" data-bs-toggle="modal" data-bs-target="#AddAssess" className="assessbtn btn btn-outline-success btn-sm">Add Assessment</button>
       </div>
      <div className="AssessmentTable">
      <TableContainer className="AssessmentTable"component={Paper}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Assessment Name</TableCell>
            <TableCell align="left">Assessment ID</TableCell>
            <TableCell align="center">View Question</TableCell>
            <TableCell align="center" >Action</TableCell>
            <TableCell align="center">Setting</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetch.map((row) => (
            <TableRow
              key={row.UniqueID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.AssessmentName}
              </TableCell>
              <TableCell align="left">{row.UniqueID}</TableCell>
              <TableCell align="center"><button type="button" className="btn btn-outline-success btn-sm"onClick={() => handleViewAssessment(row.UniqueID)} >View_Question</button></TableCell>
              <TableCell align="center"><button type="button" className="btn btn-outline-success btn-sm" variant="outlined" data-bs-toggle="modal" data-bs-target="#editAssess" onClick={() => handleClickOpen(row.UniqueID)}>Edit</button></TableCell>
              <TableCell align="center"><button type="button" className="btn btn-outline-success btn-sm" onClick={() => navigate('/setting/assessmentsetting')}>Setting</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div class="modal fade" id="editAssess" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Update Assessment</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Please enter the Assessment Name</p>
        <TextField
            margin="dense"
            id="name"
            label="Assessment Name"
            onChange={(event) => setAssessmentName(event.target.value)}
            type="Assessment Name"
            fullWidth
            variant="standard"
          />
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary"  onClick={DeleteAssessment}> Delete</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onClick={UpdateAssessment}>Update</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade modal-dialog" id="Setting" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Create New Assessment</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Please enter the new Assessment Name</p>
        <TextField
            margin="dense"
            id="name"
            label="Assessment Name"
            onChange={(event) => setAssessmentName(event.target.value)}
            type="Assessment Name"
            fullWidth
            variant="standard"
          />
          
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onClick={AddAssessment}>Create</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="AddAssess" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Create New Assessment</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Please enter the new Assessment Name</p>
        <TextField
            margin="dense"
            id="name"
            label="Assessment Name"
            onChange={(event) => setAssessmentName(event.target.value)}
            type="Assessment Name"
            fullWidth
            variant="standard"
          />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onClick={AddAssessment}>Create</button>
      </div>
    </div>
  </div>
</div>
   </div>
   <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
</>
    )
}
