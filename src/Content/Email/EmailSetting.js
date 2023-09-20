import React, { useEffect, createContext } from "react";
import "./emailsetting.css";
import { useState } from "react";
import { Button, Form, Input, Modal, InputNumber } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { useRef } from "react";
import { render } from "react-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Email from "./Email";
import { FetchAllEmailTemplate } from "../../API/FetchAPIs/fetchAllEmailTemplateAPI"
import { DeleteEmailTemplate } from "../../API/DeleteAPIs/deleteEmailTemplateAPI";
import { UpdateSender } from "../../API/UpdateAPIs/UpdateSenderAPI";
import { UpdateTemplate } from "../../API/UpdateAPIs/UpdateTemplateAPI";
import { AddEmailTemplate } from "../../API/CreateAPIs/addEmailTemplateAPI";

const EmailSetting = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [sendername, setSenderName] = useState();
  const [senderemail, setSenderEmail] = useState();
  const [htmlCode, setHtmlCode] = useState("");
  const [value, setValue] = useState("");
  const navig = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const emailEditorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sender, setSender] = useState([]);
  const [profile, setProfile] = useState([]);
  const [emailtemplatename, setEmailTemplateName] = useState();
  const [fetchemail, setFetchEmail] = useState([]);
  const [preview, setPreview] = useState();
  const [updateEmailName, setUpdateEmailName] = useState();
  const [updateEmailBody, setUpdateEmailBody] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  // const exportHtml = () => {
  //   emailEditorRef.current.editor.exportHtml((data) => {
  //     const { design, html } = data;
  //     // console.log('exportHtml', html);
  //     setUpdateEmailBody(html);
  //   });
  // };
  const exportHtml = () => {
  return new Promise((resolve) => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      // console.log('exportHtml', html);
      resolve(html);
      setUpdateEmailBody(html);
      // console.log("HTML", html);
      // console.log("Updated EMail", updateEmailBody);
    });
  });
};

  const onReady = (unlayer) => {
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)

    // const templateJson = {updateEmailBody};
    // unlayer.loadDesign(updateEmailBody);
    // console.log(updateEmailBody);
  };

  const handleHtmlChange = (event) => {
    setHtmlCode(event.target.value);
  };

  const handleCreateTemplate = () => {
    console.log(htmlCode);
    // Perform further processing with the HTML code
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const EditSender = () => {
    setComponentDisabled(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setComponentDisabled(false);
  };

  const handleSaveClick = () => {
    UpdateSender(sendername, senderemail);
    setIsEditing(false);
    setComponentDisabled(true);

    // window.location.reload();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setComponentDisabled(true);
  };

  const ProfileCallOnClick = async () => {
    const x = JSON.parse(localStorage.getItem("user-details"));

    const ProfileCall = await axios.get(
      "https://expensive-seal-kerchief.cyclic.app/api/users/profile",
      {
        params: { email: x?.email },
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    const profilecheck = [await ProfileCall.data.data.matchUser];
    setProfile(profilecheck);
  };

  const handleDelete = (id) => {
    localStorage.setItem("TemplateID", id);
  };

  const handleDesign = async (id) => {
    showModal();
    localStorage.setItem("TemplateID", id);
  }

 
 const handleCreateUpdate = async () => {
   
    const updatedHtml = await exportHtml();
    // setUpdateEmailBody(updatedHtml);
    console.log("Test call", test);
    // console.log(updatedHtml); // Wait for exportHtml to complete
  //  await UpdateTemplate();
    // setIsModalOpen(false);
  };

  const handleDeleteTemplate = () => {
    DeleteEmailTemplate();
  };

  useEffect(() => {
    const fetchData = async () => {
        const data = await FetchAllEmailTemplate();
        setFetchEmail(data);
    };
    fetchData();
}, []);

  useEffect(() => {
    ProfileCallOnClick();
  }, []);

  return (
    <>
      <div className="emailsettingpage">
        <h5>Email Setting</h5>
        <div>
          <button>Set Instruction Page</button>
        </div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/email">
            Email
          </Link>
          <Typography color="text.primary">Email-Setting</Typography>
        </Breadcrumbs>
        <div className="senderbody">
          <div>
            {profile.map((item) => (
              <div key={item.senderid}>
                <div className="edit">
                  <div>
                    <h6>Sender Details</h6>
                  </div>
                  <div className="editbutton">
                    {isEditing ? (
                      <>
                        <button
                          className="btn btn-outline-info btn-sm button-save"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={handleSaveClick}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={handleEditClick}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                <Form
                  {...layout}
                  name="nest-messages"
                  disabled={componentDisabled}
                  onFinish={onFinish}
                  className="form"
                  style={{
                    maxWidth: 600,
                  }}
                  validateMessages={validateMessages}
                >
                  <Form.Item
                    name={["user", "name"]}
                    label="Name"
                    initialValue={item.sendername}
                    onChange={(e) => setSenderName(e.target.value)}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["user", "email"]}
                    label="Email"
                    initialValue={item.senderemail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    rules={[
                      {
                        type: "email",
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </div>
            ))}
          </div>
        </div>
        <div className="edittemplate">
          <div>
            <h6>Email Template</h6>{" "}
          </div>
          <div className="create-button">
            <button
              className="btn btn-outline-success btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#emailtemplate"

              // onClick={() => alert("working")}
            >
              Create New Template
            </button>
          </div>
         
        </div>
        <div className="template-table">
          <TableContainer className="AssessmentTable" component={Paper}>
            <Table
              sx={{ minWidth: 500 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Template Name</TableCell>
               
                  <TableCell align="center">Design</TableCell>
               
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {fetchemail.map((item, index) => (
                  <TableRow
                    key={item.UniqueID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{item.name}</TableCell>
                    
                    <TableCell align="center">
                      <button
                        className=" btn btn-outline-info btn-sm"
                        align="center"
                        onClick={() => handleDesign(item.UniqueID)}
                      >
                        Design
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <button
                        className=" btn btn-outline-info btn-sm"
                        align="center"
                        onClick={() => handleDelete(item.UniqueID)}
                        data-bs-toggle="modal"
                        data-bs-target="#updatetemplate"
                      >
                        Edit
                      </button>
                      <button
                        className=" btn btn-outline-danger btn-sm tablecell"
                        align="center"
                        onClick={() => handleDelete(item.UniqueID)}
                        data-bs-toggle="modal"
                        data-bs-target="#deletetemplate"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Modal
          title="Create Template"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1200}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleCreateUpdate}
            >
              Create
            </Button>,
          ]}
          style={{
            top: 20,
          }}
        >
          <div className="email-template">
         

            <EmailEditor ref={emailEditorRef} onReady={onReady} />
          </div>
          //{" "}
        </Modal>
        <div
          class="modal fade"
          id="emailtemplate"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Create Email Template
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p>Please enter the Email Template Name</p>
                <TextField
                  margin="dense"
                  id="name"
                  label="Template Name"
                  onChange={(event) => setEmailTemplateName(event.target.value)}
                  type="Template Name"
                  fullWidth
                  variant="standard"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => AddEmailTemplate(emailtemplatename)}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="updatetemplate"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Update Email Template
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p>Please enter the Email Template Name to update</p>
                <TextField
                  margin="dense"
                  id="name"
                  label="Template Name"
                  onChange={(event) => setUpdateEmailName(event.target.value)}
                  type="Template Name"
                  fullWidth
                  variant="standard"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => UpdateTemplate(updateEmailName, updateEmailBody)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deletetemplate"
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
                  Delete Template
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <p>Are you sure, you want to delete this template?</p>
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
                  onClick={handleDeleteTemplate}
                >
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailSetting;
