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
import { useParams } from "react-router-dom";
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

export default function Assessment() {
  const {UniqueID} = useParams()
    const [fetch, setFetch] = React.useState([])
    const [openedit, setOpenEdit] = React.useState(false);
    const [openassessment, setOpenAssessment] = React.useState(false)
    const [openadd, setOpenAdd] = React.useState(false);
    const [assessmentname, setAssessmentName] = React.useState(false)
    const [uniqueid, setUniqueID] = React.useState(false)
    const [assessuniqueid, setAssessUniqueID] = React.useState(false)

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

  function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = (id) => {
    setOpenEdit(true);
    setUniqueID(id);
    console.log(uniqueid);
  };

  const handleViewAssessment = (assessid) => {
    setOpenAssessment(true);
    setAssessUniqueID(assessid);
  }

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

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
  
  const listItems = fetch.map(product =>
    <div key={product.AssessmentName}>
      {product.AssessmentName}
    </div>
  )
    return (
        <>
       <div className="Assessment" onLoad={FetchAllAssessment}>
       {/* <ul>{listItems}</ul> */}
  
       <h1>Assessment</h1>
       <button type="button" className="btn btn-outline-success" onClick={handleClickOpenAdd}>Add Assessment</button>
       </div>
      <div className="AssessmentTable">
      <TableContainer className="AssessmentTable"component={Paper}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Assessment Name</TableCell>
            <TableCell align="left">Assessment ID</TableCell>
            <TableCell align="center">View Question</TableCell>
            <TableCell align="center" >Edit</TableCell>
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
              <TableCell align="center"><button type="button" className="btn btn-outline-success"onClick={() => handleViewAssessment(row.UniqueID)} >View_Question</button></TableCell>
              <TableCell align="center"><button type="button" className="btn btn-outline-success" variant="outlined" onClick={() => handleClickOpen(row.UniqueID)}>Edit</button></TableCell>
              <TableCell align="center"><button type="button" className="btn btn-outline-success">Setting</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog
        open={openedit}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Update Assessment
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please enter the new Assessment Name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Assessment Name"
            onChange={(event) => setAssessmentName(event.target.value)}
            type="Assessment Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
        <button type="button" className="btn btn-outline-success" autoFocus onClick={DeleteAssessment}>
            Delete
          </button>
          <button type="button" className="btn btn-outline-success" autoFocus onClick={handleClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-outline-success" onClick={UpdateAssessment}>Update</button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openadd}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Add Assessment
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please enter the new Assessment Name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Assessment Name"
            onChange={(event) => setAssessmentName(event.target.value)}
            type="Assessment Name"
            fullWidth
            // variant="standard"
          />
        </DialogContent>
        <DialogActions>
          
          <button type="button" className="btn btn-outline-success" autoFocus onClick={handleClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-outline-success" onClick={AddAssessment}>Add Assessment</button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={openassessment}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseAssessment}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseAssessment}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
   </div>
</>
    )
}
