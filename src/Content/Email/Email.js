import React from "react";
import axios from "axios";
import "./Email.css";
import { useState, useEffect } from 'react';
import {SendOutlined,UserOutlined, DownOutlined} from "@ant-design/icons"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from "@mui/material/TextField";
import { Button, Space, Form, Input, InputNumber, Dropdown, message   } from 'antd';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Email() {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [RecieverEmail, setRecieverEmail] = useState("");
  const [recieverFullName, setRecieverFullName] = useState("");
  const [senderFullName, setSenderFullName] = useState("");
const [senderEmail, setSenderEmail] = useState("");
const [emailSubject, setEmailSubject] = useState("")
const [reqid, setReqID] = useState("req_vaBPviZnIxrdS7OI1R79")
const [fetchwebhook, setFetchWebhook] = useState()
const [newData, setNewData] = useState();


  const sendEmail = () => {
    const data = JSON.stringify({
      sender: {
        name: "Amit",
        email: "amitvarshney30@gmail.com",
      },
      to: [
        {
          email: RecieverEmail,
          name: recieverFullName,
        },
      ],
      subject: emailSubject,
      htmlContent:
        "<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Brevo.</p></body></html>",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.brevo.com/v3/smtp/email",
      headers: {
        accept: "application/json",
        "api-key":
          "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",
        "content-type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const FetchWebhook = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://gray-famous-butterfly.cyclic.app/api/users/webhook', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 1qvt7v46gh4va5h5no1zjnuakgp3fiuszgbamfhd93h75ywpu4'
        }
      });
      
    const ids = response.data.data.models.map(obj => obj.id)

    let objectsArray = [];

 for (const id of ids) {
     const FinalResponse = await axios.get(`https://gray-famous-butterfly.cyclic.app/api/users/webhook/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 1qvt7v46gh4va5h5no1zjnuakgp3fiuszgbamfhd93h75ywpu4'
      }
    });

    objectsArray = objectsArray.concat(FinalResponse.data.data.data.body);
  //   setFetchWebhook(objectsArray);
 setFetchWebhook(objectsArray)
 setIsLoading(false);
  } 
 

    } catch (error) {
      console.log(error);
    }
  }    

  const layout = {
    labelCol: {
      span: 10,
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
  const { TextArea } = Input;

  useEffect(() => {
    FetchWebhook()
  }, [])

  const YourComponent = ({ fetchwebhook }) => {
    const updatedData = [];
  
    const updateData = async (email, event, timestamp) => {
      const existingData = updatedData.find((web) => web.email === email);
  
      if (existingData) {
        if (timestamp > existingData.timestamp) {
          existingData.event = event;
          existingData.timestamp = timestamp;
        }
      } else {
        updatedData.push({ email, event, timestamp });
      }
    };
  if(!fetchwebhook){
    return <div>Loading...</div>;
  }
 
   

    fetchwebhook.map((web) => {
      updateData(web.email, web.event);
    });

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Sr. No.</TableCell>
              <TableCell align="left">Recipient Email</TableCell>
              <TableCell align="left">Email Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

          
            {updatedData.map((web, index) => (
setIsLoading(true),

              <TableRow key={web.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <p>{index + 1}</p>
                </TableCell>
                <TableCell align="left">{web.email}</TableCell>
                <TableCell align="left">{web.event}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <div className='EmailSetting'>
      <Space> <Button icon={<SendOutlined />} type="primary" data-bs-toggle="modal" data-bs-target="#sendemail"> Send Email</Button> </Space>
        
        <a href='#' className='Email'>Email Setting</a>
      </div>
      <div className="AssessmentTable">
      <YourComponent fetchwebhook={fetchwebhook} />
      </div>
      <div
          className="modal fade"
          id="sendemail"
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
                  Send Email
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body sendemail-modal">
    <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'name']}
      label="Full Name"
      onChange={(e) => setRecieverFullName(e.target.value)}
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input className='input'/>
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label="Email"
      onChange={(e) => setRecieverEmail(e.target.value)}
      rules={[
        {
          type: 'email',
          required: true
        },
      ]}
    >
      <Input className='input'/>
    </Form.Item>
    <Form.Item
      name={['user', 'subject']}
      label="Subject"
      onChange={(e) => setEmailSubject(e.target.value)}
      rules={[
        {
          type: 'text',
          required: true
        },
      ]}
    >
      <Input className='input'/>
    </Form.Item>
    <Form.Item
      name={['user', 'body']}
      label="Email Template"
      rules={[
        {
          type: 'text',
        },
      ]}
    >
    </Form.Item>
    
    </Form>
                
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
                  onClick={sendEmail}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
