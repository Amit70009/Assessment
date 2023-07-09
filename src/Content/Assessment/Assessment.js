import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Assessment.css";
import "../Sidebar/Sidebar.css";
import Card from "../card/Card";
import Sidebar from "../Sidebar/Sidebar";
import DashBoard from "../Dashboard";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";
import { json, useNavigate, useParams } from "react-router-dom";
import Slide from "@mui/material/Slide";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Pages } from "@mui/icons-material";

export default function Assessment() {
  const { UniqueID } = useParams();
  const [fetch, setFetch] = React.useState([]);
  const [openedit, setOpenEdit] = React.useState(false);
  const [openassessment, setOpenAssessment] = React.useState(false);
  const [openadd, setOpenAdd] = React.useState(false);
  const [assessmentname, setAssessmentName] = React.useState(false);
  const [uniqueid, setUniqueID] = React.useState(false);
  const [assessuniqueid, setAssessUniqueID] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [currentpage, setCurrentPage] = useState(1);

  const recordsperpage = 5;
  const lastindex = currentpage * recordsperpage;
  const firstindex = lastindex - recordsperpage;
  const records = fetch.slice(firstindex, lastindex);
  const npages = Math.ceil(fetch.length / recordsperpage);
  const numbers = [...Array(npages + 1).keys()].slice(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const navigate = useNavigate();

  function createData(
    AssessmentName,
    AssessmentID,
    Edit,
    ViewQuestion,
    Setting
  ) {
    return { AssessmentName, AssessmentID, Edit, ViewQuestion, Setting };
  }

  const deleteBasedAssess = async () => {
    const deleteData = await axios.delete(`https://gray-famous-butterfly.cyclic.app/api/users/deletequestionfromassessment/${localStorage.getItem("UniqueID")}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  ).then((res) => {
    window.location.reload();
  })
  .catch((err) => {
    console.log(err);
  });
  }

  const FetchAllAssessment = async () => {
    setIsLoading(true);

    const AssessmentData = await axios.get(
      "https://gray-famous-butterfly.cyclic.app/api/users/fetchallassessment",
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    setFetch(AssessmentData.data.data.AssessmentCheck);
    // console.log(AssessmentData.data.data.AssessmentCheck);
    setIsLoading(false);
  };

  useEffect(() => {
    FetchAllAssessment(fetch);
  }, []);

  const handleClickOpen = (id) => {
    setUniqueID(id);
    
  };

  const handleDelete = (id) => {
    localStorage.setItem("UniqueID", id)
  }

  const handleViewAssessment = (assessid) => {
    setAssessUniqueID(assessid);
    localStorage.setItem("Assessment ID", assessid);
    navigate("/setting/viewquestion");
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleCloseAssessment = () => {
    setOpenAssessment(false);
    window.location.reload();
  };

  function PrevPage() {
    if (currentpage !== 1) {
      setCurrentPage(currentpage - 1);
    }
  }
  function ChangeCPage(id) {
    setCurrentPage(id);
  }
  function NextPage() {
    if (currentpage !== npages) {
      setCurrentPage(currentpage + 1);
    }
  }
  const UpdateAssessment = async (id) => {
    const UpdateData = await axios
      .put(
        `https://gray-famous-butterfly.cyclic.app/api/users/updateassessment/${uniqueid}`,
        {
          AssessmentName: assessmentname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenEdit(false);
  };

  const DeleteAssessment = async (id) => {
    const UpdateData = await axios
      .delete(
        `https://gray-famous-butterfly.cyclic.app/api/users/deleteassessment/${localStorage.getItem("UniqueID")}`,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenEdit(false);
  };

  const AddAssessment = async (e) => {
    // e.prevent.default();
    axios
      .post(
        "https://gray-famous-butterfly.cyclic.app/api/users/addassessment",
        {
          AssessmentName: assessmentname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteAll = () => {
    deleteBasedAssess();
    DeleteAssessment();

  }

  return (
    <>
      <div className="Assessment" onLoad={FetchAllAssessment}>
        <h3>Assessment</h3>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#AddAssess"
          className="assessbtn btn btn-outline-success btn-sm"
        >
          Add Assessment
        </button>
      </div>
      <div className="AssessmentTable">
        <TableContainer className="AssessmentTable" component={Paper}>
          <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Assessment Name</TableCell>
                <TableCell align="left">Assessment ID</TableCell>
                <TableCell align="center">View Question</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">Setting</TableCell>
              </TableRow>
            </TableHead>
           
            <TableBody>
              {isLoading && <p> Assessment Loading...</p>}
              {records.map((row) => (
                <TableRow
                  key={row.UniqueID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.AssessmentName}
                  </TableCell>
                  <TableCell align="left">{row.UniqueID}</TableCell>
                  <TableCell align="center">
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleViewAssessment(row.UniqueID)}
                    >
                      View_Question
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    <div className="Actionbtn">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        variant="outlined"
                        data-bs-toggle="modal"
                        data-bs-target="#editAssess"
                        onClick={() => handleClickOpen(row.UniqueID)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        variant="outlined"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteAssess"
                        onClick={() => handleDelete(row.UniqueID)}
                      >
                        Delete
                      </button>
                    </div>{" "}
                  </TableCell>
                  <TableCell align="center">
                    <button
                      type="button"
                      className="btn btn-outline-info btn-sm"
                      onClick={() => navigate("/setting/assessmentsetting")}
                    >
                      Setting
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <nav className="pagenav">
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={PrevPage}>
                Prev
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item${currentpage === n ? "active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => ChangeCPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={NextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
        <div
          className="modal fade"
          id="editAssess"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Update Assessment
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
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
              <div className="modal-footer">
                
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={UpdateAssessment}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* {fetchquestion.map((item) => ( */}
        
            <div
              className="modal fade"
              id="deleteAssess"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
              // key={item.id}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Delete Assessment
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-body">
                    <p>
                      Please Note: All question associate to this assessment
                      will also be deleted. Are you Sure, you want to delete the
                      Assessment?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                   
                    <button
                    
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={handleDeleteAll}
                    >
                      {" "}
                      Delete
                    </button>
                  
                  </div>
                </div>
              </div>
            </div>
          
       
        <div
          className="modal fade modal-dialog"
          id="Setting"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Create New Assessment
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={AddAssessment}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="AddAssess"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Create New Assessment
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={AddAssessment}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
}
