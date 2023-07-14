import React from 'react'
import "./emailsetting.css"
import { useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmailTemplate from "./Emailtemplate"
import { useNavigate } from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const EmailSetting = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [senderName, setSenderName] = useState();
    const [senderEmail, setSenderEmail] = useState()
    const [htmlCode, setHtmlCode] = useState('');
    const [value, setValue] = useState('');
    const navig = useNavigate()

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
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
    
        },
      };

      const onFinish = (values) => {
        console.log(values);
      };

      const EditSender = () => {
        setComponentDisabled(false);
      }

      const handleEditClick = () => {
        setIsEditing(true);
        setComponentDisabled(false)
      };
    
      const handleSaveClick = () => {
        setIsEditing(false);
        setComponentDisabled(true)
        // Perform save logic
      };
    
      const handleCancelClick = () => {
        setIsEditing(false);
        setComponentDisabled(true)
        
      };
  return (
   <div className='emailsettingpage'>
    <h5>Email Setting</h5>
    <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/email">
    Email
  </Link>
  <Typography color="text.primary">Email-Setting</Typography>
</Breadcrumbs>
    <div className='senderbody'>
        <div className='edit'>
          <div>
        <h6>Sender Details</h6>
        </div>
        <div className='editbutton'>
        {isEditing ? (
          <>
           <button className="btn btn-outline-info btn-sm button-save" onClick={handleCancelClick}>Cancel</button>
            <button className="btn btn-outline-success btn-sm " onClick={handleSaveClick}>Save</button>
           
          </>
        ) : (
          <button className="btn btn-outline-primary btn-sm" onClick={handleEditClick}>Edit</button>
        )}
        </div>
        </div>
    <Form
    {...layout}
    name="nest-messages"
    disabled={componentDisabled}
    onFinish={onFinish}
    className='form'
    style={{
      maxWidth: 600,
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'name']}
      label="Name"
      value={senderName}
      onChange={(e) => setSenderName(e.target.value)}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label="Email"
      defaultvalue={senderEmail}
      onChange={(e) => setSenderEmail(e.target.value)}
      rules={[
        {
          type: 'email',
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    </Form>
    </div>
    <div className='edittemplate'>
      <div>
        <h6>Email Template</h6> </div>
        <div className='create-button'>
        <button className="btn btn-outline-success btn-sm"onClick={() => navig("/email/emailsetting/create_template")}>Create New Template</button>
    </div>
    </div>
    <div className='template-table'>
    <TableContainer className="AssessmentTable" component={Paper}>
          <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Template Name</TableCell>
                <TableCell align="left">Preview</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
           
            <TableBody>
              
            </TableBody>
          </Table>
        </TableContainer>
    </div>
   </div>
  )
}

export default EmailSetting