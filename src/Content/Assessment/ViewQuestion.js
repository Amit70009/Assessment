import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewQuestion.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Assessment from "./Assessment";

export default function AssessmentSetting() {
  const [fetch, setFetch] = React.useState([]);
  const [quesuniqueid, setQuesUniqueID] = React.useState([]);
  const [openedit, setOpenEdit] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [question, setQuestion] = React.useState(null);
  const [option1, setOption1] = React.useState(null);
  const [option2, setOption2] = React.useState(null);
  const [option3, setOption3] = React.useState(null);
  const [option4, setOption4] = React.useState(null);
  const [option5, setOption5] = React.useState(null);
  const [option6, setOption6] = React.useState(null);
  const [answer, setAnswer] = React.useState("Default")
  const [number, setNumber] = React.useState(0);
  const [require, setRequire] = React.useState(false);

  const FetchAllQuestion = async () => {
    const AssessmentData = await axios.get(
      `https://gray-famous-butterfly.cyclic.app/api/users/fetchallquestion?assessid=${localStorage.getItem(
        "Assessment ID"
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    setFetch(AssessmentData.data.Data);
  };
  const handleClickOpen = (id) => {
    setQuesUniqueID(id);
    console.log(quesuniqueid);
  };
  const RequiredChange = (event) => {
    setChecked(event.target.checked);
   setRequire(event.target.value)
    console.log(checked);
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const QuestionType = [
    {
      value: "Radio",
      name: "Radio",
    },
    {
      value: "Paragraph",
      name: "Paragraph",
    },
    {
      value: "Checkbox",
      name: "Checkbox",
    },
  ];

  const AddQuestionFunc = async () => {
    const AddQuesCall = await axios.post("https://gray-famous-butterfly.cyclic.app/api/users/addaquestion", {
      question,
      option1,
      option2,
      option3,
      option4,
      option5,
      option6,
      require,
      number,
      answer,
      assessid: localStorage.getItem("Assessment ID")
    },
      {headers: {
        "Content-Type": "application/json"
      }}).then(res => {
        window.location.reload()
      }).catch(err => {
        console.log(err);
      })
    }
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const DeleteQuestion = async (id) => {
    const AssessmentData = await axios
      .delete(
        `https://gray-famous-butterfly.cyclic.app/api/users/deletequestion/${quesuniqueid}`,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(quesuniqueid);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenEdit(false);
  };

  useEffect(() => {
    FetchAllQuestion();
  }, []);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/assessment">Assessment</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Assessment Question
          </li>
        </ol>
        <button data-bs-toggle="modal" data-bs-target="#AddQuestion">
          Create Question
        </button>
        <TableContainer className="AssessmentTable" component={Paper}>
          <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Sr. No.</TableCell>
                <TableCell align="left">Question</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetch.map((row) => (
                <TableRow
                  key={row.UniqueID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <p>1</p>
                  </TableCell>

                  <TableCell align="left"> {row.question}</TableCell>
                  <TableCell align="center" className="main">
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      variant="outlined"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#DeleteQuestion"
                      onClick={() => handleClickOpen(row.UniqueID)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          class="modal fade"
          id="DeleteQuestion"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Delete Question
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p>Are you sure, you want to delete the question?</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={DeleteQuestion}
                >
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade modal-dialog-scrollable modal-xl"
          id="AddQuestion"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-6" id="staticBackdropLabel">
                  Add Question
                </h1>
               
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div class="row">
                  <div class="col-8 col-sm-4">
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      {" "}
                      <TextField
                        id="outlined-select-currency"
                        select
                        size="small"
                        label="Select"
                        defaultValue="Radio"
                      >
                        {QuestionType.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                    <div className="checkbox-number">
                      <p>Number : </p>
                      <TextField
                        className="NumberField"
                        id="outlined-number"
                        type="number"
                        onChange={(event) => setNumber(event.target.value)}
                        variant="standard"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                    <div className="checkbox checkbox-number">
                      <p>Required</p>{" "}
                      <Switch
                        checked={checked}
                        onChange={RequiredChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                    <div>
                      <div className="checkbox-number">
                        <p>Answer</p>
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id="demo-multiple-checkbox-label">
                            Answer
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Answer" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                          >
                            {names.map((name) => (
                              <MenuItem key={name} value={name}>
                                <Checkbox
                                  checked={personName.indexOf(name) > -1}
                                />
                                <ListItemText primary={name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div class="Top-modal col-4 col-sm-8">
                    <TextField
                      margin="dense"
                      id="Question"
                      label="Please enter your question"
                      onChange={(event) => setQuestion(event.target.value)}
                      type="Question"
                      fullWidth
                      size="small"
                      variant="standard"
                    />
                    <div className="checkbox">
                      <Checkbox {...label} />
                      <TextField
                        margin="dense"
                        id="Option"
                        onChange={(event) => setOption1(event.target.value)}
                        size="small"
                        label="Option"
                        type="option"
                        variant="standard"
                      />
                      <span>
                        <button className="child">Add option</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" class="btn btn-secondary btn-sm" onClick={AddQuestionFunc}>
                  {" "}
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
