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
import { Switch } from "antd";
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
// import Switch from "@mui/material/Switch";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Assessment from "./Assessment";
import { Button, Drawer, Space  } from "antd";
import { toggleButtonGroupClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UilEdit } from '@iconscout/react-unicons'


export default function AssessmentSetting() {
  const [fetch, setFetch] = React.useState([]);
  const [quesuniqueid, setQuesUniqueID] = React.useState([]);
  const [openedit, setOpenEdit] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [question, setQuestion] = React.useState("");
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [optionsValue, setOptionsValue] = React.useState({
    option1: null,
    option2: null,
    option3: null,
    option4: null,
    option5: null,
    option6: null,
  });
  const [answer, setAnswer] = React.useState("Default");
  const [number, setNumber] = React.useState(0);
  const [require, setRequire] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [qtvalue, setQTValue] = React.useState("Radio");
  const [answerList, setAnswerList] = React.useState([{ answer: "" }]);
  const [dtype, setDType] = useState("radio");
  const [did, setDID] = useState("flexRadioDefault1");
  const [fetchquestion, setFetchQuestion] = React.useState([]);
  const [para, setPara] = React.useState(true);
  const [isfullscreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [length, setLength] = useState([])
  const [questions, setQuestions] = useState([]);
  const [editid, setEditID] = useState();
  const [currentpage, setCurrentPage] = useState(1);
    const recordsperpage = 6;
    const lastindex = currentpage * recordsperpage;
    const firstindex = lastindex - recordsperpage;
    const records = fetch.slice(firstindex, lastindex);
    const npages = Math.ceil(fetch.length / recordsperpage)
  const numbers = [...Array(npages + 1).keys()].slice(1);
  const [len, setLen] = useState()
 
 

  const navigate1 = useNavigate();

  const toggleFullScreen = () => {
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen().catch(err => {
        console.log(err);
      });
     } else { if(document.exitFullscreen){
        document.exitFullscreen();
      }
    } setIsFullScreen((prevstate) => !prevstate);
   
    }
    const handleButtonClick = () => {
      if (!isfullscreen) {
        toggleFullScreen();
        navigate1('/setting')
      } else {
        navigate1('/setting'); // Replace '/destination' with your desired path
      }
    };
  
    function PrevPage (){
      if(currentpage !== 1){
        setCurrentPage(currentpage - 1)
      }
    }
    function ChangeCPage (id){
      setCurrentPage(id)
    }
    function NextPage (){
      if(currentpage !== npages){
        setCurrentPage(currentpage + 1)
      }
    }

  const onChange = (checked) => {
    const check = checked;
    setRequire(check);
  };
  const showDrawer = (id) => {
    
    setQuesUniqueID(id);
    setOpenDrawer(true);
    // console.log(fetchquestion);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

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
    )
    setFetch(AssessmentData.data.Data);

    
  };

  const FetchAQuestion = async (id) => {

   
    const QuestionCheck = await axios.get(
      `https://gray-famous-butterfly.cyclic.app/api/users/fetchquestion/${quesuniqueid}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    )
    
    const questionsArray = QuestionCheck.data.data
    const questiondata = [questionsArray]
    const existingdata = questiondata[0].question
  setQuestions(questiondata);
  setQuestion(existingdata)

  
  
  };
  const UpdateQuestion = async (id) => {
    const updatedOptions = {};
    for (const [key, value] of Object.entries(optionsValue)) {
      if (value !== null && value !== "") {
        updatedOptions[key] = value;
      }
    }


    const updatedQuestion = {
      question,
      ...updatedOptions,
      number,
      require,
      answer,
    };

  const QuestionUpdate = await axios.put(
    `https://gray-famous-butterfly.cyclic.app/api/users/updatequestion/${quesuniqueid}`,
      updatedQuestion,
    {
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



};
  const handleClickOpen = (id) => {
    setQuesUniqueID(id);
    // console.log(quesuniqueid);
  };
  const RequiredChange = (event) => {
    setChecked(event.target.checked);
    setRequire(event.target.value);
    // console.log(require);
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const QuestionTypeChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const QuestionType = [
    {
      value: "radio",
      name: "Radio",
    },
    {
      value: "checkbox",
      name: "Checkbox",
    },
    {
      value: "paragraph",
      name: "Paragraph",
    },
    
  ];

  const AddQuestionFunc = async () => {
    const AddQuesCall = await axios
      .post(
        "https://gray-famous-butterfly.cyclic.app/api/users/addaquestion",
        {
          question,
         ...optionsValue,
          number,
          require,
          answer,
          assessid: localStorage.getItem("Assessment ID"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const names = [
    optionsValue["option1"],
    optionsValue["option2"],
    optionsValue["option3"],
    optionsValue["option4"],
    optionsValue["option5"],
    optionsValue["option6"],
  ];

  const AddAnswerHandle = () => {
    setAnswerList([...answerList, { answer: "" }]);
  };

  const RemoveAnswerHandle = (index) => {
    const list = [...answerList];
    list.splice(index, 1);
    setAnswerList(list);
  };

  const handleChangeValue = (e, index) => {
    optionsValue["option" + (index + 1)] = e.target.value;
    setOptionsValue(optionsValue);
  };
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
    setPersonName(typeof value === "string" ? value.split(",") : value);
    const ans = personName;
    setAnswer(ans);
  };

  const handledropdown = (e) => {
    const getvalue = e.target.value;
    if (getvalue == "checkbox") {
      const showType = "checkbox";
      const showID = "flexCheckDefault";
      setDType(showType);
      setDID(showID);
      setPara(true);
  
    } else if (getvalue == "radio") {
      const showType = "radio";
      const showID = "flexRadioDefault";
      setDType(showType);
      setDID(showID);
      setPara(true);
    
    } else if(getvalue == "paragraph") {
      setPara(false);

    };
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
      
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenEdit(false);
  };

  
  const handleEditQuestion = (id) => {
    setEditID(id)
    console.log(id);
  }

  const handleUpdateQuestion = (id) => {
    window.location.reload()
    setEditID(-1)
  }
  
  const checktime = (questions) => {
    console.log(questions.id);
  }

  useEffect(() => {
    FetchAllQuestion();
  }, []);

  useEffect(() => {
    if (openDrawer) {
      FetchAQuestion()
    }
  }, [openDrawer]);


  return (
    <><div className="AssessQues">
    <h3> Assessment Question</h3>
    <button className="AssessQuesbtn btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target="#AddQuestion">
          Add Question
        </button></div>
      <nav aria-label="breadcrumb">
        <ol className="bread breadcrumb">
          <li className="breadcrumb-item">
            <a href="/assessment">Assessment</a>
          </li>
          <li className=" breadcrumb-item active" aria-current="page">
            Assessment Question
          </li>
        
        </ol>


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
              
              {records.map((row, index) => (
                <>
                  <TableRow
                    key={row.UniqueID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <p>{index + 1 + (currentpage - 1) * recordsperpage}</p>
                    </TableCell>

                    <TableCell align="left"> {row.question}</TableCell>
                    <TableCell align="center" className="main">
                      <button
                        type="button"
                        className="btn btn-outline-info btn-sm"
                        variant="outlined"
                        onClick={() => showDrawer(row.UniqueID)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#DeleteQuestion"
                        onClick={() => handleClickOpen(row.UniqueID)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                  </>
              ))}
                  {questions.map((item, index) => (
                    item.id === editid ? (
  <div key={item.id}>
    <Drawer
      title="View Question"
      placement="right"
      onClose={onClose}
      width={600}
      open={openDrawer}
      
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={() => handleEditQuestion(item.assessid)}>
            Edit
          </Button>
        </Space>
      }
    >
      <div>
        
        <h6>Question: {item.question}</h6>
        {Array.from({ length: 6 }, (_, i) => i + 1).map(optionNumber => (
  item['option' + optionNumber] && (
    <div key={optionNumber}>
      Option {optionNumber}: {item['option'+ optionNumber]}
      
    </div>
  )
))}
        <p>Answer: {item.answer}</p>
        <p>Number: {item.number}</p>
        <p>Required: {item.require ? "Yes" : "No"}</p>
      </div>
    </Drawer>
  </div>
): <div key={item.id}>
<Drawer
  title="View Question"
  placement="right"
  onClose={onClose}
  width={600}
  open={openDrawer}
  
  extra={
    <Space>
   
      <Button type="primary" onClick={UpdateQuestion}>
        Update
      </Button>
    </Space>
  }
>
  <div>
   
    <input type="text" defaultValue={question} onChange={(e) => {
     
     const updatedValue = e.target.value;
    console.log(updatedValue);
    setQuestion(updatedValue);
          }} />
    {Array.from({ length: 6 }, (_, i) => i + 1).map(optionNumber => (
      
(
    <div key={optionNumber}>
      Option {optionNumber}:
      <input
        type="text"
        defaultValue={item['option' + optionNumber]}
        onChange={(e) => {setOptionsValue({ ...optionsValue, ['option' + optionNumber]: e.target.value })} }
      />
      
    </div>
  )
))}
{/* <button onClick={addOption}>Add Option</button> */}
    <p>Answer: {item.answer}</p>
    <p>Number: {item.number}</p>
    <p>Required: {item.require ? "Yes" : "No"}</p>
  </div>
</Drawer>
</div>))}

             
                 
               
            </TableBody>
          </Table>
        </TableContainer>
        <nav className="pagenav">
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={PrevPage}>Prev</a>
          </li>
{numbers.map((n, i) => (
  <li className={`page-item${currentpage === n ? 'active' : ''}`} key={i}>
<a href="#" className="page-link" onClick={() => ChangeCPage(n)}>{n}</a>
  </li>
))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={NextPage}>Next</a>
          </li>
        </ul>
      </nav>
        <div
          className="modal fade"
          id="DeleteQuestion"
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
                  Delete Question
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure, you want to delete the question?</p>
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
                  className="btn btn-secondary"
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
          className="modal fade modal-dialog-scrollable modal-xl"
          id="AddQuestion"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-6" id="staticBackdropLabel">
                  Add Question
                </h1>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-8 col-sm-4">
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
                        onChange={(e) => handledropdown(e)}
                        label="Select"
                        defaultValue="radio"
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
                        defaultValue={0}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                    <div className="checkbox checkbox-number">
                      <p>Required</p> <Switch onChange={onChange} />
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
                            onChange={(e) => handleChange(e)}
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
                  <div className="Top-modal col-4 col-sm-8">
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
                      {answerList.map((singleanswer, index) => (
                        <div key={index}>
                          <div className="Option">
                            { para ?
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type={dtype}
                               
                                name="flexRadioDefault"
                                id={did}
                              />
                              <TextField
                                name="answer"
                                id="answer"
                                size="small"
                             
                                label={"Option " + (index + 1)}
                                type="text"
                                onChange={(e) => handleChangeValue(e, index)}
                              />
                              {answerList.length - 1 === index &&
                                answerList.length < 6 && (
                                  <span className="child">
                                    <button
                                      onClick={AddAnswerHandle}
                                      type="button"
                                      className="btn btn-outline-success btn-sm"
                                    >
                                      Add
                                    </button>
                                  </span>
                                )}
                              {answerList.length > 1 && (
                                <span className="child">
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => RemoveAnswerHandle(index)}
                                  >
                                    Remove
                                  </button>
                                </span>
                              )}
                            </div> : <TextField
            margin="dense"
            id="name"
            label="Answer"
            onChange={(event) => setAnswer(event.target.value)}
            type="Assessment Name"
            fullWidth
            variant="standard"
          />
}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={AddQuestionFunc}
                >
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
